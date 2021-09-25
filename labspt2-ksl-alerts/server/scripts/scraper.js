require('dotenv').config();
const axios     = require('axios');
const cheerio   = require('cheerio');
const Nightmare = require('nightmare');

const options = {
  show: false,
  gotoTimeout: 300000,
  waitTimeout: 300000,
  loadTimeout: 60000,
  switches: {
    'proxy-server': 'http://localhost:8888',
    'ignore-certificate-errors': true,
  }
};

const stopScrapoxyInstance = () => {
  // Stop the scrapoxy instance. Instance is auto replaced with a new IP address. No more blacklisting! =]

  console.log('Replacing Scrapoxy instance and assigning new IP address...');

  // Get the proxy server IP address from ipchicken.com
  Nightmare(options)
      .goto('http://www.ipchicken.com')
      .evaluate(() => {
        return document.querySelector('b').innerText.replace(/[^\d\.]/g, '');
      })
      .end()
      .then(ip => {

        const auth = Buffer.from(process.env.COMMANDER_PASSWORD).toString('base64');

        axios({
          method: 'get',
          url: 'http://localhost:8889/api/instances',
          headers: {
            'Authorization': auth
          }
        }).then(res => {

          // Find current scrapoxy instance
          for (let i in res.data) {

            if (ip === res.data[i].address.hostname) {

              // Stop the current scrapoxy instance.
              axios({
                method: 'post',
                url: 'http://localhost:8889/api/instances/stop',
                headers: {
                  'Authorization': auth
                },
                data: {
                  name: res.data[i].name
                }
              }).then(res => {
                console.log('Instance stopped.\nInstances alive: ' + res.data.alive)
              }).catch(console.log);
            }
          }
        }).catch(console.log);
      }).catch(console.log);
}


const itemScraper = (url) => {

  Nightmare(options)
    .goto(url)
    .wait('#listingContainer')
    // .wait('.photoDesktop-photoContainer   > .smartImage')
    .click('.photoDesktop-photoContainer  > .smartImage')
    .evaluate(() => {
      return document.querySelector('body').innerHTML;
    })
    // .end()
    .then((html) => {

      const $ = cheerio.load(html);

      const pageStatsArr = $('.listingStats-value').map((i, el) => $(el).text()).get();
      const imageSrcArr  = $('.photoViewer-carouselItemPhoto > .smartImage').map((i, el) => $(el).attr('src')).get();

      const data = {
        contactInfo: {
          firstName: $('.listingContactSeller-firstName-value').text(),
          homePhone: $('.listingContactSeller-homePhone > .listingContactSeller-optionText').text(),
          cellPhone: $('.listingContactSeller-cellPhone > .listingContactSeller-optionText').text(),
        },
        pageStats: {
          listingNumber:  pageStatsArr.length > 0 ? pageStatsArr[0] : null,
          expirationDate: pageStatsArr.length > 1 ? pageStatsArr[1] : null,
          pageViews:      pageStatsArr.length > 2 ? pageStatsArr[2] : null,
          favorited:      pageStatsArr.length > 3 ? pageStatsArr[3] : null,
          sellerType:     pageStatsArr.length > 4 ? pageStatsArr[4] : null,
          memberSince:    pageStatsArr.length > 5 ? pageStatsArr[5] : null,
        },
        listingDetails: {
          title:       $('.listingDetails-title').text(),
          location:    $('.listingDetails-location').text(),
          price:       $('.listingDetails-price').text(),
          description: $('.lsitingDescription-text').text(),
        },
        images: imageSrcArr.map((img, i) => {

          const small = img;
          const large = img.substring(0, img.length - 13) + '664x500';

          return {
            small,
            large,
          };
        }),
      };

      return data;

    })
    .then(data => {

      console.log(data);
    })
    .catch(err => {
      // stopScrapoxyInstance();
      // itemScraper(url);
      console.log(err);
    });
}

const kslScraper = (url) => {

  const selector = 'body';

    const nightmare = Nightmare(options);

    nightmare
      .goto(url)
      .wait('.listing-group')
      .evaluate((selector) => {
        return document.querySelector(selector).innerHTML;
      }, selector)
      .then((html) => {

        const $ = cheerio.load(html);

        const items = Array.from($('.listing-group').find('.listing-item-link'));

        const results = $('.total-listings').text().split('');
        results.splice(results.indexOf(','), 1);
        results.splice(results.indexOf(' ', 1));
        resultsNum = parseInt(results.join(''));

        let pages = Math.ceil(resultsNum / 24) + 1;
        if (pages > 415) pages = 415;
        console.log('Total pages: ' + pages);




        items.map((item, i) => {

          const url = `https://classifieds.ksl.com${ item.attribs.href }`;
          setTimeout(() => {
            itemScraper(url, i);
          }, 1000);

        });

          // if (pages > 1) {
          //   for(let i = 1; i <= pages; i++) {
          //     Nightmare()
          //       .click('.next')
          //       .wait('.listing-group')
          //       .evaluate((selector) => {
          //         return document.querySelector(selector).innerHTML;
          //       }, selector)
          //       .then((html) => {

          //         const $ = cheerio.load(html);

          //         const items = Array.from($('.listing-group').find('.listing-item-link'));
                  
          //         items.map((item, i) => {

          //           const url = `https://classifieds.ksl.com${ item.attribs.href }`;

          //           setTimeout(() => {
          //             itemScraper(url, i);
          //           }, 1000);
                    

          //         });

          //         console.log('Page: ' + i);

          //       }).catch(console.log);
          //   }
          // }
      })
      .catch(err => {
        // stopScrapoxyInstance();
        // setTimeout(() => {
        //   kslScraper(url);
        // }, 10000);
        console.log(err);
      });
}

module.exports = kslScraper;
