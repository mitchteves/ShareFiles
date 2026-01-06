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

            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_46", "PreVoidItem");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_54", "PreClosedCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PostFunctionButton_54", "PostClosedCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_160", "PreReOpenClosedCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PostFunctionButton_160", "PostReOpenClosedCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_370", "MemberInquiry");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_371", "MemberDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_372", "EmployeeDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_373", "CheckDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_374", "ItemDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_375", "SalesGiftGC");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_376", "PaidGiftGC");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_377", "CCDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_378", "RptCheckByTable");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_379", "RoomDetailSearch");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_480", "CCDiscountNew");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_481", "CCLookupDc");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_486", "PrintCardSlip");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_487", "LastCardSlip");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_488", "ManualCard");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_489", "ReopenErrCard");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_490", "CEPSettings");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_491", "ParnasRewardMembership");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_492", "MemberDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreFunctionButton_493", "EmployeeDiscount");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PostItem", "PostItem");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreSaveCheck", "PreSaveCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidCheck", "PreVoidCheck");
            //parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidChkEntities", "PreVoidItem");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreCancelCheck", "PreCancelCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreTender", "PreTender");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PostTender", "PostTender");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PrepareCheckReceipt", "PrepareCheckReceipt");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PrepareCheckReceiptV2", "PrepareCheckReceipt");
        }
    }
    catch (error) { console.log("Register catch: " + error); }
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

// #region Check if a Variable is empty
function isEmpty(value) {
    return value === null || value === undefined || value === '';
}
// #endregion

// #region Define the Request Class with dynamic properties & declaration
class RequestDataStructure {
    constructor() {
        this.RequestInfo = {};
        this.TerminalInfo = {};
        this.HighlightedIndexInfo = {};
        this.AdditionalInfo = {};
        this.CheckDataStringInfo = {};
        this.CheckBasicInfo = {};
        this.CheckRevenueInfo = [];
        this.CheckMenuItemInfo = [];
        this.CheckDiscInfo = [];
        this.CheckTenderInfo = [];
        this.PosCheckData = {};
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
    setCheckDataStringInfo(data) {
        this.CheckDataStringInfo = data;
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
    setPosCheckData(data) {
        this.PosCheckData = data;
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
        console.error("Error sending log:", error); }
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
        console.error("Error sending log:", error); }
};
// #endregion
// #endregion

// #region Get All Terminal Information Functions IG/Test Format
async function GetTerminalInfo(jsFunc, rqData) {
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
        var employeeId = (isTest) ? "999" : await parent.TerminalApi.GetSignedInEmpId();
        var employeeIdJobCode = (isTest) ? "01" : await parent.TerminalApi.GetSignedInEmpJobCodeId();

        rqData.setTerminalInfo({
            TrmDt: terminalDate,
            TrmTm: terminalTime,
            TrmId: terminalId,
            PcId: profitCenterId,
            PcName: profitCenterName,
            PcPrId: profitCenterPrId,
            CurMPId: curMealPeriodId,
            EmpId: employeeId,
            EmpJbCd: employeeIdJobCode
        });

        const sanizedRqData = deepStringify(rqData.TerminalInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("TerminalInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
        return true;
    } catch (error) { await logToWorker("TerminalInfo " + error, LogLevel.ERROR);
        return false; }
}
// #endregion

// #region Get All Check Information Functions
async function GetCheckObjectFromIG() {
    var checkObject = (isTest) ? "TestCheck" : await parent.TerminalApi.GetCheck();
    return checkObject;
}

async function GetCheckBasicInfo(jsFunc, rqData, checkInfo) {
    try {
        // #region Check General Information
        //|1:string|8:number|OB 42:string|330003:string|11:string|true:boolean|false:boolean|false:boolean|
        var cashierId = (isTest) ? "999" : await parent.TerminalApi.GetCheckCashierId(checkInfo);
        var checkTable = (isTest) ? "checkTable" : await parent.TerminalApi.GetCheckTableName(checkInfo);
        var checkNumber = (isTest) ? "1111111" : await parent.TerminalApi.GetcheckNumber(checkInfo);
        //2025.05.28 Added API
        var assocCheckNumber = (isTest) ? "1111111" : await parent.TerminalApi.GetAssociatedCheckNumber(checkInfo);
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

        // #region requestData.setCheckBasicInfo
        rqData.setCheckBasicInfo({
            // #region Check General Info
            CashierId: cashierId,
            ChkTbl: checkTable,
            ChkNo: checkNumber,
            AssChkNo: assocCheckNumber,
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
    } catch (error) { await logToWorker("CheckBasicInfo " + error, LogLevel.ERROR);
        return false; }
}

async function GetCheckRevenueInfo(jsFunc, rqData, checkInfo) {
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
        await logToWorker(logInfo, LogLevel.DEBUG);
        const sanizedRqData = deepStringify(rqData.CheckRevenueInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckRevenueInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
        return true;
    } catch (error) { await logToWorker("CheckRevenueInfo " + error, LogLevel.ERROR);
        return false; }
}

async function GetCheckMenuItemInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    try {
        //Get Menu Item Details
        //|chkMenuItemCnt:3:number|chkModCnt:0:number|chkSpcInstCnt:0:number|itemDcCnt:0:number|
        var checkMenuItemCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckMenuItemCount(checkInfo);
        var checkModCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckModifierCount(checkInfo);
        var checkSpcInstCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckSpecialInstructionsCount(checkInfo);
        var itemDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckItemLevelDiscountCount(checkInfo);
        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkMenuItemCount; i++) {
            var nodeType = (isTest) ? "Item" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

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
                var menuItemVoidId = (isTest) ? 0 : await parent.TerminalApi.GetMenuItemVoidId(nodes[nodeIndex + i]);

                rqData.addToCheckMenuItemInfo({
                    ItmIdx: menuItemIdx,
                    ItmId: menuItemId,
                    ItmQty: menuItemQty,
                    ItmDesc: menuItemDesc,
                    ItmBsAmt: menuItemBaseAmount,
                    ItmRCatId: menuItemRevCatId,
                    ItmPClsId: menuItemPClsId,
                    ItmVoidId: menuItemVoidId
                });

                var itemNode = (isTest) ? "itemNodeCollection" : await parent.TerminalApi.GetNodeCollection(nodes[nodeIndex + i]);
                await logToWorker("itemNodes " + jsFunc + CL + itemNode.length, LogLevel.INFO);

                var itemNodeType = (isTest) ? "Item" : ((itemNode.length > 0) ? await parent.TerminalApi.GetNodeType(itemNode[0]) : "Item");

                if (itemNodeType == "Discount") {
                    //|3:number|30:number|Oak Food15%:string|0:number|
                    var itemDCIdx = 0;
                    var itemDCId = (isTest) ? 101 : await parent.TerminalApi.GetNodeId(itemNode[0]);
                    var itemDCDesc = (isTest) ? "itemDCDesc" : await parent.TerminalApi.GetCheckItemDescription(itemNode[0]);
                    //Not Supported
                    var itemDCBaseAmount = 0;

                    rqData.addToCheckDiscInfo({
                        DCIdx: itemDCIdx,
                        DCId: itemDCId,
                        DCDesc: itemDCDesc,
                        DCBsAmt: itemDCBaseAmount
                    });
                }
            }
        }

        const sanizedRqData = deepStringify(rqData.CheckMenuItemInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckMenuItemInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
        return (nodeIndex + checkMenuItemCount);
    } catch (error) { await logToWorker("CheckMenuItemInfo " + error, LogLevel.ERROR); }
}

async function GetCheckDiscInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    try {
        //Check/Item Level Discount Information in the check
        var checkDiscCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckLevelDiscountCount(checkInfo);
        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkDiscCount; i++) {
            var nodeType = (isTest) ? "Discount" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

            if (nodeType == "Discount") {
                //|3:number|30:number|Oak Food15%:string|0:number|
                var itemDCIdx = nodeIndex + i;
                var itemDCId = (isTest) ? 101 : await parent.TerminalApi.GetNodeId(nodes[nodeIndex + i]);
                var itemDCDesc = (isTest) ? "itemDCDesc" : await parent.TerminalApi.GetCheckItemDescription(nodes[nodeIndex + i]);
                //Not Supported
                var itemDCBaseAmount = 0;

                rqData.addToCheckDiscInfo({
                    DCIdx: itemDCIdx,
                    DCId: itemDCId,
                    DCDesc: itemDCDesc,
                    DCBsAmt: itemDCBaseAmount
                });
            }
        }

        const sanizedRqData = deepStringify(rqData.CheckDiscInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckDiscInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
        return (nodeIndex + checkDiscCount);
    } catch (error) { await logToWorker("CheckDiscInfo " + error, LogLevel.ERROR); }
}

async function GetCheckTenderInfo(jsFunc, rqData, checkInfo, nodeIndex) {
    try {
        //Get Check Tender Details
        var checkTenderCount = (isTest) ? 2 : await parent.TerminalApi.GetCheckTenderCount(checkInfo);
        var nodes = (isTest) ? "checkNodesCollection" : await parent.TerminalApi.GetCheckNodeCollection(checkInfo);

        for (let i = 0; i < checkTenderCount; i++) {
            var nodeType = (isTest) ? "Tender" : await parent.TerminalApi.GetNodeType(nodes[nodeIndex + i]);

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
        const sanizedRqData = deepStringify(rqData.CheckTenderInfo);
        const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
        await logToWorker("CheckTenderInfo " + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
        return checkTenderCount;
    } catch (error) { await logToWorker("CheckTenderInfo  " + error, LogLevel.ERROR); }
}

async function GetHighlightedIndexInfo(jsFunc, rqData, checkInfo) {
    try {
        var logInfo = "HighlightedIndexInfo " + jsFunc + NL;
        var highlightedNode = null;

        try {
            //Get HighlightedNode Details
            highlightedNode = (isTest) ? 2 : await parent.TerminalApi.GetIndexOfHighlightedNode(checkInfo);
            logInfo += "*|" + highlightedNode + CL + typeof highlightedNode + BR + NL;
            //This code will help identify the highlightedNode returned value
            await logToWorker(logInfo, LogLevel.DEBUG);
        } catch (error) { await logToWorker("HighlightedIndexInfo " + error, LogLevel.ERROR); }

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
                var menuItemVoidId = (isTest) ? 0 : await parent.TerminalApi.GetMenuItemVoidId(highlightedNode);

                rqData.setHighlightedIndexInfo({
                    ItmIdx: menuItemIdx,
                    ItmId: menuItemId,
                    ItmQty: menuItemQty,
                    ItmDesc: menuItemDesc,
                    ItmBsAmt: menuItemBaseAmount,
                    ItmRCatId: menuItemRevCatId,
                    ItmPClsId: menuItemPClsId,
                    ItmVoidId: menuItemVoidId
                });
                break;
            case "Discount":
                var itemDCIdx = 0;
                var itemDCId = (isTest) ? 101 : await parent.TerminalApi.GetNodeId(highlightedNode);
                var itemDCDesc = (isTest) ? "itemDCDesc" : await parent.TerminalApi.GetCheckItemDescription(highlightedNode);
                //Not Supported
                var itemDCBaseAmount = 0;

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
    } catch (error) { await logToWorker("HighlightedIndexInfo " + error, LogLevel.ERROR); }
}
// #endregion

// #region Set Check Information Functions IG/Test Format
//dataTagType (optional) - ga, interactiveaccount,loyalty, member, folio, and banquet
//taggedAccount (optional)
async function SetCheckDataTag(checkInfo, newDataTag, newDataTagType, taggedAccount) {
    try {
        var checkDataTagOld = (isTest) ? "checkDataTagOld" : await parent.TerminalApi.GetCheckDataTag(checkInfo);
        var checkDataTagNew = (isTest) ? newDataTag + "-" + newDataTagType : await parent.TerminalApi.SetCheckDataTag(checkInfo, newDataTag, newDataTagType, taggedAccount);
        var checkDataTag = (isTest) ? newDataTag : await parent.TerminalApi.GetCheckDataTag(checkInfo);
        var logMsg = "B:" + checkDataTagOld + "|A:" + newDataTag + "|V:" + checkDataTag;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckDataTag: " + logMsg, LogLevel.INFO);
    } catch (error) { await logToWorker("SetCheckDataTag: " + error, LogLevel.ERROR); }
}

async function SetCheckGuestId(checkInfo, newGuestId) {
    try {
        var checkGuestIdOld = (isTest) ? "checkTableOld" : await parent.TerminalApi.GetCheckGuestId(checkInfo);
        var checkGuestIdNew = (isTest) ? newGuestId : await parent.TerminalApi.SetCheckGuestId(checkInfo, newGuestId);
        var checkGuestId = (isTest) ? newGuestId : await parent.TerminalApi.GetCheckGuestId(checkInfo);
        var logMsg = "B:" + checkGuestIdOld + "|A:" + newGuestId + "|V:" + checkGuestId;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckGuestId: " + logMsg, LogLevel.INFO);
    } catch (error) { await logToWorker("SetCheckGuestId: " + error, LogLevel.ERROR); }
}

async function SetCheckGuestName(checkInfo, newGuestName) {
    try {
        var checkGuestNameOld = (isTest) ? "checkTableOld" : await parent.TerminalApi.GetCheckGuestName(checkInfo);
        var checkGuestNameNew = (isTest) ? newGuestName : await parent.TerminalApi.SetCheckGuestName(checkInfo, newGuestName);
        var checkGuestName = (isTest) ? newGuestName : await parent.TerminalApi.GetCheckGuestName(checkInfo);
        var logMsg = "B:" + checkGuestNameOld + "|A:" + newGuestName + "|V:" + checkGuestName;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetCheckGuestName: " + logMsg, LogLevel.INFO);
    } catch (error) { await logToWorker("SetCheckGuestName: " + error, LogLevel.ERROR); }
}

async function SetDataString(newDataString, index) {
    try {
        const intIndex = parseInt(index, 10);
        var checkDataStringOld = (isTest) ? "checkDataStringOld" : await parent.TerminalApi.GetDataString(intIndex);
        var checkDataStringNew = (isTest) ? newDataString : await parent.TerminalApi.SetDataString(intIndex, newDataString);
        var checkDataString = (isTest) ? newDataString : await parent.TerminalApi.GetDataString(intIndex);
        var logMsg = "Idx:" + index + "|B:" + checkDataStringOld + "|A:" +
            newDataString + "|V:" + checkDataString;
        if (!isTest) await parent.TerminalApi.Log(JSProgName, logMsg);
        await logToWorker("SetDataString: " + logMsg, LogLevel.INFO);
    } catch (error) { await logToWorker("SetCheckGuestId: " + error, LogLevel.ERROR); }
}
// #endregion

// #region GetAllInfo Call Terminal & Check Functions as applicable
async function GetAllInfo(jsFunc, rqType, rqName, requestData, getBasicInfo, getHighlightInfo) {
    var isSuccess = false;
    try {
        requestData.setRequestInfo({ RqType: rqType, RqName: rqName });

        await logToWorker("RequestInfo " + jsFunc + BR + requestData.RequestInfo.RqType + BR +
            requestData.RequestInfo.RqName + BR, LogLevel.DEBUG);

        var isTerminalInfoOK = await GetTerminalInfo(jsFunc, requestData);
        if (!isTest) await parent.TerminalApi.Log(JSProgName, "isTerminalInfoOK:" + isTerminalInfoOK);

        if (isTerminalInfoOK) {
            var checkInfo = await GetCheckObjectFromIG();
            var isCheckInfoOK = await GetCheckBasicInfo(jsFunc, requestData, checkInfo);
            if (!isTest) await parent.TerminalApi.Log(JSProgName, "isCheckInfoOK OpenCheck:" + isCheckInfoOK);

            if (isCheckInfoOK && !getBasicInfo) {
                var checkNodeIndex = 0;
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckMenuItemInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckMenuItemInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckDiscInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckDiscInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
                if (!isTest) await parent.TerminalApi.Log(JSProgName, "GetCheckTenderInfo:" + checkNodeIndex);
                checkNodeIndex = await GetCheckTenderInfo(jsFunc, requestData, checkInfo, checkNodeIndex);
            }

            if (getHighlightInfo) {
                //Last after getting all possible information
                await GetHighlightedIndexInfo(jsFunc, requestData, checkInfo);
            }

            isSuccess = true;
        }
    } catch (error) { await logToWorker("GetAllInfo " + error, LogLevel.ERROR); }
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
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        }
        else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_371", "MemberDiscount"
async function MemberDiscount() {
    var jsFunc = "371";
    var rqType = "PreFunctionButton_371";
    var rqName = "MemberDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.GuestId)) await SetCheckGuestId(checkInfo, responseData.GuestId);
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                if (!isEmpty(responseData.GuestName)) await SetCheckGuestName(checkInfo, responseData.GuestName);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx); };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {                    
                    for (var discount of responseData.DiscountDetails)
                    { 
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId,dcValue, null);	

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };

                    // #region 20251216 Added code, Result Text File required now to call VoucherPayment.exe
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "MemberDiscount2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("MemberDiscount2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("MemberDiscount2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_372", "EmployeeDiscount"
async function EmployeeDiscount() {
    var jsFunc = "372";
    var rqType = "PreFunctionButton_372";
    var rqName = "EmployeeDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            }
            else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.GuestId)) await SetCheckGuestId(checkInfo, responseData.GuestId);
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                if (!isEmpty(responseData.GuestName)) await SetCheckGuestName(checkInfo, responseData.GuestName);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx); };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };

                    // #region 20251217 Added code, Result Text File required
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "EmployeeDiscount2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("EmployeeDiscount2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("EmployeeDiscount2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_373", "CheckDiscount"
async function CheckDiscount() {
    var jsFunc = "373";
    var rqType = "PreFunctionButton_373";
    var rqName = "CheckDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                
                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx); };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };

                    // #region 20251217 Added code, Result Text File required
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "CheckDiscount2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("CheckDiscount2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("CheckDiscount2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_374", "ItemDiscount"
async function ItemDiscount() {
    var jsFunc = "374";
    var rqType = "PreFunctionButton_374";
    var rqName = "ItemDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, true);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;

                        //TODO: Apply Item Discount Test 1
                        //var checkInfo = await GetCheckObjectFromIG();
                        //var highlightednode = await GetHighlightedIndexInfo(jsFunc, requestData, checkInfo);
                        //var result2 = await parent.TerminalApi.ApplyItemLevelDiscount(highlightednode);
                        //var setkeypad = parent.TerminalApi.SetKeyPadAmount(checkInfo, dcValue);

                        //await logToWorker(rqName + CL + "|Add Item Discount|" + discount.DCId + BR +
                        //    discount.DCPercent + BR + discount.DCAmount + BR + "SetKeypadAmt:" + //setkeypad + BR +
                        //    "Application Status:" + JSON.stringify(result2, null, 2), LogLevel.INFO);

                        //TODO: Add Item Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Item Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_375", "SalesGiftGC"
async function SalesGiftGC() {
    var jsFunc = "375";
    var rqType = "PreFunctionButton_375";
    var rqName = "SalesGiftGC";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_376", "PaidGiftGC"
async function PaidGiftGC() {
    var jsFunc = "376";
    var rqType = "PreFunctionButton_376";
    var rqName = "PaidGiftGC";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_378", "RptCheckByTable"
async function RptCheckByTable() {
    var jsFunc = "378";
    var rqType = "PreFunctionButton_378";
    var rqName = "RptCheckByTable";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_379", "RoomDetailSearch"
async function RoomDetailSearch() {
    var jsFunc = "379";
    var rqType = "PreFunctionButton_379";
    var rqName = "RoomDetailSearch";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            //Add Code to ask for additional information
            var getInput = (isTest) ? "" : await parent.TerminalApi.GetUserInput("ROOM NUMBER",
                "룸번호를 입력하고 Enter버튼을 누르세요.",
                "Type Room Number and Enter.",
                isAlphaNumeric = true,
                isMSRSwipeEnabled = true,
                msrTrack = 2,
                decimalDigits = 0);

            requestData.setAdditionalInfo({
                UsrInput: getInput //Room Number
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_377", "CCDiscount"
async function CCDiscount() {
    var jsFunc = "377";
    var rqType = "PreFunctionButton_377";
    var rqName = "CCDiscount";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };

                    // #region 20251217 Added code, Result Text File required
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "CCDiscount2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("CCDiscount2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("CCDiscount2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_480", "CCDiscountNew"
async function CCDiscountNew() {
    var jsFunc = "480";
    var rqType = "PreFunctionButton_480";
    var rqName = "CCDiscountNew";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };

                    // #region 20251217 Added code, Result Text File required
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "CCDiscountNew2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("CCDiscountNew2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("CCDiscountNew2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_481", "CCLookupDc"
async function CCLookupDc() {
    var jsFunc = "481";
    var rqType = "PreFunctionButton_481";
    var rqName = "CCLookupDc";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, false, false);

        if (isProceed) {
            //Add Code to ask for additional information
            var getInput = (isTest) ? "0" : await parent.TerminalApi.GetKeyPadAmount();

            requestData.setAdditionalInfo({
                UsrInput: getInput //KeyPad Amount
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);

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

                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "CCLookupDc2", requestData2, false, false);

                    if (isProceed) {
                        //Add Code to ask for additional information
                        var getInput = (isTest) ? "0" : await parent.TerminalApi.GetKeyPadAmount();

                        requestData2.setAdditionalInfo({
                            UsrInput: getInput //KeyPad Amount
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("CCLookupDc2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("CCLookupDc2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_486", "PrintCardSlip"
async function PrintCardSlip() {
    var jsFunc = "486";
    var rqType = "PreFunctionButton_486";
    var rqName = "PrintCardSlip";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            //Add Code to ask for additional information
            var getInput = (isTest) ? "" : await parent.TerminalApi.GetUserInput("CHECK NUMBER",
                "첵번호를 입력하고 Enter버튼을 누르세요.",
                "Type Check Number and Enter.",
                isAlphaNumeric = true,
                isMSRSwipeEnabled = true,
                msrTrack = 2,
                decimalDigits = 0);

            requestData.setAdditionalInfo({
                UsrInput: getInput //Check Number
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_487", "LastCardSlip"
async function LastCardSlip() {
    var jsFunc = "487";
    var rqType = "PreFunctionButton_487";
    var rqName = "LastCardSlip";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_488", "ManualCard"
async function ManualCard() {
    var jsFunc = "488";
    var rqType = "PreFunctionButton_488";
    var rqName = "ManualCard";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_489", "ReopenErrCard"
async function ReopenErrCard() {
    var jsFunc = "489";
    var rqType = "PreFunctionButton_489";
    var rqName = "ReopenErrCard";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion


// #region "PreFunctionButton_490", "CEPSettings"
async function CEPSettings() {
    var jsFunc = "490";
    var rqType = "PreFunctionButton_490";
    var rqName = "CEPSettings";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreFunctionButton_491", "ParnasRewardMembership"
async function ParnasRewardMembership() {
    var jsFunc = "491";
    var rqType = "PreFunctionButton_491";
    var rqName = "ParnasRewardMembership";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqName,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(rqName + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.GuestId)) await SetCheckGuestId(checkInfo, responseData.GuestId);
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);
                if (!isEmpty(responseData.GuestName)) await SetCheckGuestName(checkInfo, responseData.GuestName);

                //Set the Check DataString with the Member Dc Information
                for (var dataString of responseData.DataStrings) {
                    await SetDataString(dataString.Data, dataString.Idx);
                };

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.ApplyDiscount) {
                    for (var discount of responseData.DiscountDetails) {
                        //Get the dc value depending if Percent / Amount was set
                        var dcValue = (discount.DCPercent == "0") ? discount.DCAmount : discount.DCPercent;
                        //Add Discount to Check
                        var result = await parent.TerminalApi.ApplyDiscountById(discount.DCId, dcValue, null);

                        await logToWorker(rqName + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };


                    // #region 20251217 Added code, Result Text File required
                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "ParnasRewardMembership2", requestData2, false, false);

                    if (isProceed) {
                        //Need the set DataString Value for the Result Text Request File
                        var DataString0 = await parent.TerminalApi.GetDataString(0);
                        var DataString1 = await parent.TerminalApi.GetDataString(1);
                        var DataString2 = await parent.TerminalApi.GetDataString(2);
                        var DataString3 = await parent.TerminalApi.GetDataString(3);
                        var DataString4 = await parent.TerminalApi.GetDataString(4);
                        var DataString5 = await parent.TerminalApi.GetDataString(5);
                        var DataString6 = await parent.TerminalApi.GetDataString(6);
                        var DataString7 = await parent.TerminalApi.GetDataString(7);
                        var DataString8 = await parent.TerminalApi.GetDataString(8);

                        requestData2.setCheckDataStringInfo({
                            DataString0: DataString0,
                            DataString1: DataString1,
                            DataString2: DataString2,
                            DataString3: DataString3,
                            DataString4: DataString4,
                            DataString5: DataString5,
                            DataString6: DataString6,
                            DataString7: DataString7,
                            DataString8: DataString8
                        });

                        //Pass Thru from previous response
                        requestData2.setAdditionalInfo({
                            MsgType: responseData.MsgType,
                            sMsg04: responseData.sMsg04,
                            ChkTaxAmt_BeforeDC: responseData.ChkTaxAmt_BeforeDC,
                            ChkGndTot_BeforeDC: responseData.ChkGndTot_BeforeDC,
                            ChkSvcChg_BeforeDC: responseData.ChkSvcChg_BeforeDC
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("ParnasRewardMembership2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("ParnasRewardMembership2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                    // #endregion
                }
            }
        } else { await logToWorker(rqName + BR + jsFunc + NL + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqName + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PostItem", "PostItem"
async function PostItem() {
    var jsFunc = "PostItem";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, true);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO);

                //Analyze Response - If Discount Details are provided, apply to the check
                if (responseData.AddMenuItem) {
                    for (var item of responseData.ItemDetails) {
                        //Add Item to Check
                        var result = await parent.TerminalApi.AddMenuItem(item.MenuItemId, item.MenuItemQty);

                        await logToWorker(jsFunc + CL + "|Add Item|" + item.MenuItemId + BR + item.MenuItemQty + BR +
                            "Add Status:" + JSON.stringify(result, null, 2), LogLevel.INFO);
                    };
                }
            }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreSaveCheck", "PreSaveCheck"
async function PreSaveCheck() {
    var jsFunc = "PreSaveCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreVoidCheck", "PreVoidCheck"
async function PreVoidCheck() {
    var jsFunc = "PreVoidCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);

                if (responseData.RunTermFunc) {
                    var checkInfo = await GetCheckObjectFromIG();
                    var runTrmFunc = await parent.TerminalApi.RunTerminalFunction(responseData.TermFuncNo, checkInfo); //Void Item

                    await logToWorker(jsFunc + CL + "|RunTerminalFunction Status:" +
                        JSON.stringify(runTrmFunc, null, 2), LogLevel.INFO);
                }
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreVoidChkEntities" (), "PreFunctionButton_46" (Item,Discount, Tender) => Both call this function
async function PreVoidItem() {
    var jsFunc = "46";
    var rqType = "PreFunctionButton_46";
    var rqName = "PreVoidItem";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, rqType, rqName, requestData, true, true);

        if (isProceed) {
            var DataString0 = await parent.TerminalApi.GetDataString(0);
            var DataString1 = await parent.TerminalApi.GetDataString(1);
            var DataString2 = await parent.TerminalApi.GetDataString(2);
            var DataString3 = await parent.TerminalApi.GetDataString(3);
            var DataString4 = await parent.TerminalApi.GetDataString(4);
            var DataString5 = await parent.TerminalApi.GetDataString(5);
            var DataString6 = await parent.TerminalApi.GetDataString(6);
            var DataString7 = await parent.TerminalApi.GetDataString(7);
            var DataString8 = await parent.TerminalApi.GetDataString(8);

            requestData.setCheckDataStringInfo({
                DataString0: DataString0,
                DataString1: DataString1,
                DataString2: DataString2,
                DataString3: DataString3,
                DataString4: DataString4,
                DataString5: DataString5,
                DataString6: DataString6,
                DataString7: DataString7,
                DataString8: DataString8
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(rqType + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(rqType,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(rqType + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(rqType + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(rqType + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreCancelCheck", "PreCancelCheck"
async function PreCancelCheck() {
    var jsFunc = "PreCancelCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);

                if (responseData.RunTermFunc) {
                    var checkInfo = await GetCheckObjectFromIG();
                    var runTrmFunc = await parent.TerminalApi.RunTerminalFunction(responseData.TermFuncNo, checkInfo); //Void Item

                    await logToWorker(jsFunc + CL + "|RunTerminalFunction Status:" +
                        JSON.stringify(runTrmFunc, null, 2), LogLevel.INFO);
                }
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreTender", "PreTender"
async function PreTender(event) {
    var jsFunc = "PreTender";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            //Add Code to ask for additional information
            var getInput = (isTest) ? "0" : await parent.TerminalApi.GetKeyPadAmount();
            var getId = (isTest) ? "0" : await event.invokeMethodAsync('GetParam', 'Id');

            requestData.setAdditionalInfo({
                UsrInput: getInput, //KeyPad Amount
                TenderId: getId //Id Of the Tender Clicked
            });

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else {
                await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO);
                var checkInfo = await GetCheckObjectFromIG();
                if (!isEmpty(responseData.CheckDataTag)) await SetCheckDataTag(checkInfo, responseData.CheckDataTag);

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

                        await logToWorker(jsFunc + CL + "|Add Discount|" + discount.DCId + BR +
                            discount.DCPercent + BR + discount.DCAmount + BR +
                            "Application Status:" + result + BR, LogLevel.INFO);
                    };

                    //Get Latest Check information after applying the discount if any
                    var requestData2 = new RequestDataStructure();
                    isProceed = await GetAllInfo(jsFunc, rqType, "PreTender2", requestData2, false, false);

                    if (isProceed) {
                        //Add Code to ask for additional information
                        var getInput = (isTest) ? "0" : await parent.TerminalApi.GetKeyPadAmount();
                        var getId = (isTest) ? "0" : await event.invokeMethodAsync('GetParam', 'Id');

                        requestData2.setAdditionalInfo({
                            UsrInput: getInput, //KeyPad Amount
                            TenderId: getId //Id Of the Tender Clicked
                        });

                        const sanizedRqData2 = deepStringify(requestData2);
                        const logJsonInfo2 = JSON.stringify(sanizedRqData2, null, 2);
                        await logToWorker(rqType + BR + jsFunc + NL + logJsonInfo2, LogLevel.DEBUG);
                        var responseData2 = await processRequest(sanizedRqData2);

                        if (!responseData2.IsSuccess && !isTest) {
                            await parent.TerminalApi.ShowCustomAlert("PreTender2",
                                JSON.stringify(responseData2.ResponseMessage, null, 2), 2);
                        } else { await logToWorker("PreTender2" + CL + responseData2.ResponseMessage, LogLevel.INFO); }
                    }
                }
            }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PostTender", "PostTender"
async function PostTender() {
    var jsFunc = "PostTender";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, true);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);

                if (responseData.RunTermFunc) {
                    var checkInfo = await GetCheckObjectFromIG();
                    var runTrmFunc = await parent.TerminalApi.RunTerminalFunction(responseData.TermFuncNo, checkInfo); //Void Item

                    await logToWorker(jsFunc + CL + "|RunTerminalFunction Status:" +
                        JSON.stringify(runTrmFunc, null, 2), LogLevel.INFO);
                }
            } else {
                await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO);

                if (responseData.SetTenderXtraData) {
                    var checkInfo = await GetCheckObjectFromIG();
                    var highlightedNode = (isTest) ? 2 : await parent.TerminalApi.GetIndexOfHighlightedNode(checkInfo);

                    await parent.TerminalApi.PreSetTenderExtraData(responseData.TenderExtraData);

                    var tenderXtrData = (isTest) ? "tenderXtrData" : await parent.TerminalApi.GetTenderExtraData(highlightedNode);

                    await logToWorker(jsFunc + CL + "tenderXtrData:" + tenderXtrData, LogLevel.INFO);
                }
            }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreClosedCheck", "PreClosedCheck"
async function PreClosedCheck() {
    var jsFunc = "PreClosedCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PostClosedCheck", "PostClosedCheck"
async function PostClosedCheck() {
    var jsFunc = "PostClosedCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PreReOpenClosedCheck", "PreReOpenClosedCheck"
async function PreReOpenClosedCheck() {
    var jsFunc = "PreReOpenClosedCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PostReOpenClosedCheck", "PostReOpenClosedCheck"
async function PostReOpenClosedCheck() {
    var jsFunc = "PostReOpenClosedCheck";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);
            var responseData = await processRequest(sanizedRqData);

            if (!responseData.IsSuccess && !isTest) {
                await parent.TerminalApi.ShowCustomAlert(jsFunc,
                    JSON.stringify(responseData.ResponseMessage, null, 2), 2);
            } else { await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO); }
        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

// #region "PrepareCheckReceipt", "PrepareCheckReceipt"
async function PrepareCheckReceipt(event) {
    var jsFunc = "PrepareCheckReceipt";
    var requestData = new RequestDataStructure();

    try {
        var isProceed = await GetAllInfo(jsFunc, jsFunc, jsFunc, requestData, false, false);

        if (isProceed) {
            var DataString0 = await parent.TerminalApi.GetDataString(0);
            var DataString1 = await parent.TerminalApi.GetDataString(1);
            var DataString2 = await parent.TerminalApi.GetDataString(2);
            var DataString3 = await parent.TerminalApi.GetDataString(3);
            var DataString4 = await parent.TerminalApi.GetDataString(4);
            var DataString5 = await parent.TerminalApi.GetDataString(5);
            var DataString6 = await parent.TerminalApi.GetDataString(6);
            var DataString7 = await parent.TerminalApi.GetDataString(7);
            var DataString8 = await parent.TerminalApi.GetDataString(8);

            requestData.setCheckDataStringInfo({
                DataString0: DataString0,
                DataString1: DataString1,
                DataString2: DataString2,
                DataString3: DataString3,
                DataString4: DataString4,
                DataString5: DataString5,
                DataString6: DataString6,
                DataString7: DataString7,
                DataString8: DataString8
            });

            var posCheckData = await event.invokeMethodAsync('GetParam', 'Request');
            parent.window.posCheck = JSON.parse(posCheckData.check);

            const sanizedChkData = deepStringify(parent.window.posCheck);
            const logJsonCheckInfo = JSON.stringify(sanizedChkData, null, 2);
            requestData.setPosCheckData(sanizedChkData);
            await logToWorker(jsFunc + BR + logJsonCheckInfo, LogLevel.DEBUG);

            const sanizedRqData = deepStringify(requestData);
            const logJsonInfo = JSON.stringify(sanizedRqData, null, 2);
            await logToWorker(jsFunc + BR + logJsonInfo, LogLevel.DEBUG);

            var responseData = await processRequest(sanizedRqData);

            await logToWorker(jsFunc + CL + responseData.ResponseMessage, LogLevel.INFO);

            await parent.window.Receipt.GetReceiptText(event);
            await parent.TerminalApi.ReceiptInit();

            await parent.TerminalApi.ReceiptOrderHeader();
            if (responseData.AddCustomReceipt){
                for (var customText of responseData.CR_AfterOrderHeader) {
                    await parent.TerminalApi.ReceiptAppendText(customText);}}

            await parent.TerminalApi.ReceiptMenuItems();
            if (responseData.AddCustomReceipt) {
                for (var customText of responseData.CR_AfterMenuItems) {
                    await parent.TerminalApi.ReceiptAppendText(customText);}}

            await parent.TerminalApi.ReceiptSubTotal();
            if (responseData.AddCustomReceipt) {
                for (var customText of responseData.CR_AfterSubTotal) {
                    await parent.TerminalApi.ReceiptAppendText(customText);}}

            await parent.TerminalApi.ReceiptTenders();
            if (responseData.AddCustomReceipt) {
                for (var customText of responseData.CR_AfterTenders) {
                    await parent.TerminalApi.ReceiptAppendText(customText);}}

            if (responseData.ReplaceFooter) {
                for (var customText of responseData.CR_NewFooter) {
                    await parent.TerminalApi.ReceiptAppendText(customText);
                }}
            else { await parent.TerminalApi.ReceiptFooter(); }

            if (responseData.AddCustomReceipt) {
                for (var customText of responseData.CR_AfterFooter) {
                    await parent.TerminalApi.ReceiptAppendText(customText);}}

            var receipt = await parent.TerminalApi.GetReceiptText();
            await event.invokeMethodAsync('SetParam', 'Receipt', receipt);
            await logToWorker(jsFunc + CL + "Receipt-" + receipt, LogLevel.INFO);

        } else { await logToWorker(jsFunc + BR + "GetAllInfo Failed.", LogLevel.INFO); }
    } catch (error) { await logToWorker(jsFunc + BR + error, LogLevel.ERROR); }
}
// #endregion

if (isTest) MemberInquiry();
if (isTest) MemberDiscount();
if (isTest) RptCheckByTable();
if (isTest) RoomDetailSearch();

