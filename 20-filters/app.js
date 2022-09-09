let filteredProducts = [...products];

const productsContainer = document.querySelector('.products-container');

const displayProducts = () => {
  // if statement
  if (filteredProducts.length < 1) {
    productsContainer.inner = `
      <h6>Sorry, no products matched your search</h6>
    `;
    return;
  }
  productsContainer.innerHTML = filteredProducts
    .map((products) => {
      const { id, title, image, price } = products;
      return `
      <article class="product">
        <img
          src=${image}
          class="product-img img"
        />
        <footer>
          <h5 class="product-name">${title}</h5>
          <span class="product-price">$${price}</span>
        </footer>
      </article>
      `;
    })
    .join('');
};

displayProducts();

// filter
const form = document.querySelector('.input-form');
const searchInput = document.querySelector('.search-input');

form.addEventListener('keyup', () => {
  const inputValue = searchInput.value;
  filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(inputValue);
  });
  displayProducts();
});

// filter buttons
// Set은 중복이 허용되지 않는 객체

const companiesDOM = document.querySelector('.companies');

const displayButtons = () => {
  const buttons = [
    'all',
    ...new Set(products.map((product) => product.company)),
  ];
  companiesDOM.innerHTML = buttons
    .map((company) => {
      return `
    <button class="company-btn" data-id="${company}">${company}</button>
    `;
    })
    .join('');
};

displayButtons();

// click and filter by company
companiesDOM.addEventListener('click', (e) => {
  const el = e.target;
  if (el.classList.contains('company-btn')) {
    if (el.dataset.id === 'all') {
      filteredProducts = [...products];
    } else {
      filteredProducts = products.filter((product) => {
        return product.company === el.dataset.id;
      });
    }
    searchInput.value = '';
    displayProducts();
  }
});
