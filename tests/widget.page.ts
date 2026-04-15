import {Page} from "@playwright/test";

enum WidgetPageSelectors {
    WRAPPER = '.sc-dino-typography-h > [class^=widget__]',
    WIDGET_BODY = '[class^=widgetWrapper] > [class^=widget__]',
    HEADER_TEXT = '[class^="header__"] h5',

    BUTTON_OPEN = '[data-test="openWidget"]',
    OPENED_WRAPPER = '[class^="opened__"]',

    BUTTON_WRITE_TO_US = '[data-test="button_feedback_form"]',
    ARTICLE_POPULAR_TITLE = '[class^=popularTitle__]',
    ARTICLE_POPULAR_LIST = `${ARTICLE_POPULAR_TITLE} + ul[class^=articles__]`,
    ARTICLE_POPULAR_LIST_ITEM = `${ARTICLE_POPULAR_LIST} > li`,

    BUTTON_COOKIE = '._UCHI_COOKIE__button',

    INPUT_NAME = '[data-test="form_items_input_name"]',
    INPUT_EMAIL = '[data-test="form_items_input_mail"]',
    FORM_WITH_TYPES = '[data-test="form_items_select_1"]',
    FORM_WITH_THEMES = '[data-test="form_items_select_2"]',
    INPUT_TEXT = '[data-test="form_items_textarea"]',
    BUTTON_SEND_MESSAGE = '[data-test="button_send_form"]'
}

export class WidgetPage {
    static selector = WidgetPageSelectors;

    constructor(protected page: Page) {}

    wrapper() {
        return this.page.locator(WidgetPage.selector.WRAPPER)
    }

    async openWidget() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_OPEN).click();
    }

    getPopularArticlesList() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST);
    }

    async getPopularArticles() {
        return this.wrapper().locator(WidgetPage.selector.ARTICLE_POPULAR_LIST_ITEM).all()
    }

    async clickWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US).click();
    }

    getWriteToUs() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_WRITE_TO_US);
    }

    async getTitle() {
        return this.wrapper().locator(WidgetPage.selector.HEADER_TEXT).textContent();
    }

    getWidgetBody() {
        return this.page.locator(WidgetPage.selector.WIDGET_BODY);
    }

    async clickCookie() {
        const cookieButton = this.wrapper().locator(WidgetPage.selector.BUTTON_COOKIE);
        const isVisible = await cookieButton.isVisible().catch(() => false);
        
        if (isVisible) {
            await cookieButton.click();
        }
    }

    getNameInput() {
        return this.wrapper().locator(WidgetPage.selector.INPUT_NAME);
    }

    getEmailInput() {
        return this.wrapper().locator(WidgetPage.selector.INPUT_EMAIL);
    }

    getTypeSelect() {
        return this.wrapper().locator(WidgetPage.selector.FORM_WITH_TYPES);
    }

    getThemeSelect() {
        return this.wrapper().locator(WidgetPage.selector.FORM_WITH_THEMES);
    }

    getTextarea() {
        return this.wrapper().locator(WidgetPage.selector.INPUT_TEXT);
    }

    getSendButton() {
        return this.wrapper().locator(WidgetPage.selector.BUTTON_SEND_MESSAGE);
    }
}

