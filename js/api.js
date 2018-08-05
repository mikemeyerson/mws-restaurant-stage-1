/**
 * Common database helper functions.
 */
export default class APIHelper {
  /**
   * Database URL.
   */
  static get DATABASE_URL() {
    const port = 1337;
    return `http://localhost:${port}/restaurants`;
  }

  /**
   * Fetch all restaurants.
   */
  static fetchRestaurants() {
    return fetch(APIHelper.DATABASE_URL)
      .then(response => response.json());
  }

  /**
   * Fetch a restaurant by its ID.
   */
  static fetchRestaurantById(id) {
    return fetch(`${APIHelper.DATABASE_URL}/${id}`)
      .then(response => response.json());
  }

  /**
   * Fetch restaurants by a cuisine type with proper error handling.
   */
  static fetchRestaurantByCuisine(cuisine) {
    return APIHelper.fetchRestaurants()
      .then(restaurants => restaurants.filter(r => r.cuisine_type === cuisine));
  }

  /**
   * Fetch restaurants by a neighborhood with proper error handling.
   */
  static fetchRestaurantByNeighborhood(neighborhood) {
    return APIHelper.fetchRestaurants()
      .then(restaurants => restaurants.filter(r => r.neighborhood === neighborhood));
  }

  /**
   * Fetch restaurants by a cuisine and a neighborhood with proper error handling.
   */
  static fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {
    return APIHelper.fetchRestaurants()
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
  static fetchNeighborhoods() {
    return APIHelper.fetchRestaurants()
      .then(restaurants => restaurants
        .map(({ neighborhood }) => neighborhood)
        .filter((neighborhood, i, arr) => arr.indexOf(neighborhood) === i));
  }

  /**
   * Fetch all cuisines with proper error handling.
   */
  static fetchCuisines() {
    return APIHelper.fetchRestaurants()
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
