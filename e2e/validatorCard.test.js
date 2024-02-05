import puppeteer from 'puppeteer';
import { fork } from 'child_process';

describe('Validator Card', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    server = fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', reject);
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });

    browser = await puppeteer.launch({
      headless: true,
      // slowMo: 50,
      // devtools: true,
    });

    page = await browser.newPage();
  }, 40000);

  test('Ввод валидного номера карты', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.validation-message');
    await page.type('.input', '2200700148940686');
    await page.click('.button');

    const validationMessage = await page.$eval('.validation-message', (el) => el.textContent);
    expect(validationMessage).toBe('Карта действительна. Тип: MIR');
  });

  test('Ввод невалидного номера карты', async () => {
    await page.goto(baseUrl);
    await page.waitForSelector('.validation-message');
    await page.type('.input', '1234567890123456');
    await page.click('.button');

    const validationMessage = await page.$eval('.validation-message', (el) => el.textContent);
    expect(validationMessage).toBe('Недействительный номер карты. Пожалуйста, проверьте ещё раз.');
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });
});
