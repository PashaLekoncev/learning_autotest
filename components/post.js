const {waitPageElementByCss} = require("../utils/driver");

async function getPost(postId) {
    await driver.get(process.env.HOST_NAME + `story/_${postId}`)
    await waitPageElementByCss(".input__input.medium-editor-element", ...driverWithTimeout)
}


module.exports = {
    getPost,
}
