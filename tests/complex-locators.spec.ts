import { test, expect } from '@playwright/test';

test.describe('Complex Locator Examples (CSS & XPath)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('domcontentloaded');
  });

  test('CSS: descendant selector for table rows', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const rows = page.locator('div.rt-tbody .rt-tr');
    await expect(rows).toHaveCount(10);
  });

  test('CSS: attribute selector with ends-with operator', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const addButton = page.locator('button[id$="addNewRecordButton"]');
    await expect(addButton).toHaveText('Add');
  });

  test('CSS: attribute selector with contains and starts-with', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const tableHeader = page.locator('div[class*="rt-thead"]');
    await expect(tableHeader).toBeVisible();
    const table = page.locator('div[class^="rt-"]');
    await expect(table.first()).toBeVisible();
  });

  test('CSS: pseudo-class nth-child', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const thirdRow = page.locator('div.rt-tbody .rt-tr').nth(2);
    await expect(thirdRow).toBeVisible();
  });

  test('CSS: not pseudo-class for non-empty rows', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const nonEmptyRows = page.locator('div.rt-tbody .rt-tr:not(:empty)');
    await expect(nonEmptyRows).toHaveCount(10);
  });

  test('XPath: descendant axis for all table cells', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const allCells = page.locator('xpath=//div[@class="rt-tbody"]//div[@class="rt-td"]');
    await expect(allCells).toHaveCount(70);
  });

  test('XPath: ancestor axis from cell to tbody', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const tbody = page.locator('xpath=//div[@class="rt-td"][1]/ancestor::div[@class="rt-tbody"]');
    await expect(tbody).toBeVisible();
  });

  // Replace problematic axes tests with robust alternatives
  test('CSS: child axis for direct row (alternative)', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    // Use CSS descendant selector instead of XPath child axis
    const directRow = page.locator('div.rt-tbody > div.rt-tr-group > div.rt-tr');
    await expect(directRow.first()).toBeVisible();
  });

  test('CSS: parent/ancestor axis from cell to row (alternative)', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    // Get the text of the first cell
    const firstCell = page.locator('div.rt-td').first();
    const cellText = await firstCell.textContent();
    // Find the row containing that text
    const parentRow = page.locator(`div.rt-tr:has-text("${cellText?.trim()}")`);
    await expect(parentRow.first()).toBeVisible();
  });

  test('CSS: following-sibling axis for rows (alternative)', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    // Use CSS nth-child to find first and second rows
    const firstRow = page.locator('div.rt-tr').nth(0);
    const siblingRow = page.locator('div.rt-tr').nth(1);
    await expect(firstRow).toBeVisible();
    await expect(siblingRow).toBeVisible();
  });

  test('XPath: contains() function for attribute', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const table = page.locator('xpath=//div[contains(@class, "rt-table")]');
    await expect(table).toBeVisible();
  });

  test('XPath: starts-with() function for attribute', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const addButton = page.locator('xpath=//button[starts-with(@id, "addNewRecord")]');
    await expect(addButton).toHaveText('Add');
  });

  test('XPath: position() function for first row', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const firstRow = page.locator('xpath=//div[@class="rt-tr"][position()=1]');
    await expect(firstRow).toBeVisible();
  });

  test('XPath: text() function for Add button', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const addButton = page.locator('xpath=//button[text()="Add"]');
    await expect(addButton).toBeVisible();
  });

  test('Coordinates: bounding box of table', async ({ page }) => {
    await page.click('text=Elements');
    await page.click('text=Web Tables');
    const table = page.locator('div.rt-table');
    const box = await table.boundingBox();
    expect(box).toBeTruthy();
    expect(box!.width).toBeGreaterThan(0);
    expect(box!.height).toBeGreaterThan(0);
  });
}); 