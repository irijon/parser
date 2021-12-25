import cherio from 'cherio';

export default function citylinkParser(pageContent) {
  const doc = cherio.load(pageContent, { decodeEntities: false });
  const productCard = doc('.ProductCardVertical').first();
  const data = JSON.parse(doc('.ProductCardVertical').first().attr('data-params'));
  const link = `https://www.citilink.ru${productCard.find('.ProductCardVertical__link').attr('href')}`;
  const product = {
    link,
    name: data.shortName,
    price: data.price,
  };
  return product;
}
