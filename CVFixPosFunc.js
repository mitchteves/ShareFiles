const NL = "\n";
const BR = "|";
const CL = ":";
const JSProgName = "CVFixPosFunc"; //This class will contain all custom scripts
const LogLevel = Object.freeze({TRACE: "T", DEBUG: "D", INFO: "I", WARN: "W", ERROR: "E", CRITICAL: "C"});

const isTest = false;

//#region 12UX Custom Scripting Register/Subscribe for IG Bundling
(function Register() {
    try {
        if (!isTest) {
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidCheck", "PreVoidCheck");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreVoidChkEntities", "PreVoidChkEntities");
            parent.TerminalApi.Subscribe(window.frameElement.id, "PreTender", "PreTender");
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
