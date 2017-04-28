import { QualiumTestPage } from './app.po';

describe('qualium-test App', () => {
  let page: QualiumTestPage;

  beforeEach(() => {
    page = new QualiumTestPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
