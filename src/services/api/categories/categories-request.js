import HttpRequester from 'services/api/http-requester';
import CategoriesUrls from '../urls/categories-urls';

/* utils */
import Logger from 'utils/logger/logger';

/**
 * class to make http request related to the products admin
 */
export default class CategoriesRequest {
  /**
   * get the total products count
   * @return {Promise}
   */
  static count() {
    const url = CategoriesUrls.count();

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
   * @param {string} page
   * @return {*}
   */
  static fetchAllCategories() {
    let url = CategoriesUrls.fetchAllCategories();

    return new Promise((resolve, reject) => {
      HttpRequester.get(url)
        .then((response) => {
          const categories = response.data.data;
          resolve(categories);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * add a new product
   *
   * @param {Object} data
   * @return {*} Promise
   */
  static addCategory(data) {
    const methodName = ' addProduct() ';
    Logger.log(this.className() + methodName);

    let url = CategoriesUrls.create();

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated product data */
          const productData = response.data;
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
  static updateCategory(id, data) {
    const methodName = ' updateProduct() ';
    Logger.log(this.className() + methodName);

    let url = CategoriesUrls.update() + id;

    return new Promise((resolve, reject) => {
      HttpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated product data */
          const productData = response.data;
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
  static deleteCategory(id) {
    const methodName = ' deleteProduct() ';
    let url = CategoriesUrls.delete() + id;
    Logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      HttpRequester.delete(url)
        .then((response) => {
          const methodName = ' then(..) ';
          Logger.log(this.className() + methodName + 'data = ' + response);
          resolve(response);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          Logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }
}
