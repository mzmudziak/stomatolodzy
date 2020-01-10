context('Crawl', () => {
  const baseUrl = 'https://www.baza-firm.com.pl/Stomatolodzy-protetycy-ortodonci/strona-';
  const data = [];
  Array.from({ length: 184 }, (value, index) => index + 1).forEach(num =>
    it(`crawls page num ${num}`, () => {
      cy.visit(baseUrl + num);
      cy.get('ul.wizResBox>li').each(($rows, index) => {
        data.push({
          name: $rows.find('.przeppoz').text(),
          phone: $rows.find('div[itemprop="telephone"]').text(),
          address: {
            street: $rows.find('div[itemprop="streetAddress"]').text(),
            postalCode: $rows.find('span[itemprop="postalCode"]').text(),
            city: $rows.find('span[itemprop="addressLocality"]').text(),
            region: $rows.find('span[itemprop="addressRegion"]').text()
          }
        })
      });
      cy.wait(500)
    }));

  after(() => {
    cy.writeFile('result.json', data);
  })
});
