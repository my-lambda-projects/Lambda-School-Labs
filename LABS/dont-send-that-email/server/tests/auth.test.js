const { Builder, By, Key, until } = require('selenium-webdriver');
require('selenium-webdriver/chrome');
require('selenium-webdriver/firefox');
require('chromedriver');
require('geckodriver');


it('Authenticates a user', async () => {
  jest.setTimeout(30000);
  let driver = await new Builder().forBrowser('firefox').build();
  await driver.manage().setTimeouts({ implicit: 10000 });
  try {
    await driver.get('http://localhost:5000/auth/login');
    driver.wait(until.elementIsEnabled(driver.findElement(By.name('email'))))
      .then(() => {
        driver.findElement(By.name('email')).sendKeys('test@user.com');
      });
    driver.wait(until.elementIsEnabled(driver.findElement(By.name('password'))))
      .then(() => {
        driver.findElement(By.name('password')).sendKeys('test@user1', Key.ENTER);
      })
    await driver.wait(until.urlContains('profile'), 15000);
  } finally {
    await driver.quit();
  }
});
