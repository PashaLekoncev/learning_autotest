const {BasePage} = require("../pages/base_page");


class EditorPage extends BasePage{

    get titleInput() {return this.waitPageElementByCss(".input_title .input__input.medium-editor-element")}
    get bodyInput() {return this.waitPageElementByCss(".story-editor-block__content .input__input.medium-editor-element")}
    get tagsInput() {return this.waitPageElementByCss(".input__box .input__input.input__input_carriage")}
    get tagLabel() {return this.waitPageElementByCss(".dropdown-item__highlight")}
    get communitiesInput() {return this.waitPageElementByCss(".story-editor__communities .input__input")}
    get submitPostBtn() {return this.waitPageElementByCss("button[data-role=\"publish\"]")}

    async writeTitle(text) {
        await this.sendKeysOn(await this.titleInput, text)
    }

    async writeBody(text) {
        await this.sendKeysOn(await this.bodyInput, text)
    }

    async writeTag(tags) {
        if (Array.isArray(tags)) {
            for (let tag of tags) {
                await this.sendKeysOn(await this.tagsInput, tag)
                await this.clickOn(await this.tagLabel)
            }
        }
    }

    // TODO Сделать выбор соо
    // Cелектор соо <div class="popup popup_animation popup_show" style="min-width: 652px; max-width: 1956px; left: 176px; top: 584px;"><div class="popup__wrapper"><div class="popup__container"><div class="popup__content"><div class="dropdown-list"><div class="dropdown-list__empty" style="display: none;"></div><div class="dropdown-list__items"><div class="community dropdown-item dropdown-item_current" data-id="677">
    // 	<div class="community-avatar"><img src="https://cs.pikabu.ru/images/def_avatar/community_v3.png" al

    async addPost() {
        await this.clickOn(await this.submitPostBtn)
    }

    async open() {
        await this.openPage("/add")
    }

}

module.exports = {
    EditorPage
}
