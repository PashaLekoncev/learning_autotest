const {waitPageElementByCss} = require("../utils/driver");


async function getToastErrorText() {
    let error = await waitPageElementByCss("div[pages=toast__content]", ...driverWithTimeout)
    return await error.getText()
}


module.exports = {
    getToastErrorText,
}
