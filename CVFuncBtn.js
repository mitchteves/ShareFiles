const NL = "\n";
const BR = "|";
const CL = ":";
const JSProgName = "CVFuncBtn"; //This class will contain all custom scripts
const LogLevel = Object.freeze({ TRACE: "T", DEBUG: "D", INFO: "I", WARN: "W", ERROR: "E", CRITICAL: "C" });
const isTest = false;

//#region 12UX Custom Scripting Register/Subscribe for IG Bundling
(function Register() {
    try {
        if (!isTest) {
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_370", "MemberInquiry");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_371", "MemberDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_372", "EmployeeDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_373", "CheckDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_374", "ItemDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_375", "SalesGiftGC");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_376", "PaidGiftGC");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_378", "RptCheckByTable");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_379", "RoomDetailSearch");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_480", "CCDiscountNew");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidCheck", "PreVoidCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidChkEntities", "PreVoidChkEntities");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreTender", "PreTender");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreItem", "PreItem");
        }
    }
    catch (error) {
        console.log("Register catch: " + error);
    }
})();
//#endregion

// #region Standard Function Created MMT
// #region Get Date Time - Different Formats
function getCurrentDateTime(format = 'YYYY-MM-DD HH:MM:SS.MMM') {
    //get current datetime and add it to the jslogs file
    const currentDate = new Date();
    //format datetime individually
    const year = String(currentDate.getFullYear());
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(3, '0');

    switch (format) {
        case 'YYYYMMDDHHMMSSMMM':
            return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
        case 'YYYYMMDD':
            return `${year}${month}${day}`;
        case 'HH:MM:SS':
            return `${hours}:${minutes}:${seconds}`;
        case 'HH:MM:SS.MMM':
            return `${hours}:${minutes}:${seconds}.${milliseconds}`;
        default:
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    }
}
// #endregion

// #region When a number has been encounter, forcely convert it to STRING
function deepStringify(obj) {
    return JSON.parse(JSON.stringify(obj, (_, value) => (typeof value === 'number' ? String(value) : value)));
}
// #endregion

// #region Define the Request Class with dynamic properties & declaration
class RequestDataStructure {
    constructor() {
        this.RequestInfo = {};
        this.TerminalInfo = {};
        this.HighlightedIndexInfo = {};
        this.AdditionalInfo = {};
        this.CheckBasicInfo = {};
        this.CheckRevenueInfo = [];
        this.CheckMenuItemInfo = [];
        this.CheckDiscInfo = [];
        this.CheckTenderInfo = [];
    }
    setRequestInfo(data) {
        this.RequestInfo = data;
    }
    setTerminalInfo(data) {
        this.TerminalInfo = data;
    }
    setHighlightedIndexInfo(data) {
        this.HighlightedIndexInfo = data;
    }
    setAdditionalInfo(data) {
        this.AdditionalInfo = data;
    }
    setCheckBasicInfo(data) {
        this.CheckBasicInfo = data;
    }
    addToCheckRevenueInfo(revItem) {
        this.CheckRevenueInfo.push(revItem);
    }
    addToCheckMenuItemInfo(menuItem) {
        this.CheckMenuItemInfo.push(menuItem);
    }
    addToCheckDiscInfo(dcItem) {
        this.CheckDiscInfo.push(dcItem);
    }
    addToCheckTenderInfo(payItem) {
        this.CheckTenderInfo.push(payItem);
    }
}
// #endregion

// #region Sending Logs Update to the CVWebAPIService
const logToWorker = async (Message, LogLevel = LogLevel.INFO) => {
    const WORKER_API_URL = "http://localhost:5002/api/log";

    try {
        const Timestamp = getCurrentDateTime('HH:MM:SS.MMM');

        const response = await fetch(WORKER_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Client-Id": "cv12uxlinkjs"
            },
            body: JSON.stringify({ Message, Timestamp, LogLevel }),
        });

        if (!response.ok) {
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "Failed to log:" + response.statusText);
            console.error("Failed to log:", response.statusText);
        }
    } catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "Error sending log:" + error);
        console.error("Error sending log:", error);
    }
};
// #endregion

// #region Sending Request to the CVWebAPIService
const processRequest = async (Request) => {
    const WORKER_API_URL = "http://localhost:5002/api/request";

    try {
        const Timestamp = getCurrentDateTime('HH:MM:SS.MMM');

        const response = await fetch(WORKER_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Client-Id": "cv12uxlinkjs"
            },
            body: JSON.stringify({ Timestamp, Request }),
        });

        const contentType = response.headers.get("Content-Type");

        if (!response.ok) {
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "Failed to process request.");
            console.error("Failed to process request.");
        } else {
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "Request processed successfully.");
            console.log("Request processed successfully.");
        }

        if (contentType && contentType.includes("application/json")) {
            var responseJson = await response.json();
            logToWorker("Json Response Received." + NL + JSON.stringify(responseJson), LogLevel.DEBUG);
            return responseJson;  // Parse JSON
        } else {
            var responseText = await response.text();
            logToWorker("Text Response Received: " + responseText, LogLevel.DEBUG);
            return responseText;  // Return plain string
        }

    } catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "Error sending log:" + error);
        console.error("Error sending log:", error);
    }
};
// #endregion
// #endregion

// #region Get All Terminal Information Functions IG/Test Format
async function GetTerminalInfo(jsFunc, rqData) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetTerminalInfo");

    try {
        //2025-01-24T00:00:00+09:00:string|10:47:08.7016193:string|33:number|17:number|
        //Oak Bar:string|17:number|2:number|
        var terminalDate = (isTest) ? "2025-01-14" : await parent.TerminalApi.GetTerminalDate();
        var terminalTime = (isTest) ? "00:00:00" : await parent.TerminalApi.GetTerminalTime();
        var terminalId = (isTest) ? "01" : await parent.TerminalApi.GetTerminalId();
        var profitCenterId = (isTest) ? "01" : await parent.TerminalApi.GetProfitCenterId();
        var profitCenterName = (isTest) ? "profitCenterName" : await parent.TerminalApi.GetProfitCenterNameById(String(profitCenterId));
        var profitCenterPrId = (isTest) ? "01" : await parent.TerminalApi.GetPrimaryProfitCenterId();
        var curMealPeriodId = (isTest) ? "01" : await parent.TerminalApi.GetCurrentMealPeriodId();

        if (!isTest) await parent.TerminalApi.Log(JSProgName, "TerminalInfo:" +
            terminalDate + CL + typeof terminalDate + BR +
            terminalTime + CL + typeof terminalTime + BR +
            terminalId + CL + typeof terminalId + BR +
            profitCenterId + CL + typeof profitCenterId + BR +
            profitCenterName + CL + typeof profitCenterName + BR +
            profitCenterPrId + CL + typeof profitCenterPrId + BR +
            curMealPeriodId + CL + typeof curMealPeriodId + BR
        );

        await logToWorker("TerminalInfo " + jsFunc + BR +
            terminalDate + CL + typeof terminalDate + BR +
            terminalTime + CL + typeof terminalTime + BR +
            terminalId + CL + typeof terminalId + BR +
            profitCenterId + CL + typeof profitCenterId + BR +
            profitCenterName + CL + typeof profitCenterName + BR +
            profitCenterPrId + CL + typeof profitCenterPrId + BR +
            curMealPeriodId + CL + typeof curMealPeriodId + BR
            , LogLevel.INFO);

        rqData.setTerminalInfo({
            TrmDt: terminalDate,
            TrmTm: terminalTime,
            TrmId: terminalId,
            PcId: profitCenterId,
            PcName: profitCenterName,
            PcPrId: profitCenterPrId,
            CurMPId: curMealPeriodId
        });

        const sanizedRqData = deepStringify(rqData.TerminalInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("TerminalInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return true;
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "TerminalInfo:" + error);
        await logToWorker("TerminalInfo " + error, LogLevel.ERROR);

        return false;
    }
}
// #endregion

// #region Get All Check Information Functions
async function GetCheckObjectFromIG() {
    var checkObject = (isTest) ? "TestCheck" : await parent.TerminalApi.GetCheck();
    return checkObject;
}

async function GetCheckBasicInfo(jsFunc, rqData, checkInfo) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckBasicInfo");

    try {
        // #region Check General Information
        //|1:string|8:number|OB 42:string|330003:string|11:string|true:boolean|false:boolean|false:boolean|
        var employeeId = (isTest) ? "999" : await parent.TerminalApi.GetCheckCashierId(checkInfo);
        var employeeIdJobCode = (isTest) ? "01" : await parent.TerminalApi.GetSignedInEmpJobCodeId();
        var checkTable = (isTest) ? "checkTable" : await parent.TerminalApi.GetCheckTableName(checkInfo);
        var checkNumber = (isTest) ? "1111111" : await parent.TerminalApi.GetcheckNumber(checkInfo);
        var checkType = (isTest) ? "01" : await parent.TerminalApi.GetCheckTypeId(checkInfo);
        var isCheckOpen = (isTest) ? true : await parent.TerminalApi.IsCheckOpen(checkInfo);
        var isCheckRefund = (isTest) ? false : await parent.TerminalApi.IsCheckRefunded(checkInfo);
        var isCheckReopen = (isTest) ? false : await parent.TerminalApi.IsCheckReopened(checkInfo);
        //|0:number|null:object|null:object|null:object|
        var checkCoverCount = (isTest) ? "02" : await parent.TerminalApi.GetCheckCoverCount(checkInfo);
        var checkDataTag = (isTest) ? "checkDataTag" : await parent.TerminalApi.GetCheckDataTag(checkInfo);
        var checkGuestId = (isTest) ? "checkGuestId" : await parent.TerminalApi.GetCheckGuestId(checkInfo);
        var checkGuestName = (isTest) ? "checkGuestName" : await parent.TerminalApi.GetCheckGuestName(checkInfo);
        //|21950:number|1:string|
        var checkBalAmount = (isTest) ? "8000" : await parent.TerminalApi.GetCheckBalanceAmount(checkInfo);
        var checkServerId = (isTest) ? "01" : await parent.TerminalApi.GetCheckServerId(checkInfo);
        // #endregion

        // #region Menu Item & Discount Count
        //|3:number|0:number|1:number|
        var checkMenuItemCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckMenuItemCount(checkInfo);
        var itemDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckItemLevelDiscountCount(checkInfo);
        var checkDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckLevelDiscountCount(checkInfo);
        // #endregion

        // #region Check Level Financial Information
        //|true:boolean|1:number|0:number|3347:number|22314:number|18967:number|2086:number|1897:number|22950:number|
        var isTenderPresent = (isTest) ? false : await parent.TerminalApi.IsTenderPresent(checkInfo);
        var checkTenderCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckTenderCount(checkInfo);
        var checkChgAmount = (isTest) ? "0" : await parent.TerminalApi.GetCheckChangeAmount(checkInfo);
        var checkDcAmount = (isTest) ? "1000" : await parent.TerminalApi.GetCheckDiscountAmount(checkInfo);
        var checkSaleGrsAmount = (isTest) ? "10000" : await parent.TerminalApi.GetCheckSalesGrossAmount(checkInfo);
        var checkSaleNetAmount = (isTest) ? "8800" : await parent.TerminalApi.GetCheckSalesNetAmount(checkInfo);
        var checkTaxAmount = (isTest) ? "880" : await parent.TerminalApi.GetCheckTaxAmount(checkInfo);
        var checkSvcCharge = (isTest) ? "320" : await parent.TerminalApi.GetCheckServiceChargeValue(checkInfo);
        var checkGrandTotal = (isTest) ? "10000" : await parent.TerminalApi.GetCheckTotal(checkInfo);
        // #endregion

        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckBasicInfo:" +
            employeeId + CL + typeof employeeId + BR +
            employeeIdJobCode + CL + typeof employeeIdJobCode + BR +
            checkTable + CL + typeof checkTable + BR +
            checkNumber + CL + typeof checkNumber + BR +
            checkType + CL + typeof checkType + BR +
            isCheckOpen + CL + typeof isCheckOpen + BR +
            isCheckRefund + CL + typeof isCheckRefund + BR +
            isCheckReopen + CL + typeof isCheckReopen + BR +
            checkCoverCount + CL + typeof checkCoverCount + BR +
            checkDataTag + CL + typeof checkDataTag + BR +
            checkGuestId + CL + typeof checkGuestId + BR +
            checkGuestName + CL + typeof checkGuestName + BR +
            checkBalAmount + CL + typeof checkBalAmount + BR +
            checkServerId + CL + typeof checkServerId + BR +
            checkMenuItemCount + CL + typeof checkMenuItemCount + BR +
            itemDiscCount + CL + typeof itemDiscCount + BR +
            checkDiscCount + CL + typeof checkDiscCount + BR +
            isTenderPresent + CL + typeof isTenderPresent + BR +
            checkTenderCount + CL + typeof checkTenderCount + BR +
            checkChgAmount + CL + typeof checkChgAmount + BR +
            checkDcAmount + CL + typeof checkDcAmount + BR +
            checkSaleGrsAmount + CL + typeof checkSaleGrsAmount + BR +
            checkSaleNetAmount + CL + typeof checkSaleNetAmount + BR +
            checkTaxAmount + CL + typeof checkTaxAmount + BR +
            checkSvcCharge + CL + typeof checkSvcCharge + BR +
            checkGrandTotal + CL + typeof checkGrandTotal + BR
        );

        await logToWorker("CheckBasicInfo " + jsFunc + BR +
            employeeId + CL + typeof employeeId + BR +
            employeeIdJobCode + CL + typeof employeeIdJobCode + BR +
            checkTable + CL + typeof checkTable + BR +
            checkNumber + CL + typeof checkNumber + BR +
            checkType + CL + typeof checkType + BR +
            isCheckOpen + CL + typeof isCheckOpen + BR +
            isCheckRefund + CL + typeof isCheckRefund + BR +
            isCheckReopen + CL + typeof isCheckReopen + BR +
            checkCoverCount + CL + typeof checkCoverCount + BR +
            checkDataTag + CL + typeof checkDataTag + BR +
            checkGuestId + CL + typeof checkGuestId + BR +
            checkGuestName + CL + typeof checkGuestName + BR +
            checkBalAmount + CL + typeof checkBalAmount + BR +
            checkServerId + CL + typeof checkServerId + BR +
            checkMenuItemCount + CL + typeof checkMenuItemCount + BR +
            itemDiscCount + CL + typeof itemDiscCount + BR +
            checkDiscCount + CL + typeof checkDiscCount + BR +
            isTenderPresent + CL + typeof isTenderPresent + BR +
            checkTenderCount + CL + typeof checkTenderCount + BR +
            checkChgAmount + CL + typeof checkChgAmount + BR +
            checkDcAmount + CL + typeof checkDcAmount + BR +
            checkSaleGrsAmount + CL + typeof checkSaleGrsAmount + BR +
            checkSaleNetAmount + CL + typeof checkSaleNetAmount + BR +
            checkTaxAmount + CL + typeof checkTaxAmount + BR +
            checkSvcCharge + CL + typeof checkSvcCharge + BR +
            checkGrandTotal + CL + typeof checkGrandTotal + BR
            , LogLevel.INFO);

        // #region requestData.setCheckBasicInfo
        rqData.setCheckBasicInfo({
            // #region Check General Info
            EmpId: employeeId,
            EmpJbCd: employeeIdJobCode,
            ChkTbl: checkTable,
            ChkNo: checkNumber,
            ChkType: checkType,
            ChkOpn: isCheckOpen,
            ChkRfnd: isCheckRefund,
            ChkReopn: isCheckReopen,
            ChkCvrCnt: checkCoverCount,
            ChkDataTag: checkDataTag,
            ChkGuestId: checkGuestId,
            ChkGuestName: checkGuestName,
            ChkBalAmt: checkBalAmount,
            ChkSrvId: checkServerId,
            // #endregion

            // #region Menu Item, Discount Counts
            ChkMenuItmCnt: checkMenuItemCount,
            ItmDiscCnt: itemDiscCount,
            ChkDiscCnt: checkDiscCount,
            // #endregion

            // #region Financial Information
            ChkPay: isTenderPresent,
            ChkTndrCnt: checkTenderCount,
            ChkChgAmt: checkChgAmount,
            ChkDcAmt: checkDcAmount,
            ChkSaleGrsAmt: checkSaleGrsAmount,
            ChkSaleNetAmt: checkSaleNetAmount,
            ChkTaxAmt: checkTaxAmount,
            ChkSvcChg: checkSvcCharge,
            ChkGndTot: checkGrandTotal
            // #endregion

        });
        // #endregion

        const sanizedRqData = deepStringify(rqData.CheckBasicInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckBasicInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        await GetCheckRevenueInfo(jsFunc, rqData, checkInfo);

        return isCheckOpen;
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckBasicInfo:" + error);
        await logToWorker("CheckBasicInfo " + error, LogLevel.ERROR);

        return false;
    }
}

async function GetCheckRevenueInfo(jsFunc, rqData, checkInfo) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckRevenueInfo");

    try {
        var logInfo = "CheckRevenueInfo " + jsFunc + NL;
        // #region MANUAL Get All Rev Category Financial Info
        for (let i = 0; i < 99; i++) {
            //|1|22314:number|18967:number|
            var revId = 1 + i;
            var revGrsAmt = (isTest) ? "10000" : await parent.TerminalApi.GetCheckRevenueGrossAmount(checkInfo, revId);
            var revNetAmt = (isTest) ? "8800" : await parent.TerminalApi.GetCheckRevenueNetAmount(checkInfo, revId);

            if (revGrsAmt > 0) {
                logInfo += "*" + BR + revId + BR + revGrsAmt + CL + typeof revGrsAmt + BR +
                    revNetAmt + CL + typeof revNetAmt + BR + NL;

                rqData.addToCheckRevenueInfo({
                    RevId: revId,
                    RevGrsAmt: revGrsAmt,
                    RevNetAmt: revNetAmt
                });
            }
        }
        // #endregion

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logInfo);
        await logToWorker(logInfo, LogLevel.INFO);

        const sanizedRqData = deepStringify(rqData.CheckRevenueInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckRevenueInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return true;
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckRevenueInfo:" + error);
        await logToWorker("CheckRevenueInfo " + error, LogLevel.ERROR);

        return false;
    }
}

async function GetCheckMenuItemInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckMenuItemInfo");

    try {
        var logInfo = "CheckMenuItemInfo " + jsFunc + NL;
        //Get Menu Item Details
        var checkMenuItemCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckMenuItemCount(checkInfo);
        var checkModCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckModifierCount(checkInfo);
        var checkSpcInstCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckSpecialInstructionsCount(checkInfo);
        var itemDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckItemLevelDiscountCount(checkInfo);

        //|chkMenuItemCnt:3:number|chkModCnt:0:number|chkSpcInstCnt:0:number|itemDcCnt:0:number|
        logInfo += "*|chkMenuItemCnt:" + checkMenuItemCount + ":" + typeof checkMenuItemCount + BR +
            "chkModCnt:" + checkModCount + ":" + typeof checkModCount + BR +
            "chkSpcInstCnt:" + checkSpcInstCount + ":" + typeof checkSpcInstCount + BR +
            "itemDcCnt:" + itemDiscCount + ":" + typeof itemDiscCount + BR + NL;

        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkMenuItemCount; i++) {
            var nodeType = (isTest) ? "Item" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

            await logToWorker("*|Item nodeType: " + nodeType + BR + (nodeIndex + i), LogLevel.DEBUG);

            if (nodeType == "Item") {
                //|0:number|80400:number|1:number|Sunny:string|0:number|106:number|
                var menuItemIdx = nodeIndex + i;
                var menuItemId = (isTest) ? 80398 : await parent.TerminalApi.GetNodeId(nodes[nodeIndex + i]);
                var menuItemQty = (isTest) ? 1 : await parent.TerminalApi.GetMenuItemQuantity(nodes[nodeIndex + i]);
                var menuItemDesc = (isTest) ? "menuItemDesc" : await parent.TerminalApi.GetCheckItemDescription(nodes[nodeIndex + i]);
                var menuItemBaseAmount = (isTest) ? 4500 : await parent.TerminalApi.GetMenuItemCost(nodes[nodeIndex + i]);
                //TODO
                var menuItemRevCatId = (isTest) ? 1 : 1;//await parent.TerminalApi.GetMenuItemRevenueCategoryByMenuItemId(String(menuItemId));
                var menuItemPClsId = (isTest) ? 1 : await parent.TerminalApi.GetMenuItemProductClassId(String(menuItemId));

                logInfo += "*" + BR + menuItemIdx + CL + typeof menuItemIdx + BR +
                    menuItemId + CL + typeof menuItemId + BR +
                    menuItemQty + CL + typeof menuItemQty + BR +
                    menuItemDesc + CL + typeof menuItemDesc + BR +
                    menuItemBaseAmount + CL + typeof menuItemBaseAmount + BR +
                    menuItemRevCatId + CL + typeof menuItemRevCatId + BR +
                    menuItemPClsId + CL + typeof menuItemPClsId + BR + NL;

                rqData.addToCheckMenuItemInfo({
                    ItmIdx: menuItemIdx,
                    ItmId: menuItemId,
                    ItmQty: menuItemQty,
                    ItmDesc: menuItemDesc,
                    ItmBsAmt: menuItemBaseAmount,
                    ItmRCatId: menuItemRevCatId,
                    ItmPClsId: menuItemPClsId
                });
            }
        }

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logInfo);
        await logToWorker(logInfo, LogLevel.INFO);

        const sanizedRqData = deepStringify(rqData.CheckMenuItemInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckMenuItemInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return (nodeIndex + checkMenuItemCount);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckMenuItemInfo:" + error);
        await logToWorker("CheckMenuItemInfo " + error, LogLevel.ERROR);
    }
}

async function GetCheckDiscInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckDiscInfo");

    try {
        var logInfo = "DCInfo " + jsFunc + NL;
        //Check/Item Level Discount Information in the check
        var checkDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckLevelDiscountCount(checkInfo);
        logInfo += "*|DC checkDiscCount:  " + checkDiscCount + NL;

        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkDiscCount; i++) {
            var nodeType = (isTest) ? "Discount" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

            await logToWorker("*|DC nodeType:  " + nodeType + BR + (nodeIndex + i), LogLevel.DEBUG);

            if (nodeType == "Discount") {
                //|3:number|30:number|Oak Food15%:string|0:number|
                var itemDCIdx = nodeIndex + i;
                var itemDCId = (isTest) ? 101 : await parent.TerminalApi.GetNodeId(nodes[nodeIndex + i]);
                var itemDCDesc = (isTest) ? "itemDCDesc" : await parent.TerminalApi.GetCheckItemDescription(nodes[nodeIndex + i]);
                //Not Supported
                var itemDCBaseAmount = 0;

                logInfo += "*" + BR + itemDCIdx + CL + typeof itemDCIdx + BR +
                    itemDCId + CL + typeof itemDCId + BR +
                    itemDCDesc + CL + typeof itemDCDesc + BR +
                    itemDCBaseAmount + CL + typeof itemDCBaseAmount + BR + NL;

                rqData.addToCheckDiscInfo({
                    DCIdx: itemDCIdx,
                    DCId: itemDCId,
                    DCDesc: itemDCDesc,
                    DCBsAmt: itemDCBaseAmount
                });
            }
        }

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logInfo);
        await logToWorker(logInfo, LogLevel.INFO);

        const sanizedRqData = deepStringify(rqData.CheckDiscInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckDiscInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return (nodeIndex + checkDiscCount);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckDiscInfo:" + error);
        await logToWorker("CheckDiscInfo " + error, LogLevel.ERROR);
    }
}

async function GetCheckTenderInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckTenderInfo");

    try {
        var logInfo = "TenderInfo " + jsFunc + NL;
        //Get Check Tender Details
        var checkTenderCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckTenderCount(checkInfo);
        logInfo += "*|PAY checkTenderCount:  " + checkTenderCount + NL;

        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkTenderCount; i++) {
            var nodeType = (isTest) ? "Tender" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

            await logToWorker("*|PAY nodeType:  " + nodeType + BR + (nodeIndex + i), LogLevel.DEBUG);

            if (nodeType == "Tender") {
                //|4:number|Tender doesn't deal with Account:string|null:object|Cash:string|1:number|
                //|Cash:string|1000:number|
                var tenderIdx = nodeIndex + i;
                var tenderAccId = (isTest) ? 1 : await parent.TerminalApi.GetTenderAccountId(nodes[nodeIndex + i]);
                var tenderXtrData = (isTest) ? "tenderXtrData" : await parent.TerminalApi.GetTenderExtraData(nodes[nodeIndex + i]);

                var itemPayId = (isTest) ? 2 : await parent.TerminalApi.GetNodeId(nodes[nodeIndex + i]);
                var tenderName = (isTest) ? 2 : await parent.TerminalApi.GetTenderNameById(String(itemPayId));

                var itemPayDesc = (isTest) ? "itemPayDesc" : await parent.TerminalApi.GetCheckItemDescription(nodes[nodeIndex + i]);
                var itemPayBaseAmount = (isTest) ? 1000 : await parent.TerminalApi.GetTenderAmountByNode(nodes[nodeIndex + i]);

                logInfo += "*" + BR + tenderIdx + CL + typeof tenderIdx + BR +
                    tenderAccId + CL + typeof tenderAccId + BR +
                    tenderXtrData + CL + typeof tenderXtrData + BR +
                    tenderName + CL + typeof tenderName + BR +
                    itemPayId + CL + typeof itemPayId + BR +
                    itemPayDesc + CL + typeof itemPayDesc + BR +
                    itemPayBaseAmount + CL + typeof itemPayBaseAmount + BR + NL;

                rqData.addToCheckTenderInfo({
                    TndrIdx: tenderIdx,
                    TndrAccId: tenderAccId,
                    TndrXtrDt: tenderXtrData,
                    TndrName: tenderName,
                    PayId: itemPayId,
                    PayDesc: itemPayDesc,
                    PayBsAmt: itemPayBaseAmount
                });
            }
        }

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logInfo);
        await logToWorker(logInfo, LogLevel.INFO);

        const sanizedRqData = deepStringify(rqData.CheckTenderInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckTenderInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return checkTenderCount;
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "CheckTenderInfo:" + error);
        await logToWorker("CheckTenderInfo  " + error, LogLevel.ERROR);
    }
}

async function GetHighlightedIndexInfo(jsFunc, rqData, checkInfo) {
    if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetHighlightedIndexInfo");

    try {
        var logInfo = "HighlightedIndexInfo " + jsFunc + NL;
        var highlightedNode = null;

        try {
            //Get HighlightedNode Details
            highlightedNode = (isTest) ? 2 : await parent.TerminalApi.GetIndexOfHighlightedNode(checkInfo);

            logInfo += "*|" + highlightedNode + CL + typeof highlightedNode + BR + NL;
            //This code will help identify the highlightedNode returned value
            await logToWorker(logInfo, LogLevel.DEBUG);
        }
        catch (error) {
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "HighlightedIndexInfo:" + error);
            await logToWorker("HighlightedIndexInfo " + error, LogLevel.ERROR);
        }

        var nodeType = (isTest) ? ((jsFunc == "370") ? "Discount" : "Item") :
            ((highlightedNode === null) ? "highlightedNode is null" : await parent.TerminalApi.GetNodeType(highlightedNode));

        logInfo += "*|Node Type:  " + nodeType + NL;

        switch (nodeType) {
            case "Item":
                var menuItemIdx = 0;
                var menuItemId = (isTest) ? 80398 : await parent.TerminalApi.GetNodeId(highlightedNode);
                var menuItemQty = (isTest) ? 1 : await parent.TerminalApi.GetMenuItemQuantity(highlightedNode);
                var menuItemDesc = (isTest) ? "menuItemDesc" : await parent.TerminalApi.GetCheckItemDescription(highlightedNode);
                var menuItemBaseAmount = (isTest) ? 4500 : await parent.TerminalApi.GetMenuItemCost(highlightedNode);
                //TODO
                var menuItemRevCatId = (isTest) ? 1 : 1;//await parent.TerminalApi.GetMenuItemRevenueCategoryByMenuItemId(String(menuItemId));
                var menuItemPClsId = (isTest) ? 1 : await parent.TerminalApi.GetMenuItemProductClassId(String(menuItemId));

                logInfo += "*" + BR + menuItemIdx + CL + typeof menuItemIdx + BR +
                    menuItemId + CL + typeof menuItemId + BR +
                    menuItemQty + CL + typeof menuItemQty + BR +
                    menuItemDesc + CL + typeof menuItemDesc + BR +
                    menuItemBaseAmount + CL + typeof menuItemBaseAmount + BR +
                    menuItemRevCatId + CL + typeof menuItemRevCatId + BR +
                    menuItemPClsId + CL + typeof menuItemPClsId + BR + NL;

                rqData.setHighlightedIndexInfo({
                    ItmIdx: menuItemIdx,
                    ItmId: menuItemId,
                    ItmQty: menuItemQty,
                    ItmDesc: menuItemDesc,
                    ItmBsAmt: menuItemBaseAmount,
                    ItmRCatId: menuItemRevCatId,
                    ItmPClsId: menuItemPClsId
                });
                break;
            case "Discount":
                var itemDCIdx = 0;
                var itemDCId = (isTest) ? 101 : await parent.TerminalApi.GetNodeId(highlightedNode);
                var itemDCDesc = (isTest) ? "itemDCDesc" : await parent.TerminalApi.GetCheckItemDescription(highlightedNode);
                //Not Supported
                var itemDCBaseAmount = 0;

                logInfo += "*" + BR + itemDCIdx + CL + typeof itemDCIdx + BR +
                    itemDCId + CL + typeof itemDCId + BR +
                    itemDCDesc + CL + typeof itemDCDesc + BR +
                    itemDCBaseAmount + CL + typeof itemDCBaseAmount + BR + NL;

                rqData.setHighlightedIndexInfo({
                    DCIdx: itemDCIdx,
                    DCId: itemDCId,
                    DCDesc: itemDCDesc,
                    DCBsAmt: itemDCBaseAmount
                });
                break;
            case "Tender":
                var tenderIdx = 0;
                var tenderAccId = (isTest) ? 1 : await parent.TerminalApi.GetTenderAccountId(highlightedNode);
                var tenderXtrData = (isTest) ? "tenderXtrData" : await parent.TerminalApi.GetTenderExtraData(highlightedNode);
                var itemPayId = (isTest) ? 2 : await parent.TerminalApi.GetNodeId(highlightedNode);
                var tenderName = (isTest) ? 2 : await parent.TerminalApi.GetTenderNameById(String(itemPayId));
                var itemPayDesc = (isTest) ? "itemPayDesc" : await parent.TerminalApi.GetCheckItemDescription(highlightedNode);
                var itemPayBaseAmount = (isTest) ? 1000 : await parent.TerminalApi.GetTenderAmountByNode(highlightedNode);

                logInfo += "*" + BR + tenderIdx + CL + typeof tenderIdx + BR +
                    tenderAccId + CL + typeof tenderAccId + BR +
                    tenderXtrData + CL + typeof tenderXtrData + BR +
                    tenderName + CL + typeof tenderName + BR +
                    itemPayId + CL + typeof itemPayId + BR +
                    itemPayDesc + CL + typeof itemPayDesc + BR +
                    itemPayBaseAmount + CL + typeof itemPayBaseAmount + BR + NL;

                rqData.setHighlightedIndexInfo({
                    TndrIdx: tenderIdx,
                    TndrAccId: tenderAccId,
                    TndrXtrDt: tenderXtrData,
                    TenderName: tenderName,
                    PayId: itemPayId,
                    PayDesc: itemPayDesc,
                    PayBsAmt: itemPayBaseAmount
                });
                break;
            default:
                break;
        }

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logInfo);
        await logToWorker(logInfo, LogLevel.INFO);

        const sanizedRqData = deepStringify(rqData.HighlightedIndexInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("HighlightedIndexInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

        return highlightedNode;
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "HighlightedIndexInfo:" + error);
        await logToWorker("HighlightedIndexInfo " + error, LogLevel.ERROR);
    }
}
// #endregion

// #region Set Check Information Functions IG/Test Format
async function SetCheckTableName(checkInfo, newTableName) {
    try {
        var checkTableOld = (isTest) ? "checkTableOld" : await parent.TerminalApi.GetCheckTableName(checkInfo);
        //No return value
        var checkTableNew = (isTest) ? newTableName : await parent.TerminalApi.SetCheckTableName(checkInfo, newTableName);
        var checkTable = (isTest) ? newTableName : await parent.TerminalApi.GetCheckTableName(checkInfo);

        var logMsg = "B:" + checkTableOld + "|A:" + newTableName + "|V:" + checkTable;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckTableName: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckTableName:" + error);
        await logToWorker("SetCheckTableName: " + error, LogLevel.ERROR);
    }
}

async function SetCheckTypeId(checkInfo, newCheckTypeId) {
    try {
        var checkTypeIdOld = (isTest) ? "checkTypeIdOld" : await parent.TerminalApi.GetCheckTypeId(checkInfo);
        //invoke the ModifyCheckType function, no return value
        var checkTypeIdNew = (isTest) ? newCheckTypeId : await parent.TerminalApi.SetCheckTypeId(checkInfo);
        var checkTypeId = (isTest) ? newCheckTypeId : await parent.TerminalApi.GetCheckTypeId(checkInfo);

        var logMsg = "B:" + checkTypeIdOld + "|A:" + newCheckTypeId + "|V:" + checkTypeId;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckTypeId: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckTypeId:" + error);
        await logToWorker("SetCheckTypeId: " + error, LogLevel.ERROR);
    }
}

async function ModifyCoverCount(checkInfo, newCoverCount) {
    try {
        var checkCoverCountOld = (isTest) ? "checkCoverCountOld" : await parent.TerminalApi.GetCheckCoverCount(checkInfo);
        //invokes the user input modifycovercount
        var checkCoverCountNew = (isTest) ? newCoverCount : await parent.TerminalApi.ModifyCoverCount(checkInfo);
        var checkCoverCount = (isTest) ? newCoverCount : await parent.TerminalApi.GetCheckCoverCount(checkInfo);

        var logMsg = "B:" + checkCoverCountOld + "|A:" + checkCoverCountNew + "|V:" + checkCoverCount;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("ModifyCoverCount: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "ModifyCoverCount:" + error);
        await logToWorker("ModifyCoverCount: " + error, LogLevel.ERROR);
    }
}

//dataTagType (optional) - ga, interactiveaccount,loyalty, member, folio, and banquet
//taggedAccount (optional)
async function SetCheckDataTag(checkInfo, newDataTag, newDataTagType, taggedAccount) {
    try {
        var checkDataTagOld = (isTest) ? "checkDataTagOld" : await parent.TerminalApi.GetCheckDataTag(checkInfo);
        //No return value
        var checkDataTagNew = (isTest) ? newDataTag + "-" + newDataTagType : await parent.TerminalApi.SetCheckDataTag(checkInfo, newDataTag, newDataTagType, taggedAccount);
        var checkDataTag = (isTest) ? newDataTag : await parent.TerminalApi.GetCheckDataTag(checkInfo);

        var logMsg = "B:" + checkDataTagOld + "|A:" + newDataTag + "|V:" + checkDataTag;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckDataTag: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckDataTag:" + error);
        await logToWorker("SetCheckDataTag: " + error, LogLevel.ERROR);
    }
}

async function SetCheckGuestId(checkInfo, newGuestId) {
    try {
        var checkGuestIdOld = (isTest) ? "checkTableOld" : await parent.TerminalApi.GetCheckGuestId(checkInfo);
        //No Return Value
        var checkGuestIdNew = (isTest) ? newGuestId : await parent.TerminalApi.SetCheckGuestId(checkInfo, newGuestId);
        var checkGuestId = (isTest) ? newGuestId : await parent.TerminalApi.GetCheckGuestId(checkInfo);

        var logMsg = "B:" + checkGuestIdOld + "|A:" + newGuestId + "|V:" + checkGuestId;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckGuestId: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckGuestId:" + error);
        await logToWorker("SetCheckGuestId: " + error, LogLevel.ERROR);
    }
}

async function SetCheckGuestName(checkInfo, newGuestName) {
    try {
        var checkGuestNameOld = (isTest) ? "checkTableOld" : await parent.TerminalApi.GetCheckGuestName(checkInfo);
        //no return value
        var checkGuestNameNew = (isTest) ? newGuestName : await parent.TerminalApi.SetCheckGuestName(checkInfo, newGuestName);
        var checkGuestName = (isTest) ? newGuestName : await parent.TerminalApi.GetCheckGuestName(checkInfo);

        var logMsg = "B:" + checkGuestNameOld + "|A:" + newGuestName + "|V:" + checkGuestName;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckGuestName: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckGuestName:" + error);
        await logToWorker("SetCheckGuestName: " + error, LogLevel.ERROR);
    }
}

async function SetDataString(newDataString, index) {
    try {
        const intIndex = parseInt(index, 10);
        var checkDataStringOld = (isTest) ? "checkDataStringOld" : await parent.TerminalApi.GetDataString(intIndex);
        //no return value
        var checkDataStringNew = (isTest) ? newDataString : await parent.TerminalApi.SetDataString(intIndex, newDataString);
        var checkDataString = (isTest) ? newDataString : await parent.TerminalApi.GetDataString(intIndex);

        var logMsg = "Idx:" + index + "|B:" + checkDataStringOld + "|A:" +
            newDataString + "|V:" + checkDataString;

        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetDataString: " + logMsg, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "SetCheckGuestId:" + error);
        await logToWorker("SetCheckGuestId: " + error, LogLevel.ERROR);
    }
}
// #endregion

// #region TODO Add/Change Check MenuItem/DC/Tax/SvcChg Functions IG/Test Format
async function AddMenuItem(menuItemId, menuItemQty) {
    var textTest = "AddMenuItem:" + menuItemId + BR + menuItemQty;

    try {
        //TODO
        (isTest) ? textTest : await parent.TerminalApi.AddMenuItem(menuItemId, menuItemQty);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC AddMenuItem - " + textTest);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "AddMenuItem:" + error);
        await logToWorker("AddMenuItem: " + error, LogLevel.ERROR);
    }
}
async function ApplyDiscount(checkInfo) {
    try {
        //TODO
        var applyDiscount = (isTest) ? "applyDiscount" : await parent.TerminalApi.ApplyDiscount(checkInfo);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC ApplyDiscount - " + applyDiscount);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "ApplyDiscount:" + error);
        await logToWorker("ApplyDiscount: " + error, LogLevel.ERROR);
    }
}
async function ModifyServiceChargeAmount(checkInfo) {
    try {
        //TODO
        var modifySvcChgAmount = (isTest) ? "modifySvcChgAmount" : await parent.TerminalApi.ModifyServiceChargeAmount(checkInfo);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC ModifyServiceChargeAmount - " + modifySvcChgAmount);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "ModifyServiceChargeAmount:" + error);
        await logToWorker("ModifyServiceChargeAmount: " + error, LogLevel.ERROR);
    }
}
async function ModifyServiceChargePercent(checkInfo) {
    try {
        //TODO
        var modifySvcChgPercent = (isTest) ? "modifySvcChgPercent" : await parent.TerminalApi.ModifyServiceChargePercent(checkInfo);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC ModifyServiceChargePercent - " + modifySvcChgPercent);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "ModifyServiceChargePercent:" + error);
        await logToWorker("ModifyServiceChargePercent: " + error, LogLevel.ERROR);
    }
}
async function UpdateCheckTaxAmount(checkInfo) {
    try {
        //TODO
        var updateChkTaxAmount = (isTest) ? "updateChkTaxAmount" : await parent.TerminalApi.UpdateCheckTaxAmount(checkInfo);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC UpdateCheckTaxAmount - " + updateChkTaxAmount);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "UpdateCheckTaxAmount:" + error);
        await logToWorker("UpdateCheckTaxAmount: " + error, LogLevel.ERROR);
    }
}
async function ApplyTypedSpecialInstruction(nodeObject) {
    try {
        //TODO
        var applyTypedSpcInstr = (isTest) ? "applyTypedSpcInstr" : await parent.TerminalApi.ApplyTypedSpecialInstruction(nodeObject);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "FC ApplyTypedSpecialInstruction - " + applyTypedSpcInstr);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "ApplyTypedSpecialInstruction:" + error);
        await logToWorker("ApplyTypedSpecialInstruction: " + error, LogLevel.ERROR);
    }
}
// #endregion

// #region GetAllInfo Call Terminal & Check Functions as applicable
async function GetAllInfo(jsFunc, rqType, rqName, requestData) {

    var isSuccess = false;

    try {
        requestData.setRequestInfo({ RqType: rqType, RqName: rqName });

        await logToWorker("RequestInfo " + jsFunc + BR + requestData.RequestInfo.RqType + BR +
            requestData.RequestInfo.RqName + BR, LogLevel.INFO);

        var isTerminalInfoOK = await GetTerminalInfo(jsFunc, requestData);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "isTerminalInfoOK:" + isTerminalInfoOK);

        if (isTerminalInfoOK) {
            var checkInfo = await GetCheckObjectFromIG();
            var isCheckInfoOK = await GetCheckBasicInfo(jsFunc, requestData, checkInfo);
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "isCheckInfoOK OpenCheck:" + isCheckInfoOK);

            if (isCheckInfoOK) {
                var checkNodeIndex = 0;
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckMenuItemInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckMenuItemInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckDiscInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckDiscInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckTenderInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckTenderInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
                //Last after getting all possible information
                await GetHighlightedIndexInfo(jsFunc, requestData, checkInfo);
            }
            isSuccess = true;
        }
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetAllInfo:" + error);
        await logToWorker("GetAllInfo " + error, LogLevel.ERROR);
    }

    return isSuccess;
}
// #endregion

// #region "PreFunctionButton_370", "MemberInquiry"
async function MemberInquiry() {
    var jsFunc = "370";
    var rqType = "PreFunctionButton_370";
    var rqName = "MemberInquiry";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_371", "MemberDiscount"
async function MemberDiscount() {
    var jsFunc = "371";
    var rqType = "PreFunctionButton_371";
    var rqName = "MemberDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);

                var checkInfo = await GetCheckObjectFromIG();
                await SetCheckGuestId(checkInfo, responseData.GuestId);
                await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                await SetCheckGuestName(checkInfo, responseData.GuestName);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response
                //If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount)
                {                    
                    for (var discount of responseData.DiscountDetails)
                    { 
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId,dcValue, null);	

                        // Iterate over the properties
                        for (let key in result) {
                            if (result.hasOwnProperty(key)) {
                                if (!isTest) await parent.TerminalApi.Log(JSProgName, key + CL + result[key] + BR + error);
                                await logToWorker("*|Add Discount|" + discount.DCId + BR +
                                    discount.DCPercent + BR + discount.DCAmount + BR +
                                    "Result:" + key + CL + result[key] + BR, LogLevel.INFO);
                            }
                        }

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };
                }
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_372", "EmployeeDiscount"
async function EmployeeDiscount() {
    var jsFunc = "372";
    var rqType = "PreFunctionButton_372";
    var rqName = "EmployeeDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);

                var checkInfo = await GetCheckObjectFromIG();
                await SetCheckGuestId(checkInfo, responseData.GuestId);
                await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                await SetCheckGuestName(checkInfo, responseData.GuestName);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response
                //If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + result + BR, LogLevel.INFO);
                    };
                }
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_373", "CheckDiscount"
async function CheckDiscount() {
    var jsFunc = "373";
    var rqType = "PreFunctionButton_373";
    var rqName = "CheckDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);

                var checkInfo = await GetCheckObjectFromIG();
                await SetCheckDataTag(checkInfo, responseData.CheckDataTag);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response
                //If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + result + BR, LogLevel.INFO);
                    };
                }
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_374", "ItemDiscount"
async function ItemDiscount() {
    var jsFunc = "374";
    var rqType = "PreFunctionButton_374";
    var rqName = "ItemDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response
                //If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //TODO: Add Item Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Item Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + result + BR, LogLevel.INFO);
                    };
                }
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_375", "SalesGiftGC" - Not Used
async function SalesGiftGC() {
    var jsFunc = "375";
    var rqType = "PreFunctionButton_375";
    var rqName = "SalesGiftGC";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_376", "PaidGiftGC" - Not Used
async function PaidGiftGC() {
    var jsFunc = "376";
    var rqType = "PreFunctionButton_376";
    var rqName = "PaidGiftGC";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_378", "RptCheckByTable"
async function RptCheckByTable() {
    var jsFunc = "378";
    var rqType = "PreFunctionButton_378";
    var rqName = "RptCheckByTable";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_379", "RoomDetailSearch"
async function RoomDetailSearch() {
    var jsFunc = "379";
    var rqType = "PreFunctionButton_379";
    var rqName = "RoomDetailSearch";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {

            //Add Code to ask for additional information
            var getInput = (isTest) ? "" : await parent.TerminalApi.GetUserInput("ROOM NUMBER",
                "룸번호를 입력하고 Enter버튼을 누르세요.",
                "Type Room Number and Enter.",
                isAlphaNumeric = true,
                isMSRSwipeEnabled = true,
                msrTrack = 2,
                decimalDigits = 0);

            if (!isTest) await parent.TerminalApi.Log(JSProgName, "AdditionalInfo:" +
                getInput + CL + typeof getInput + BR 
            );

            await logToWorker("AdditionalInfo " + jsFunc + BR +
                getInput + CL + typeof getInput + BR 
                , LogLevel.INFO);

            requestData.setAdditionalInfo({
                UsrInput: getInput //Room Number
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreFunctionButton_480", "CCDiscountNew"
async function CCDiscountNew() {
    var jsFunc = "480";
    var rqType = "PreFunctionButton_480";
    var rqName = "CCDiscountNew";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess) {
                if (!isTest) {
                    await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                    await parent.TerminalApi.ShowCustomAlert(rqName,
                        JSON.stringify(responseData.ResponseMessage, null, 2), 2);
                }

                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
            else {
                if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + CL + responseData.ResponseMessage);
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
            }
        }
        else {
            await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO);
        }

    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreVoidCheck", "PreVoidCheck"
async function PreVoidCheck() {
    var jsFunc = "PreVoidCheck";
    var rqType = "PreVoidCheck";
    var rqName = "PreVoidCheck";

    try {

        if (!isTest) await parent.TerminalApi.Log(JSProgName, jsFunc + BR + rqType + BR + rqName + BR);
        await logToWorker(JSProgName + CL + jsFunc + BR + rqType + BR + rqName + BR, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreVoidChkEntities", "PreVoidChkEntities"
async function PreVoidChkEntities() {
    var jsFunc = "PreVoidChkEntities";
    var rqType = "PreVoidChkEntities";
    var rqName = "PreVoidChkEntities";

    try {

        if (!isTest) await parent.TerminalApi.Log(JSProgName, jsFunc + BR + rqType + BR + rqName + BR);
        await logToWorker(JSProgName + CL + jsFunc + BR + rqType + BR + rqName + BR, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreTender", "PreTender"
async function PreTender() {
    var jsFunc = "PreTender";
    var rqType = "PreTender";
    var rqName = "PreTender";

    try {

        if (!isTest) await parent.TerminalApi.Log(JSProgName, jsFunc + BR + rqType + BR + rqName + BR);
        await logToWorker(JSProgName + CL + jsFunc + BR + rqType + BR + rqName + BR, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

// #region "PreItem", "PreItem"
async function PreItem() {
    var jsFunc = "PreItem";
    var rqType = "PreItem";
    var rqName = "PreItem";

    try {

        if (!isTest) await parent.TerminalApi.Log(JSProgName, jsFunc + BR + rqType + BR + rqName + BR);
        await logToWorker(JSProgName + CL + jsFunc + BR + rqType + BR + rqName + BR, LogLevel.INFO);
    }
    catch (error) {
        if (!isTest) await parent.TerminalApi.Log(JSProgName, rqName + BR + error);
        await logToWorker(rqName + BR + error, LogLevel.ERROR);
    }
}
// #endregion

if (isTest) MemberInquiry();
if (isTest) MemberDiscount();
if (isTest) RptCheckByTable();
if (isTest) RoomDetailSearch();

