import { test, expect } from '@playwright/test';

test('renders the full commercial narrative', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Duas marcas.');
  await expect(page.getByRole('heading', { name: /Um ecossistema/ })).toBeVisible();
  await expect(page.getByText('Implantação digital')).toBeVisible();
});
test('brand switch changes content', async ({ page }) => {
  await page.goto('/#marcas');
  await page.getByRole('button', { name: /02 \/ CRUMAÍ/ }).click();
  await expect(page.getByRole('heading', { name: /Toda grande marca/ })).toBeVisible();
  await page.getByRole('button', { name: /01 \/ MUBI/ }).click();
  await expect(page.getByRole('heading', { name: /Uma história pronta/ })).toBeVisible();
});
test('timeline changes phases', async ({ page }) => {
  await page.goto('/#jornada');
  await page.getByRole('tab', { name: /DIAS 31—60/ }).click();
  await expect(page.getByText('Colocar em movimento.')).toBeVisible();
  await expect(page.getByRole('tab', { name: /DIAS 31—60/ })).toHaveAttribute('aria-selected', 'true');
});
test('top/down navigation and skip link exist', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: 'Ir para o conteúdo principal' })).toBeAttached();
  await page.getByRole('button', { name: 'Ir para a próxima seção' }).click();
  await expect.poll(async () => page.evaluate(() => scrollY)).toBeGreaterThan(50);
});
test('layout has no horizontal overflow on mobile', async ({ page, isMobile }) => {
  if (!isMobile) return;
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  expect(overflow).toBe(false);
});
test('vlibras official script is configured', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('script[src*="vlibras-plugin.js"]')).toHaveCount(1, { timeout: 20000 });
});
