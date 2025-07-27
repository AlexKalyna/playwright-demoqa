import { test, expect } from '@playwright/test';
import { DroppablePage } from '../pages/DroppablePage';
import { VIEWPORT_SIZES, PERFORMANCE_THRESHOLDS } from '../data/droppableTestData';

test.describe('Drag and Drop Functionality', () => {
  let droppablePage: DroppablePage;

  test.beforeEach(async ({ page }) => {
    droppablePage = new DroppablePage(page);
    await droppablePage.navigateToDroppable();
  });

  test('should perform simple drag and drop operation', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.testBasicDragAndDrop();
  });

  test('should test Accept tab functionality', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.navigateToAcceptTab();
    await droppablePage.testAcceptableElement();

    await droppablePage.reloadAndNavigateToAcceptTab();
    await droppablePage.testNotAcceptableElement();
  });

  test('should test Prevent Propogation tab', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.navigateToPreventPropagationTab();
    await droppablePage.testPreventPropagation();
  });

  test('should handle drag and drop with visual feedback', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.verifyBackgroundColorRemainsUnchanged();
    await droppablePage.testMouseInteractions();
  });

  test('should test drag and drop with different viewport sizes', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.testWithViewportSize(VIEWPORT_SIZES.mobile);
    
    await droppablePage.setViewportSize(VIEWPORT_SIZES.tablet);
    await droppablePage.reloadAndNavigateToAcceptTab();
    await droppablePage.navigateToDroppable();
    await droppablePage.testWithViewportSize(VIEWPORT_SIZES.tablet);
  });

  test('should handle drag and drop with performance assertions', { tag: '@drag-and-drop' }, async () => {
    await droppablePage.testPerformance(PERFORMANCE_THRESHOLDS.dragAndDrop);
  });
}); 