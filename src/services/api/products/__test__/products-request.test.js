import ProductsRequest from '../products-request';
import CategoriesRequest from 'services/api/categories/categories-request';

import Form from 'utils/form/form';

const faker = require('faker');

test('it creates a product', async () => {
  expect.assertions(1);

  const form = new Form({
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
    price: faker.random.number(),
    price_sale: faker.random.number(),
    in_sale: faker.random.boolean(),
    active: faker.random.boolean(),
    category_id: await getRandomCategoryId(),
    weight: faker.random.number(),
    units: faker.random.number(),
  });

  return ProductsRequest.createProduct(form.getFormData())
    .then((product) => {
      expect(product).toMatchObject(form.data());
    });
});

/**
 * get a random category from the api
 * @return {number}
 */
async function getRandomCategoryId() {
  const {categories} = await CategoriesRequest.fetchAllCategories();
  return categories[getRandomInt(categories.length)].id;
}

/**
 * get a random number between 0 and max (not incluided)
 * @param {number} max
 * @return {number}
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key];
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    },
    removeItem: function(key) {
      delete store[key];
    },
  };
})();
Object.defineProperty(window, 'localStorage', {value: localStorageMock});
