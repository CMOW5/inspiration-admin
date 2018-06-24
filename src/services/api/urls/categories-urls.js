import BaseUrls from './base-urls';

/**
 * this helper class provides methods to get the
 * urls related to the categories admin
 */
export default class CategoriesUrls extends BaseUrls {
  /**
   * url to get the total count of categories
   * @return {string}
   */
  static count() {
    return this.base() + '/admin/categories/count';
  }

  /**
   * url to fetch all the categories in the db
   *
   * @param {number} page
   * @return {string}
   */
  static fetchAllCategories() {
    return this.base() + `/admin/categories`;
  }

  /**
   * url to fetch a category from the db
   *
   * @param {number} id
   * @return {string}
   */
  static fetchCategory(id) {
    return this.base() + `/admin/categories/${id}`;
  }

  /**
   * url to create a new category
   * @return {string}
   */
  static create() {
    return this.base() + '/admin/categories/';
  }

  /**
   * url to update a category in the db
   * @return {string}
   */
  static update() {
    return this.base() + '/admin/categories/';
  }

  /**
   * url to delete a category in the db
   * @return {string}
   */
  static delete() {
    return this.base() + '/admin/categories/';
  }
}
