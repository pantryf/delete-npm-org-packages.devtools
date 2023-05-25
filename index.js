const puppeteer = require('puppeteer');
const {sleep}   = require('extra-sleep');


async function main(argv) {
  const E = process.env;
  // Configuration details
  // ---------------------
  var executablePath = `C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe`;
  var userDataDir    = `C:\\Users\\${E.USERNAME}\\AppData\\Local\\Google\\Chrome\\User Data`;
  var rootUrl = 'https://www.npmjs.com';
  var org     = argv[2] || 'org';
  // Launch browser (NPM should be logged in)
  // ----------------------------------------
  var browser = await puppeteer.launch({executablePath, userDataDir, defaultViewport: null, headless: false});
  let page    = await browser.newPage();
  // Get username
  // ------------
  await page.goto(rootUrl);
  await sleep(5000);
  await page.click('header nav button[aria-label="Profile menu"]');
  await sleep(5000);
  var e = await page.$('header nav span ul li a');
  var username = await e.evaluate(e => e.href.replace(/^[^~]+~/, ''));
  // Get list of packages in organization (org)
  // ------------------------------------------
  await page.goto(`${rootUrl}/settings/${username}/packages`);
  await sleep(5000);
  await page.goto(`${rootUrl}/settings/${org}/packages`);
  await sleep(5000);
  var e  = await page.$(`#tabpanel-packages h2`);
  var numPackages = parseFloat(await e.evaluate(e => e.textContent.replace(/\D/g, '')));
  var numPages = Math.ceil(numPackages/10), packageNames = [];
  for (var i=0; i<numPages; ++i) {
    let page = await browser.newPage();
    page.goto(`${rootUrl}/settings/${org}/packages?page=${i}&perPage=10`);
    await sleep(5000);
    var es = await page.$$(`#tabpanel-packages ul li a h3`);
    packageNames.push(...await Promise.all(es.map(e => e.evaluate(e => e.textContent))));
    page.close();
    await sleep(5000);
  }
  // Delete packages
  // ---------------
  for (var packageName of packageNames) {
    let page = await browser.newPage();
    page.goto(`${rootUrl}/package/${encodeURIComponent(packageName)}/delete`);
    await sleep(5000);
    var e = await page.$('#delete-package h2');
    var formTitle = e? await e.evaluate(e => e.textContent) : '';
    if (formTitle === 'Are you sure you want to delete this package?') {
      page.type('#delete-package input[name="package"]', packageName);
      await sleep(5000);
      page.click('#delete-package button[type="submit"]');
      await sleep(5000);
    }
    page.close();
    await sleep(5000);
  }
  await sleep(5000);
  await browser.close();
}
main(process.argv);
