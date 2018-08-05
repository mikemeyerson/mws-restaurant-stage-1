import idb from 'idb';

export default class IDBHelper {
  static openDatabase() {
    return idb.open('restaurant-reviews', 1, (upgradeDb) => {
      upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });
    });
  }
}
