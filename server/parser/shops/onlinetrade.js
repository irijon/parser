import cherio from 'cherio';

export default function dnsParser(pageContent) {
  const doc = cherio.load(pageContent, { decodeEntities: false });
  const productCard = doc('.indexGoods__item').first();
  const link = 'https://www.onlinetrade.ru'+productCard.find('a.indexGoods__item__image').attr('href');
  const price = productCard.find('.price').text().trim().replace(/\s/g, "").replace(/₽/g, "")
  const name = productCard.find('a.indexGoods__item__name').attr('title').split('«')[1].split('»')[0];
  const product = {
    link,
    price,
    name,
  };
  return product;
}
