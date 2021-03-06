import HttpRequester from 'services/api/http-requester';
import ProductsUrls from '../urls/products-urls';

/* utils */
import Logger from 'utils/logger/logger';

/**
 * class to make http request related to the products admin
 */
export default class ProductsRequest {
  /**
   * @return {string}
   */
  static className() {
    return 'ProductsRequest';
  }

  /**
   * get the total products count
   * @return {Promise}
   */
  static count() {
    const url = ProductsUrls.count();

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const count = response.data.data;
          resolve(count);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the products with the given page
   *
   * @param {object} queryParams query parameters
   * @param {string} optionalUrl (optional) use this optional url instead
   *  of the default url
   * @return {*}
   */
  static getProducts(queryParams={}, optionalUrl) {
    let url = ProductsUrls.fetchProducts(queryParams, optionalUrl);

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const products = response.data.data;
          const paginator = response.data.paginator;
          resolve({paginator: paginator, products: products});
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * Get the product with the given id
   *
   * @param {number} id
   * @return {*}
   */
  static getProduct(id) {
    let url = ProductsUrls.fetchProduct(id);

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const product = response.data.data;
          resolve(product);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * create a new product
   *
   * @param {Object} data
   * @return {*} Promise
   */
  static createProduct(data) {
    const methodName = ' createProduct() ';
    Logger.log(this.className() + methodName);

    let url = ProductsUrls.create();

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);

          /* get the created product data */
          const productData = response.data.data.product;
          resolve(productData);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * update the product with the given id
   * @param {Object} id
   * @param {Object} data
   * @return {*}
   */
  static updateProduct(id, data) {
    const methodName = ' updateProduct() ';
    Logger.log(this.className() + methodName);

    let url = ProductsUrls.update(id);

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated product data */
          const productData = response.data.data.product;
          resolve(productData);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * delete a product
   *
   * @param {Object} id
   * @return {*}
   */
  static deleteProduct(id) {
    const methodName = ' deleteProduct() ';
    let url = ProductsUrls.delete(id);
    Logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      HttpRequester.delete(url)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);
          resolve(response.data.data);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }
}
