import { test, expect } from '@playwright/test';
import {WidgetPage} from "./widget.page";

test.describe('Uchi.ru widget ', () => {
  let widgetPage: WidgetPage;

  test.beforeEach(async ({page}) => {
    widgetPage = new WidgetPage(page);

    // open uchi.ru main page
    await page.goto('/');

    // close cookies popup
    await widgetPage.clickCookie();
  });

  test('opens', async ({page}) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getWidgetBody()).toBeVisible()
  });

  test('has correct title', async ({ page }) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getPopularArticlesList()).toBeVisible();

    const articles = await widgetPage.getPopularArticles();
    await articles[0].click();
    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getWriteToUs()).not.toBeVisible();

    expect(await widgetPage.getTitle()).toEqual('Связь с поддержкой');
  });

  test('feedback form contains all the fields and sending button', async ({ page }) => {
    await widgetPage.openWidget();

    await expect(widgetPage.getPopularArticlesList()).toBeVisible()
    
    const articles = await widgetPage.getPopularArticles();
    await articles[0].click();
    await widgetPage.clickWriteToUs();

    await expect(widgetPage.getWriteToUs()).not.toBeVisible();

    await expect(widgetPage.getNameInput()).toBeVisible();
    await expect(widgetPage.getEmailInput()).toBeVisible();
    await expect(widgetPage.getTypeSelect()).toBeVisible();
    await expect(widgetPage.getThemeSelect()).toBeVisible();
    await expect(widgetPage.getTextarea()).toBeVisible();
    await expect(widgetPage.getSendButton()).toBeVisible();
  });
})