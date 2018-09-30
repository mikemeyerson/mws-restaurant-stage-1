import idb from 'idb';

/**
 * Common database helper functions.
 */

export default class APIHelper {
  // TODO: Move IDB functionality to service worker
  constructor() {
    const version = 2;
    this.dbPromise = idb.open('restaurant-reviews', version, (upgradeDb) => {
      switch (upgradeDb.oldVersion) { // eslint-disable-line default-case
        case 0:
          upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });

        case 1: // eslint-disable-line no-fallthrough
          upgradeDb.createObjectStore('reviews', { keyPath: 'restaurant_id' });
      }
    });
  }

  /**
   * API URL.
   */
  static get API_URL() {
    const port = 1337;
    return `http://localhost:${port}`;
  }

  static fetchIndexedDBFirst(dbPromise, objectStore, url, fetchCallback) {
    return dbPromise
      .then((db) => {
        const readStore = db
          .transaction(objectStore)
          .objectStore(objectStore);

        return readStore.getAll()
          .then((result) => {
            if (result && result.length > 0) {
              return result;
            }

            return fetch(url)
              .then(response => response.json())
              .then((networkResult) => {
                const writeStore = db
                  .transaction(objectStore, 'readwrite')
                  .objectStore(objectStore);

                return fetchCallback(writeStore, networkResult);
              });
          });
      });
  }

  fetchReviewsById(id) {
    const url = `${APIHelper.API_URL}/reviews/?restaurant_id=${id}`;
    const storeReviews = (writeStore, reviews) => {
      writeStore.put(reviews);
      return reviews;
    };


    return APIHelper.fetchIndexedDBFirst(
      this.dbPromise,
      'reviews',
      url,
      storeReviews,
    );
  }

  // TODO: Figure out how to retrieve / store reviews
  // - Need to combine a new review with pre-existing array
  // - https://developer.mozilla.org/en-US/docs/Web/API/NavigatorOnLine/onLine
  addReview(formData) {
    const url = `${APIHelper.API_URL}/reviews/`;
    const body = {};

    for (const [key, value] of formData.entries()) { // eslint-disable-line no-restricted-syntax
      body[key] = value;
    }

    return fetch(url, { method: 'POST', body: JSON.stringify(body) })
      .then(response => Promise.all([response.json(), this.dbPromise]))
      .then(([restaurant, db]) => {
        const writeStore = db
          .transaction('reviews', 'readwrite')
          .objectStore('reviews');

        writeStore.put(restaurant);
        return restaurant;
      });
  }

  /**
   * Fetch all restaurants.
   */
  fetchRestaurants() {
    const storeRestaurants = (writeStore, networkRestaurants) => {
      networkRestaurants.forEach(r => writeStore.put(r));
      return networkRestaurants;
    };

    return APIHelper.fetchIndexedDBFirst(
      this.dbPromise,
      'restaurants',
      `${APIHelper.API_URL}/restaurants`,
      storeRestaurants,
    );
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
        .map(({ cuisine_type: cuisine }) => cuisine)
        .filter((cuisine, i, arr) => arr.indexOf(cuisine) === i));
  }

  toggleRestaurantFavorite(id, isFavorite) {
    const url = `${APIHelper.API_URL}/restaurants/${id}/?is_favorite=${isFavorite}`;

    return fetch(url, { method: 'PUT' })
      .then(response => Promise.all([response.json(), this.dbPromise]))
      .then(([restaurant, db]) => {
        const writeStore = db
          .transaction('restaurants', 'readwrite')
          .objectStore('restaurants');

        writeStore.put(restaurant);
        return restaurant;
      });
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
  // TODO: Move error handling to service worker fetch catch
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
    // eslint-disable-next-line new-cap
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
