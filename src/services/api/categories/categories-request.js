import httpRequester from 'services/api/http-requester';
import categoriesUrls from '../urls/categories-urls';

/* utils */
import logger from 'utils/logger/logger';

/**
 * class to make http request related to the categories admin
 */
export default class CategoriesRequest {
  /**
   * get the total categories count
   * @return {Promise}
   */
  static count() {
    const url = categoriesUrls.count();

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
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
   * Get the category info
   *
   * @param {string} id the category id
   * @return {Promise} the category info
   */
  static fetchCategory(id) {
    let url = categoriesUrls.fetchCategory(id);

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
        .then((response) => {
          const category = response.data.data;
          resolve(category);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * fetch all the categories
   *
   * @param {string} page
   * @return {Promise}
   */
  static fetchAllCategories() {
    let url = categoriesUrls.fetchAllCategories();

    return new Promise((resolve, reject) => {
      httpRequester.get(url)
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
   * create a new category
   *
   * @param {Object} data
   * @return {Promise} Promise
   */
  static createCategory(data) {
    const methodName = ' addProduct() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.create();

    return new Promise((resolve, reject) => {
      httpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated product data */
          const productData = response.data;
          resolve(productData);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * update the category with the given id
   *
   * @param {Object} id
   * @param {Object} data
   * @return {Promise}
   */
  static updateCategory(id, data) {
    const methodName = ' updateProduct() ';
    logger.log(this.className() + methodName);

    let url = categoriesUrls.update() + id;

    return new Promise((resolve, reject) => {
      httpRequester.post(url, data)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);

          /* get the updated product data */
          const productData = response.data;
          resolve(productData);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }

  /**
   * delete the category with the given id
   *
   * @param {Object} id
   * @return {Promise}
   */
  static deleteCategory(id) {
    const methodName = ' deleteProduct() ';
    let url = categoriesUrls.delete() + id;
    logger.log(this.className() + methodName);

    return new Promise((resolve, reject) => {
      httpRequester.delete(url)
        .then((response) => {
          const methodName = ' then(..) ';
          logger.log(this.className() + methodName + 'data = ' + response);
          resolve(response);
        })
        .catch((error) => {
          const methodName = ' catch(..) ';
          logger.log(this.className() + methodName + 'data = ' + error);
          reject(error);
        });
    });
  }
}
