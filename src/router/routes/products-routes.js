
/**
 * the router routes related to the product
 */
export default class ProductRoutes {
  /**
   * @return {string}
   */
  static base() {
    return '/products';
  }

  /**
   * @param {number} id
   * @return {string}
   */
  static show(id) {
    return `${this.base()}/show/${id}`;
  }

  /**
   * @return {string}
   */
  static create() {
    return `${this.base()}/create`;
  }


  /**
   * @param {number} id
   * @return {string}
   */
  static edit(id) {
    return `${this.base()}/edit/${id}`;
  }
}


