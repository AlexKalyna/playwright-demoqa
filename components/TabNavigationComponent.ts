import { Page } from '@playwright/test';
import { TAB_NAMES } from '../data/droppableTestData';

export class TabNavigationComponent {
  constructor(private page: Page) {}

  async navigateToAcceptTab(): Promise<void> {
    await this.page.locator('[data-rb-event-key="accept"]').click();
  }

  async navigateToPreventPropagationTab(): Promise<void> {
    await this.page.locator('[data-rb-event-key="preventPropogation"]').click();
  }

  async navigateToRevertDraggableTab(): Promise<void> {
    await this.page.locator('[data-rb-event-key="revertable"]').click();
  }

  async navigateToSimpleTab(): Promise<void> {
    await this.page.locator('[data-rb-event-key="simple"]').click();
  }
} 