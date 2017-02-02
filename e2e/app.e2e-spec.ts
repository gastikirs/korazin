import { KorazinPage } from './app.po';

describe('korazin App', function() {
  let page: KorazinPage;

  beforeEach(() => {
    page = new KorazinPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('kz works!');
  });
});
