context('Crawl', () => {
  const baseUrl = 'https://www.baza-firm.com.pl/Stomatolodzy-protetycy-ortodonci/strona-';
  const data = [];
  Array.from({ length: 184 }, (value, index) => index + 1).forEach(num =>
    it(`crawls page num ${num}`, () => {
      const page = {
        index: num,
        elements: []
      };
      cy.visit(baseUrl + num);
      cy.get('ul.wizResBox>li').each(($rows, index) => {
        const element = {
          address: {}
        };
        element.name = $rows.find('.przeppoz').text();
        element.address.street = $rows.find('div[itemprop="streetAddress"]').text();
        element.address.postalCode = $rows.find('span[itemprop="postalCode"]').text();
        element.address.city = $rows.find('span[itemprop="addressLocality"]').text();
        element.address.county = $rows.find('span[itemprop="addressRegion"]').text();
        element.phone = $rows.find('div[itemprop="telephone"]').text();
        page.elements.push(element)
      });
      data.push(page);
      cy.wait(3000)
    }));

  after(() => {
    cy.writeFile('lol.json', data);
  })
});
