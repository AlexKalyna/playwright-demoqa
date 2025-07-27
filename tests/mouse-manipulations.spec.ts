import { test, expect } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';
import { VIEWPORT_SIZES } from '../data/droppableTestData';

test.describe('Mouse Manipulations', () => {
  let droppablePage: DroppablePage;
  let mouseManipulation: any;

  test.beforeEach(async ({ page }) => {
    droppablePage = new DroppablePage(page);
    mouseManipulation = droppablePage.getMouseManipulation();
    await droppablePage.navigateToDroppable();
  });

  test('should test hover effects on draggable elements', { tag: '@mouse-manipulations' }, async () => {
    await mouseManipulation.hoverOnElement(droppablePage.draggable);
    await droppablePage.verifyCursorStyle('move');
  });

  test('should test double-click on elements', { tag: '@mouse-manipulations' }, async () => {
    await mouseManipulation.doubleClickOnElement(droppablePage.draggable);
    await droppablePage.verifyDraggableVisible();
  });

  test('should test mouse down and up without drag', { tag: '@mouse-manipulations' }, async () => {
    const initialBox = await droppablePage.draggable.boundingBox();
    
    await mouseManipulation.mouseDownAndUpOnElement(droppablePage.draggable);
    
    const finalBox = await droppablePage.draggable.boundingBox();
    
    expect(finalBox?.x).toBe(initialBox?.x);
    expect(finalBox?.y).toBe(initialBox?.y);
  });

  test('should test mouse interactions with keyboard modifiers', { tag: '@mouse-manipulations' }, async () => {
    await mouseManipulation.clickWithKeyboardModifier(droppablePage.draggable, 'Shift');
    await droppablePage.verifyDraggableVisible();
  });

  test('should test mouse interactions with performance measurement', { tag: '@mouse-manipulations' }, async () => {
    const duration = await mouseManipulation.measureMouseInteractionPerformance(async () => {
      await mouseManipulation.mouseDownAndUpOnElement(droppablePage.draggable);
    });
    
    expect(duration).toBeLessThan(1000);
  });

  test('should test mouse interactions with multiple clicks', { tag: '@mouse-manipulations' }, async () => {
    await mouseManipulation.performMultipleClicks(droppablePage.draggable, 3);
    await droppablePage.verifyDraggableVisible();
  });

  test('should test mouse interactions with prevent propagation', { tag: '@mouse-manipulations' }, async () => {
    await droppablePage.navigateToPreventPropagationTab();
    
    await mouseManipulation.hoverOnElement(droppablePage.dragBox);
    await expect(droppablePage.dragBox).toHaveCSS('cursor', 'move');
    
    await mouseManipulation.hoverOnElement(droppablePage.outerDroppable);
    await mouseManipulation.hoverOnElement(droppablePage.innerDroppable);
    
    await expect(droppablePage.outerDroppable).toBeVisible();
    await expect(droppablePage.innerDroppable).toBeVisible();
  });
}); 