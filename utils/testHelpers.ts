import { Page } from '@playwright/test';

/**
 * Generate random string of specified length
 */
export function generateRandomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  const username = generateRandomString(8);
  const domain = generateRandomString(6);
  return `${username}@${domain}.com`;
}

/**
 * Generate random phone number
 */
export function generateRandomPhoneNumber(): string {
  return Math.floor(Math.random() * 9000000000) + 1000000000 + '';
}

/**
 * Generate random date between two dates
 */
export function generateRandomDate(start: Date, end: Date): string {
  const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
}

/**
 * Wait for network idle with custom timeout
 */
export async function waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
  await page.waitForLoadState('networkidle', { timeout });
}

/**
 * Take screenshot with timestamp
 */
export async function takeScreenshotWithTimestamp(page: Page, name: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  await page.screenshot({ path: `screenshots/${name}-${timestamp}.png` });
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format (10 digits)
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone);
}

/**
 * Format date for form input
 */
export function formatDateForInput(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Retry function with exponential backoff
 */
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (i === maxRetries - 1) {
        throw lastError;
      }
      const delay = baseDelay * Math.pow(2, i);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  throw lastError!;
}

/**
 * Check if element is in viewport
 */
export async function isElementInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (!element) return false;
    
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }, selector);
}

/**
 * Scroll element into view if needed
 */
export async function scrollElementIntoView(page: Page, selector: string): Promise<void> {
  await page.evaluate((sel) => {
    const element = document.querySelector(sel);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, selector);
}

/**
 * Wait for element to be stable (not moving)
 */
export async function waitForElementStable(page: Page, selector: string, timeout: number = 5000): Promise<void> {
  await page.waitForFunction(
    (sel) => {
      const element = document.querySelector(sel);
      if (!element) return false;
      
      const rect = element.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    },
    selector,
    { timeout }
  );
}

/**
 * Generate test data for forms
 */
export function generateTestFormData() {
  return {
    firstName: generateRandomString(8),
    lastName: generateRandomString(8),
    email: generateRandomEmail(),
    gender: ['Male', 'Female', 'Other'][Math.floor(Math.random() * 3)] as 'Male' | 'Female' | 'Other',
    mobileNumber: generateRandomPhoneNumber(),
    dateOfBirth: generateRandomDate(new Date(1980, 0, 1), new Date(2000, 11, 31)),
    subjects: ['Maths', 'Physics', 'Chemistry', 'Biology'].slice(0, Math.floor(Math.random() * 3) + 1),
    hobbies: ['Sports', 'Reading', 'Music'].slice(0, Math.floor(Math.random() * 2) + 1),
    currentAddress: `${generateRandomString(10)} Street, ${generateRandomString(8)} City`,
    state: ['NCR', 'Uttar Pradesh', 'Haryana'][Math.floor(Math.random() * 3)],
    city: ['Delhi', 'Agra', 'Karnal'][Math.floor(Math.random() * 3)]
  };
} 