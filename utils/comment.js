const {getPage, waitPageElementByCss} = require("./driver");


async function getCountOfUserComment() {
    await getPage("comments")
    let CountComments = await waitPageElementByCss("[class=h4_section]>b", ...driverWithTimeout)
    return Number(await CountComments.getText())
}

module.exports = {
    getCountOfUserComment
}
