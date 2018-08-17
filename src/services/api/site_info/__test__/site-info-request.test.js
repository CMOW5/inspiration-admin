import SiteInfoRequest from 'services/api/site_info/site-info-request';
import Form from 'utils/form/form';

const faker = require('faker');

test('it gets the site info', async () => {
  expect.assertions(1);

  const desiredInfo = {
    'name': expect.anything(),
    'description': expect.anything(),
    'phone_number': expect.anything(),
    'schedule': expect.anything(),
    'address': expect.anything(),
    'latitude': expect.anything(),
    'longitude': expect.anything(),
    'facebook_link': expect.anything(),
    'twitter_link': expect.anything(),
    'youtube_link': expect.anything(),
    'instagram_link': expect.anything(),
    'created_at': expect.anything(),
    'updated_at': expect.anything(),
    'logo': expect.anything(),
  };

  return SiteInfoRequest.getInfo()
    .then((info) => {
      expect(info).toMatchObject(desiredInfo);
    });
});

test('it updates the siteinfo', async () => {
  expect.assertions(1);

  const siteInfo = await SiteInfoRequest.getInfo();

  let form = new Form({
    'name': faker.company.companyName(),
    'description': faker.lorem.sentence(),
    'phone_number': faker.phone.phoneNumber(),
    'schedule': faker.lorem.sentence(),
    'address': faker.address.streetAddress(),
    'latitude': Number(faker.address.latitude()),
    'longitude': Number(faker.address.longitude()),
    // 'facebook_link': expect.anything(),
    // 'twitter_link': expect.anything(),
    // 'youtube_link': expect.anything(),
    // 'instagram_link': expect.anything(),
    // 'logo': expect.anything(),
  });
  form.setPutMethod();

  return SiteInfoRequest.updateInfo(siteInfo.id, form.getFormData())
    .then((updatedSiteInfo) => {
      expect(updatedSiteInfo).toMatchObject(form.data());
    });
});

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
