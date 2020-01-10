context('Crawl', () => {
  const baseUrl = 'https://www.baza-firm.com.pl/Stomatolodzy-protetycy-ortodonci/strona-';
  const data = [];
  Array.from({ length: 184 }, (value, index) => index + 1).forEach(num =>
    it(`crawls page num ${num}`, () => {
      cy.visit(baseUrl + num);
      cy.get('ul.wizResBox>li').each(($rows, index) => {
        const element = {
          address: {}
        };
        element.name = $rows.find('.przeppoz').text();
        element.address.street = $rows.find('div[itemprop="streetAddress"]').text();
        element.address.postalCode = $rows.find('span[itemprop="postalCode"]').text();
        element.address.city = $rows.find('span[itemprop="addressLocality"]').text();
        element.address.region = $rows.find('span[itemprop="addressRegion"]').text();
        element.phone = $rows.find('div[itemprop="telephone"]').text();
        data.push(element)
      });
      cy.wait(500)
    }));

  after(() => {
    cy.writeFile('result.json', data);
  })
});
