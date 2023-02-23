class TextUtils {
    static clearText(str) {
        let re = /[\u2060\u00A0]/g;
        return str.replaceAll(re, " ").trim();
    }
}

module.exports = {
    TextUtils,
}
