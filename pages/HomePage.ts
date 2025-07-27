import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
  // Navigation elements
  readonly elementsCard: Locator;
  readonly formsCard: Locator;
  readonly alertsFrameWindowsCard: Locator;
  readonly widgetsCard: Locator;
  readonly interactionsCard: Locator;
  readonly bookStoreApplicationCard: Locator;

  // Header elements
  readonly headerLogo: Locator;
  readonly bannerImage: Locator;

  constructor(page: Page) {
    super(page);
    
    // Initialize locators
    this.elementsCard = page.locator('.card-body').filter({ hasText: 'Elements' });
    this.formsCard = page.locator('.card-body').filter({ hasText: 'Forms' });
    this.alertsFrameWindowsCard = page.locator('.card-body').filter({ hasText: 'Alerts, Frame & Windows' });
    this.widgetsCard = page.locator('.card-body').filter({ hasText: 'Widgets' });
    this.interactionsCard = page.locator('.card-body').filter({ hasText: 'Interactions' });
    this.bookStoreApplicationCard = page.locator('.card-body').filter({ hasText: 'Book Store Application' });
    
    this.headerLogo = page.locator('img[src="/images/Toolsqa.jpg"]');
    this.bannerImage = page.locator('.banner-image');
  }

  /**
   * Navigate to the home page
   */
  async navigateToHome() {
    await this.goto();
    await this.waitForPageLoad();
  }

  /**
   * Click on Elements card
   */
  async clickElementsCard() {
    await this.scrollToElement(this.elementsCard);
    await this.clickWithRetry(this.elementsCard);
  }

  /**
   * Click on Forms card
   */
  async clickFormsCard() {
    await this.scrollToElement(this.formsCard);
    await this.clickWithRetry(this.formsCard);
  }

  /**
   * Click on Alerts, Frame & Windows card
   */
  async clickAlertsFrameWindowsCard() {
    await this.scrollToElement(this.alertsFrameWindowsCard);
    await this.clickWithRetry(this.alertsFrameWindowsCard);
  }

  /**
   * Click on Widgets card
   */
  async clickWidgetsCard() {
    await this.scrollToElement(this.widgetsCard);
    await this.clickWithRetry(this.widgetsCard);
  }

  /**
   * Click on Interactions card
   */
  async clickInteractionsCard() {
    await this.scrollToElement(this.interactionsCard);
    await this.clickWithRetry(this.interactionsCard);
  }

  /**
   * Click on Book Store Application card
   */
  async clickBookStoreApplicationCard() {
    await this.scrollToElement(this.bookStoreApplicationCard);
    await this.clickWithRetry(this.bookStoreApplicationCard);
  }

  /**
   * Verify that all main cards are visible
   */
  async verifyAllCardsAreVisible() {
    await this.waitForElement(this.elementsCard);
    await this.waitForElement(this.formsCard);
    await this.waitForElement(this.alertsFrameWindowsCard);
    await this.waitForElement(this.widgetsCard);
    await this.waitForElement(this.interactionsCard);
    await this.waitForElement(this.bookStoreApplicationCard);
  }

  /**
   * Get the text of all card titles
   */
  async getAllCardTitles(): Promise<string[]> {
    const cards = [
      this.elementsCard,
      this.formsCard,
      this.alertsFrameWindowsCard,
      this.widgetsCard,
      this.interactionsCard,
      this.bookStoreApplicationCard
    ];

    const titles: string[] = [];
    for (const card of cards) {
      const title = await this.getText(card);
      titles.push(title.trim());
    }
    return titles;
  }

  /**
   * Verify page title
   */
  async verifyPageTitle() {
    const title = await this.getPageTitle();
    if (!title.includes('DEMOQA')) {
      throw new Error(`Expected page title to contain 'DEMOQA', but got: ${title}`);
    }
  }

  /**
   * Verify header logo is visible
   */
  async verifyHeaderLogo() {
    await this.waitForElement(this.headerLogo);
  }

  /**
   * Verify banner image is visible
   */
  async verifyBannerImage() {
    await this.waitForElement(this.bannerImage);
  }
} 