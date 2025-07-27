import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';
import { DragAndDropComponent } from '../components/DragAndDropComponent';
import { DROPPABLE_SELECTORS, TAB_NAMES, EXPECTED_TEXTS } from '../data/droppableTestData';

export class DroppablePage extends BasePage {
  private dragAndDrop: DragAndDropComponent;

  constructor(page: Page) {
    super(page);
    this.dragAndDrop = new DragAndDropComponent(page);
  }

  // Locators
  get draggable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.draggable);
  }

  get droppable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.droppable).first();
  }

  get droppableNth(): (index: number) => Locator {
    return (index: number) => this.page.locator(DROPPABLE_SELECTORS.droppable).nth(index);
  }

  get acceptable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.acceptable);
  }

  get notAcceptable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.notAcceptable);
  }

  get dragBox(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.dragBox);
  }

  get outerDroppable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.notGreedyDropBox);
  }

  get innerDroppable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.notGreedyInnerDropBox);
  }

  get revertable(): Locator {
    return this.page.locator(DROPPABLE_SELECTORS.revertable);
  }

  // Navigation methods
  async navigateToDroppable(): Promise<void> {
    await this.navigateTo('/droppable');
  }

  async navigateToAcceptTab(): Promise<void> {
    await this.page.click(`text=${TAB_NAMES.accept}`);
  }

  async navigateToPreventPropagationTab(): Promise<void> {
    await this.page.click(`text=${TAB_NAMES.preventPropagation}`);
  }

  async navigateToRevertDraggableTab(): Promise<void> {
    await this.page.click(`text=${TAB_NAMES.revertDraggable}`);
  }

  async reloadAndNavigateToAcceptTab(): Promise<void> {
    await this.page.reload();
    await this.page.click('text=Interactions');
    await this.page.click('text=Droppable');
    await this.navigateToAcceptTab();
  }

  // Verification methods
  async verifyDroppableInitialState(): Promise<void> {
    await this.dragAndDrop.verifyInitialState(this.droppable);
  }

  async verifyDraggableVisible(): Promise<void> {
    await this.dragAndDrop.verifyDraggableVisible(this.draggable);
  }

  async verifyDropSuccess(): Promise<void> {
    await this.dragAndDrop.verifyDropSuccess(this.droppable);
  }

  async verifyCursorStyle(expectedCursor: string): Promise<void> {
    await this.dragAndDrop.verifyCursorStyle(this.draggable, expectedCursor);
  }

  async verifyBackgroundColorRemainsUnchanged(): Promise<void> {
    await expect(this.droppable).toHaveCSS('background-color', 'rgba(0, 0, 0, 0)');
  }

  // Action methods
  async performDragAndDrop(): Promise<void> {
    await this.dragAndDrop.dragTo(this.draggable, this.droppable);
  }

  async performMouseDragAndDrop(): Promise<void> {
    await this.dragAndDrop.dragWithMouse(this.draggable, this.droppable);
  }

  async performAcceptableDragAndDrop(): Promise<void> {
    const droppable = this.droppableNth(1);
    await this.dragAndDrop.dragTo(this.acceptable, droppable);
  }

  async performNotAcceptableDragAndDrop(): Promise<void> {
    const droppable = this.droppableNth(1);
    await this.dragAndDrop.dragTo(this.notAcceptable, droppable);
  }

  async performPreventPropagationDragAndDrop(): Promise<void> {
    await this.dragAndDrop.dragTo(this.dragBox, this.innerDroppable);
  }

  async performRevertDraggableDragAndDrop(): Promise<void> {
    const droppable = this.droppableNth(2);
    await this.dragAndDrop.dragTo(this.revertable, droppable);
  }

  // Specific test methods
  async testBasicDragAndDrop(): Promise<void> {
    await this.verifyDroppableInitialState();
    await this.verifyDraggableVisible();
    await this.performDragAndDrop();
    await this.verifyDropSuccess();
  }

  async testMouseInteractions(): Promise<void> {
    await this.verifyDroppableInitialState();
    await this.verifyCursorStyle('move');
    await this.performMouseDragAndDrop();
    await this.verifyDropSuccess();
  }

  async testAcceptableElement(): Promise<void> {
    const droppable = this.droppableNth(1);
    await this.dragAndDrop.verifyInitialState(droppable);
    await this.dragAndDrop.verifyDraggableVisible(this.acceptable);
    await this.performAcceptableDragAndDrop();
    await this.dragAndDrop.verifyDropSuccess(droppable);
  }

  async testNotAcceptableElement(): Promise<void> {
    const droppable = this.droppableNth(1);
    await this.dragAndDrop.verifyInitialState(droppable);
    await this.performNotAcceptableDragAndDrop();
    await this.dragAndDrop.verifyInitialState(droppable);
  }

  async testPreventPropagation(): Promise<void> {
    await expect(this.outerDroppable).toContainText(EXPECTED_TEXTS.outerDroppable);
    await expect(this.innerDroppable).toContainText(EXPECTED_TEXTS.innerDroppable);
    await this.performPreventPropagationDragAndDrop();
    await this.dragAndDrop.verifyDropSuccess(this.innerDroppable);
    await this.dragAndDrop.verifyDropSuccess(this.outerDroppable);
  }

  async testRevertDraggable(): Promise<{ initial: any; final: any }> {
    const droppable = this.droppableNth(2);
    await this.dragAndDrop.verifyInitialState(droppable);
    await this.dragAndDrop.verifyDraggableVisible(this.revertable);

    const initialPosition = await this.revertable.boundingBox();
    await this.performRevertDraggableDragAndDrop();
    await this.page.waitForTimeout(2000);
    const finalPosition = await this.revertable.boundingBox();

    return { initial: initialPosition, final: finalPosition };
  }

  async testPerformance(maxDuration: number): Promise<void> {
    await this.dragAndDrop.verifyPerformance(async () => {
      await this.performDragAndDrop();
    }, maxDuration);
    await this.verifyDropSuccess();
  }

  async testWithViewportSize(size: { width: number; height: number }): Promise<void> {
    await this.setViewportSize(size);
    await this.performDragAndDrop();
    await this.verifyDropSuccess();
  }
} 