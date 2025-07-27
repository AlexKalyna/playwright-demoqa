import { Page, Locator, expect } from '@playwright/test';

export class DragAndDropComponent {
  constructor(private page: Page) {}

  async dragTo(draggable: Locator, droppable: Locator): Promise<void> {
    await draggable.dragTo(droppable);
  }

  async dragWithMouse(draggable: Locator, droppable: Locator): Promise<void> {
    await draggable.hover();
    await this.page.mouse.down();
    await droppable.hover();
    await this.page.mouse.up();
  }

  async verifyDropSuccess(droppable: Locator): Promise<void> {
    await expect(droppable).toContainText('Dropped!');
  }

  async verifyInitialState(droppable: Locator): Promise<void> {
    await expect(droppable).toContainText('Drop here');
  }

  async verifyDraggableVisible(draggable: Locator): Promise<void> {
    await expect(draggable).toBeVisible();
  }

  async verifyCursorStyle(draggable: Locator, expectedCursor: string): Promise<void> {
    await expect(draggable).toHaveCSS('cursor', expectedCursor);
  }

  async measurePerformance(operation: () => Promise<void>): Promise<number> {
    const startTime = Date.now();
    await operation();
    const endTime = Date.now();
    return endTime - startTime;
  }

  async verifyPerformance(operation: () => Promise<void>, maxDuration: number): Promise<void> {
    const duration = await this.measurePerformance(operation);
    expect(duration).toBeLessThan(maxDuration);
  }
} 