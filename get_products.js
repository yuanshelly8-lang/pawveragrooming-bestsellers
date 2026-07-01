(async () => {
  const products = Array.from(document.querySelectorAll('.ui-search-result__wrapper')).slice(0, 5).map(el => {
    const link = el.querySelector('a.ui-search-link')?.href;
    const title = el.querySelector('.ui-search-item__title')?.innerText;
    return { title, link };
  });
  return products;
})()