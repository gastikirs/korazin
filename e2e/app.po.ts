import { browser, element, by } from 'protractor';

export class KorazinPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('kz-root h1')).getText();
  }
}
