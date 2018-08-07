import idb from 'idb';

/**
 * Common database helper functions.
 */

export default class APIHelper {
  constructor() {
    this.dbPromise = idb.open('restaurant-reviews', 1, (upgradeDb) => {
      upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });
    });
  }

  /**
   * API URL.
   */
  static get API_URL() {
    const port = 1337;
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  fetchRestaurants() {
    return this.dbPromise
      .then((db) => {
        const readStore = db
          .transaction('restaurants')
          .objectStore('restaurants');

        return readStore.getAll()
          .then((idbRestaurants) => {
            if (idbRestaurants.length > 0) {
              return idbRestaurants;
            }

            return fetch(APIHelper.API_URL)
              .then(response => response.json())
              .then((networkRestaurants) => {
                const writeStore = db
                  .transaction('restaurants', 'readwrite')
                  .objectStore('restaurants');

                networkRestaurants.forEach(r => writeStore.put(r));
                return networkRestaurants;
              });
          });
      });
  }

  /**
   * Fetch a restaurant by its ID.
   */
  fetchRestaurantById(id) {
    return this.fetchRestaurants()
      .then(restaurants => restaurants.find(r => r.id === id));
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  fetchRestaurantByCuisine(cuisine) {
    return this.fetchRestaurants()
      .then(restaurants => restaurants.filter(r => r.cuisine_type === cuisine));
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  fetchRestaurantByNeighborhood(neighborhood) {
    return this.fetchRestaurants()
      .then(restaurants => restaurants.filter(r => r.neighborhood === neighborhood));
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    return this.fetchRestaurants()
      .then((restaurants) => {
        let results = restaurants;

        if (cuisine !== 'all') { // filter by cuisine
          results = results.filter(r => r.cuisine_type === cuisine);
        }

        if (neighborhood !== 'all') { // filter by neighborhood
          results = results.filter(r => r.neighborhood === neighborhood);
        }

        return results;
      });
  }

  /**
   * Fetch all neighborhoods with proper error handling.
   */
  fetchNeighborhoods() {
    return this.fetchRestaurants()
      .then(restaurants => restaurants
        .map(({ neighborhood }) => neighborhood)
        .filter((neighborhood, i, arr) => arr.indexOf(neighborhood) === i));
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  fetchCuisines() {
    return this.fetchRestaurants()
      .then(restaurants => restaurants
        .map(({ cuisine_type }) => cuisine_type)
        .filter((cuisine, i, arr) => arr.indexOf(cuisine) === i));
  }

  /**
   * Restaurant page URL.
   */
  static urlForRestaurant(restaurant) {
    return (`./restaurant.html?id=${restaurant.id}`);
  }

  /**
   * Restaurant image URL.
   */
  static imageUrlForRestaurant(restaurant) {
    const fileName = restaurant.photograph
      ? `${restaurant.photograph}.jpg`
      : 'not-found.svg';

    return (`/img/${fileName}`);
  }

  /**
   * Map marker for a restaurant.
   */
  static mapMarkerForRestaurant(restaurant, newMap) {
    // https://leafletjs.com/reference-1.3.0.html#marker
    const marker = new window.L.marker([restaurant.latlng.lat, restaurant.latlng.lng],
      {
        title: restaurant.name,
        alt: restaurant.name,
        url: APIHelper.urlForRestaurant(restaurant),
      });
    marker.addTo(newMap);
    return marker;
  }
}
