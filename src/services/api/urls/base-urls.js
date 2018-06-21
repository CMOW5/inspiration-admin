
/**
 * helper class to get the api urls
 */
export default class BaseUrls {
  /**
   * get the base api url
   * @return {string} the base url
   */
  static base() {
    return 'http://localhost:8000/api';
    // return 'https://inspirationbe.herokuapp.com/api';
  }
}
