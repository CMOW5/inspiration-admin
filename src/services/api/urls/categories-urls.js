import BaseUrls from './base-urls';

/**
 * this helper class provides methods to get the
 * urls related to the products admin
 */
export default class CategoriesUrls extends BaseUrls {
  /**
   * total products count url
   * @return {string}
   */
  static count() {
    return this.base() + '/admin/categories/count';
  }

  /**
   * url to fetch products from db
   *
   * @param {number} page
   * @return {string}
   */
  static fetchAllCategories() {
    return this.base() + `/admin/categories`;
  }

  /**
   * url to fetch products from db
   * @return {string}
   */
  static create() {
    return this.base() + '/admin/categories/';
  }

  /**
   * url to fetch products from db
   * @return {string}
   */
  static update() {
    return this.base() + '/admin/categories/';
  }

  /**
   * url to fetch products from db
   * @return {string}
   */
  static delete() {
    return this.base() + '/admin/categories/';
  }
}
