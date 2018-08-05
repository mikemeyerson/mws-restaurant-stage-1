import APIHelper from './api';
import IDBHelper from './idb';

let restaurants;
let neighborhoods;
let cuisines;
let newMap;
let idbPromise;
let markers = [];

/**
 * Fetch neighborhoods and cuisines as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  window.initMap(); // added
  window.fetchNeighborhoods();
  window.fetchCuisines();
  idbPromise = IDBHelper.openDatabase();
});

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('ServiceWorker registration successful');
    }, console.error);
  });
}

/**
 * Fetch all neighborhoods and set their HTML.
 */
window.fetchNeighborhoods = () => APIHelper.fetchNeighborhoods()
  .then((_neighborhoods) => {
    neighborhoods = _neighborhoods;
    window.fillNeighborhoodsHTML();
  });

/**
 * Set neighborhoods HTML.
 */
window.fillNeighborhoodsHTML = (_neighborhoods = neighborhoods) => {
  const select = document.getElementById('neighborhoods-select');
  _neighborhoods.forEach((neighborhood) => {
    const option = document.createElement('option');
    option.innerHTML = neighborhood;
    option.value = neighborhood;
    select.append(option);
  });
};

/**
 * Fetch all cuisines and set their HTML.
 */
window.fetchCuisines = () => APIHelper.fetchCuisines()
  .then((_cuisines) => {
    cuisines = _cuisines;
    window.fillCuisinesHTML();
  });

/**
 * Set cuisines HTML.
 */
window.fillCuisinesHTML = (_cuisines = cuisines) => {
  const select = document.getElementById('cuisines-select');

  _cuisines.forEach((cuisine) => {
    const option = document.createElement('option');
    option.innerHTML = cuisine;
    option.value = cuisine;
    select.append(option);
  });
};

/**
 * Initialize leaflet map, called from HTML.
 */
window.initMap = () => {
  newMap = window.L.map('map', {
    center: [40.722216, -73.987501],
    zoom: 12,
    scrollWheelZoom: false,
  });
  window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {
    mapboxToken: 'pk.eyJ1IjoibWV5YW1leWEiLCJhIjoiY2ppYXloMnd6MWM3ZDNwazJxcXowMDk3MiJ9.ILRY-SV_ddX_YEbE6mzkxw',
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, '
      + '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, '
      + 'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets',
  }).addTo(newMap);

  window.updateRestaurants();
};

/**
 * Update page and map for current restaurants.
 */
window.updateRestaurants = () => {
  const cSelect = document.getElementById('cuisines-select');
  const nSelect = document.getElementById('neighborhoods-select');

  const cIndex = cSelect.selectedIndex;
  const nIndex = nSelect.selectedIndex;

  const cuisine = cSelect[cIndex].value;
  const neighborhood = nSelect[nIndex].value;

  return APIHelper.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood)
    .then((_restaurants) => {
      window.resetRestaurants(_restaurants);
      window.fillRestaurantsHTML();
    });
};

/**
 * Clear current restaurants, their HTML and remove their map markers.
 */
window.resetRestaurants = (_restaurants) => {
  // Remove all restaurants
  restaurants = [];
  const ul = document.getElementById('restaurants-list');
  ul.innerHTML = '';

  // Remove all map markers
  markers.forEach(m => m.setMap(null));
  markers = [];
  restaurants = _restaurants;
};

/**
 * Create all restaurants HTML and add them to the webpage.
 */
window.fillRestaurantsHTML = (_restaurants = restaurants) => {
  const ul = document.getElementById('restaurants-list');
  _restaurants.forEach((restaurant) => {
    ul.append(window.createRestaurantHTML(restaurant));
  });
  window.addMarkersToMap();
};

/**
 * Create restaurant HTML.
 */
let counter = 0;

window.createRestaurantHTML = (restaurant) => {
  const li = document.createElement('li');

  const contentDiv = document.createElement('div');
  contentDiv.className = 'restaurant-details';
  li.append(contentDiv);

  const imageDiv = document.createElement('div');
  imageDiv.className = 'restaurant-img-wrapper';
  li.append(imageDiv);

  const name = document.createElement('h1');
  const id = `restaurant-${counter++}`;
  name.id = id;
  name.innerHTML = restaurant.name;

  const link = document.createElement('a');
  link.href = APIHelper.urlForRestaurant(restaurant);
  link.appendChild(name);
  contentDiv.append(link);

  const image = document.createElement('img');
  image.alt = `Photograph inside ${restaurant.name}`;
  image.className = 'restaurant-img';
  image.src = APIHelper.imageUrlForRestaurant(restaurant);
  imageDiv.append(image);

  const neighborhood = document.createElement('p');
  neighborhood.innerHTML = restaurant.neighborhood;
  contentDiv.append(neighborhood);

  const address = document.createElement('p');
  address.innerHTML = restaurant.address;
  contentDiv.append(address);

  const more = document.createElement('a');
  more.className = 'view-details';
  more.innerHTML = 'View Details';
  more.setAttribute('aria-labelledby', id);
  more.href = APIHelper.urlForRestaurant(restaurant);
  contentDiv.append(more);

  return li;
};

/**
 * Add markers for current restaurants to the map.
 */
window.addMarkersToMap = (_restaurants = restaurants) => {
  _restaurants.forEach((restaurant) => {
    // Add marker to the map
    const marker = APIHelper.mapMarkerForRestaurant(restaurant, newMap);
    marker.on('click', () => {
      window.location.href = marker.options.url;
    });
  });
};
