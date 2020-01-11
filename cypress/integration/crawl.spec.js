context('Crawl', () => {
  const baseUrl = 'https://www.baza-firm.com.pl/Stomatolodzy-protetycy-ortodonci/strona-';
  const data = [];
  Array.from({ length: 184 }, (value, index) => index + 1).forEach(num =>
    it(`crawls page num ${num}`, () => {
      cy.visit(baseUrl + num);
      cy.get('ul.wizResBox>li').each(($row, index) => {
        data.push({
          name: $row.find('.przeppoz').text(),
          phone: $row.find('div[itemprop="telephone"]').text(),
          address: {
            street: $row.find('div[itemprop="streetAddress"]').text(),
            postalCode: $row.find('span[itemprop="postalCode"]').text(),
            city: $row.find('span[itemprop="addressLocality"]').text(),
            region: $row.find('span[itemprop="addressRegion"]').text()
          }
        })
      });
      cy.wait(500);
    }));
s
  after(() => {
    cy.writeFile('result.json', data);
  })
});
