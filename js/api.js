import idb from 'idb';

/**
 * Common database helper functions.
 */

export default class APIHelper {
  // TODO: Move IDB functionality to service worker
  constructor() {
    const version = 3;
    this.dbPromise = idb.open('restaurant-reviews', version, (upgradeDb) => {
      /* eslint-disable no-fallthrough, default-case */
      switch (upgradeDb.oldVersion) {
        case 0:
          upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });

        case 1:
          upgradeDb.createObjectStore('reviews');

        case 2:
          upgradeDb.createObjectStore('offline-reviews');
      }
      /* eslint-enable no-fallthrough, default-case */
    });
  }

  /**
   * API URL.
   */
  static get API_URL() {
    const port = 1337;
    return `http://localhost:${port}`;
  }

  fetchReviewsById(id) {
    const url = `${APIHelper.API_URL}/reviews/?restaurant_id=${id}`;
    let db;

    return this.dbPromise
      .then((_db) => {
        db = _db;
        const reviewStore = db
          .transaction('reviews')
          .objectStore('reviews');

        const offlineReviewStore = db
          .transaction('offline-reviews')
          .objectStore('offline-reviews');

        return Promise.all([
          reviewStore.get(id),
          offlineReviewStore.get(id),
        ]);
      })
      .then(([reviews = [], offlineReviews = []]) => {
        const allReviews = [...reviews, ...offlineReviews];

        if (allReviews.length > 0) {
          return allReviews;
        }

        return fetch(url)
          .then(response => response.json())
          .then((networkReviews) => {
            const writeStore = db
              .transaction('reviews', 'readwrite')
              .objectStore('reviews');

            writeStore.put(networkReviews, id);
            return networkReviews;
          });
      });
  }

  addOfflineReview(formData) {
    let db;

    return this.dbPromise
      .then((_db) => {
        db = _db;

        const readStore = db
          .transaction('offline-reviews')
          .objectStore('offline-reviews');

        return readStore.get(formData.restaurant_id);
      })
      .then((offlineReviews = []) => {
        const writeStore = db
          .transaction('offline-reviews', 'readwrite')
          .objectStore('offline-reviews');

        writeStore.put([...offlineReviews, formData], formData.restaurant_id);
        return formData;
      });
  }

  addOnlineReview(formData) {
    const url = `${APIHelper.API_URL}/reviews/`;

    const sendReview = () => fetch(url, { method: 'POST', body: JSON.stringify(formData) })
      .then(response => response.json());

    const promises = [
      sendReview(),
      this.dbPromise,
    ];

    let db;
    let newReview;

    return Promise.all(promises)
      .then(([_newReview, _db]) => {
        db = _db;
        newReview = _newReview;

        const readStore = db
          .transaction('reviews')
          .objectStore('reviews');

        return readStore.get(formData.restaurant_id);
      })
      .then((reviews = []) => {
        const readWriteStore = db
          .transaction('reviews', 'readwrite')
          .objectStore('reviews');

        readWriteStore.put([...reviews, newReview], formData.restaurant_id);
        return newReview;
      })
      .catch(() => this.addOfflineReview(formData));
  }

  addReview(formData) {
    const mandatoryParams = [
      'comments',
      'id',
      'name',
      'rating',
      'restaurant_id',
    ];

    if (!mandatoryParams.every(param => formData[param])) {
      throw new Error('Add review missing params');
    }

    return (!window.navigator || !window.navigator.onLine)
      ? this.addOfflineReview(formData)
      : this.addOnlineReview(formData);
  }

  onNetworkConnection() {
    const iterateCursor = (cursor) => {
      if (!cursor) return null;

      cursor.value.forEach(formData => this.addOnlineReview(formData));

      return cursor.delete().then(() => cursor.continue().then(iterateCursor));
    };

    return this.dbPromise
      .then(db => db.transaction('offline-reviews', 'readwrite').objectStore('offline-reviews').openCursor())
      .then(iterateCursor);
  }

  /**
   * Fetch all restaurants.
   */
  fetchRestaurants() {
    let db;

    return this.dbPromise
      .then((_db) => {
        db = _db;
        const readStore = db
          .transaction('restaurants')
          .objectStore('restaurants');

        return readStore.getAll();
      })
      .then((result) => {
        if (result && result.length > 0) {
          return result;
        }

        return fetch(`${APIHelper.API_URL}/restaurants`)
          .then(response => response.json())
          .then((networkRestaurants) => {
            const writeStore = db
              .transaction('restaurants', 'readwrite')
              .objectStore('restaurants');

            networkRestaurants.forEach(r => writeStore.put(r));
            return networkRestaurants;
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
