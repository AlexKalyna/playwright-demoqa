import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  private navigationElements: Locator;
  private headerElements: Locator;
  private practiceFormLink: Locator;
  private elementsLink: Locator;
  private formsLink: Locator;
  private alertsFrameWindowsLink: Locator;
  private widgetsLink: Locator;
  private interactionsLink: Locator;
  private bookStoreLink: Locator;
  private toolsQALogo: Locator;
  private toolsQATitle: Locator;

  constructor(page: Page) {
    super(page);
    this.navigationElements = this.page.locator('.card-body');
    this.headerElements = this.page.locator('.main-header');
    this.practiceFormLink = this.page.locator('text=Practice Form');
    this.elementsLink = this.page.locator('text=Elements');
    this.formsLink = this.page.locator('text=Forms');
    this.alertsFrameWindowsLink = this.page.locator('text=Alerts, Frame & Windows');
    this.widgetsLink = this.page.locator('text=Widgets');
    this.interactionsLink = this.page.locator('text=Interactions');
    this.bookStoreLink = this.page.locator('text=Book Store Application');
    this.toolsQALogo = this.page.locator('.banner-image');
    this.toolsQATitle = this.page.locator('.main-header');
  }

  async navigateToHome(): Promise<void> {
    await this.navigateTo('/');
    await this.waitForPageLoad();
  }

  async clickPracticeForm(): Promise<void> {
    await this.practiceFormLink.click();
  }

  async clickElements(): Promise<void> {
    await this.elementsLink.click();
  }

  async clickForms(): Promise<void> {
    await this.formsLink.click();
  }

  async clickAlertsFrameWindows(): Promise<void> {
    await this.alertsFrameWindowsLink.click();
  }

  async clickWidgets(): Promise<void> {
    await this.widgetsLink.click();
  }

  async clickInteractions(): Promise<void> {
    await this.interactionsLink.click();
  }

  async clickBookStore(): Promise<void> {
    await this.bookStoreLink.click();
  }

  async isToolsQALogoVisible(): Promise<boolean> {
    return await this.toolsQALogo.isVisible();
  }

  async getToolsQATitle(): Promise<string> {
    return await this.toolsQATitle.textContent() || '';
  }

  async getAllNavigationElements(): Promise<Locator[]> {
    return await this.navigationElements.all();
  }
} 