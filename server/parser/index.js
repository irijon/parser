import onlinetradeParser from './shops/onlinetrade.js';
import OZONParser from './shops/ozon.js';
import CITYParser from './shops/citylink.js';
import { PuppeteerHandler } from './helpers/puppeter.js';

const p = new PuppeteerHandler();

const CITY = 'https://www.citilink.ru/search/?text=';
const OZON = 'https://www.ozon.ru/search/?text=';
const ONLINE = 'https://www.onlinetrade.ru/sitesearch.html?query=';

async function makeTask(url, parser) {
  const pageContent = await p.getPageContent(url);
  const product = await parser(pageContent);
  return product
}

export default async function main(query) {
    const citylink = await makeTask(`${CITY}${query}`, CITYParser)
    const onlinetrade = await makeTask(`${ONLINE}${query}`, onlinetradeParser)
    const ozon = await makeTask(`${OZON}${query}`, OZONParser)
    // p.closeBrowser()
    return {
      citylink,
      onlinetrade,
      ozon
    }
}
