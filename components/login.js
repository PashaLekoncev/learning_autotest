// const {waitPageElementByCss, getPage} = require("../utils/driver");
// const {logout, isUserUnauthorized} = require("./logout");
//
//
// async function auth(userName, password) {
//     await getPage();
//     if (await isUserUnauthorized()) {
//         await signIn(userName, password)
//     }
//     else if (await isUserAuthorized() && userName === await getUserName()) {
//         return null
//     } else if (await isUserAuthorized() && userName !== await getUserName()) {
//         await logout()
//         await signIn(userName, password)
//     }
// }
//
// async function signIn(userName, password) {
//     const login = await waitPageElementByCss("input[placeholder=\"Логин\"]", ...driverWithTimeout)
//     await login.sendKeys(userName);
//     const pass = await waitPageElementByCss("input[placeholder=\"Пароль\"]", ...driverWithTimeout)
//     await pass.sendKeys(password)
//     const authBtn = await waitPageElementByCss("#signin-form button", ...driverWithTimeout)
//     await authBtn.click()
//     await isUserAuthorized()
// }
//
// async function isUserAuthorized() {
//     let ans = await waitPageElementByCss(`a.user__nick.user__nick_big`, ...driverWithTimeout)
//     return !!ans;
// }
//
//
// async function getUserName() {
//     let ans = await waitPageElementByCss(`a.user__nick.user__nick_big`, ...driverWithTimeout)
//     return ans.getText()
// }
//
//
// module.exports = {
//     auth,
//     isUserAuthorized,
//     getUserName
// }
