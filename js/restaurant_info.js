import APIHelper from './api';

let restaurant;
let newMap;
const api = new APIHelper();

/**
 * Initialize map as soon as the page is loaded.
 */
document.addEventListener('DOMContentLoaded', () => {
  window.initMap();
});

/**
 * Initialize leaflet map
 */
window.initMap = () => window.fetchRestaurantFromURL()
  .then((_restaurant) => {
    newMap = window.L.map('map', {
      center: [_restaurant.latlng.lat, _restaurant.latlng.lng],
      zoom: 16,
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
    window.fillBreadcrumb();
    APIHelper.mapMarkerForRestaurant(restaurant, newMap);
  });

/**
 * Get current restaurant from page URL.
 */
window.fetchRestaurantFromURL = () => {
  if (restaurant) { // restaurant already fetched!
    return restaurant;
  }

  const id = window.getParameterByName('id');

  if (!id) { // no id found in URL
    return Promise.reject(new Error('No restaurant id in URL'));
  }

  return api.fetchRestaurantById(parseInt(id, 10))
    .then((_restaurant) => {
      restaurant = _restaurant;
      window.fillRestaurantHTML();
      return _restaurant;
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

/**
 * Create restaurant HTML and add it to the webpage
 */
window.fillRestaurantHTML = (_restaurant = restaurant) => {
  const name = document.getElementById('restaurant-name');
  name.innerHTML = _restaurant.name;

  const address = document.getElementById('restaurant-address');
  address.innerHTML = _restaurant.address;

  const image = document.getElementById('restaurant-img');
  image.className = 'restaurant-img';
  image.alt = `Photograph inside ${_restaurant.name}`;
  image.src = APIHelper.imageUrlForRestaurant(_restaurant);

  const cuisine = document.getElementById('restaurant-cuisine');
  cuisine.innerHTML = _restaurant.cuisine_type;


  // fill operating hours
  if (_restaurant.operating_hours) {
    window.fillRestaurantHoursHTML();
  }
  // fill reviews
  window.fillReviewsHTML();
};

/**
 * Create restaurant operating hours HTML table and add it to the webpage.
 */
window.fillRestaurantHoursHTML = (operatingHours = restaurant.operating_hours) => {
  const hours = document.getElementById('restaurant-hours');
  for (const key in operatingHours) {
    const row = document.createElement('tr');

    const day = document.createElement('td');
    day.innerHTML = key;
    row.appendChild(day);

    const time = document.createElement('td');
    time.innerHTML = operatingHours[key];
    row.appendChild(time);

    hours.appendChild(row);
  }
};

/**
 * Create all reviews HTML and add them to the webpage.
 */
window.fillReviewsHTML = (reviews = restaurant.reviews) => {
  const container = document.getElementById('reviews-container');
  const title = document.createElement('h2');
  title.innerHTML = 'Reviews';
  container.appendChild(title);

  if (!reviews) {
    const noReviews = document.createElement('p');
    noReviews.innerHTML = 'No reviews yet!';
    container.appendChild(noReviews);
    return;
  }
  const ul = document.getElementById('reviews-list');
  reviews.forEach((review) => {
    ul.appendChild(window.createReviewHTML(review));
  });
  container.appendChild(ul);
};

/**
 * Create review HTML and add it to the webpage.
 */
window.createReviewHTML = (review) => {
  const li = document.createElement('li');

  const header = document.createElement('div');
  header.setAttribute('class', 'review-header');
  li.appendChild(header);

  const name = document.createElement('h5');
  name.innerHTML = review.name;
  header.appendChild(name);

  const date = document.createElement('p');
  date.innerHTML = review.date;
  header.appendChild(date);

  const rating = document.createElement('p');
  const numRating = parseInt(review.rating, 10);
  const ratingString = '&#9733'.repeat(numRating);
  rating.className = 'rating';
  rating.setAttribute('aria-label', `${review.rating} stars`);
  rating.innerHTML = `<strong>Rating: </strong><span aria-hidden="true">${ratingString}</span>`;
  li.appendChild(rating);

  const content = document.createElement('div');
  content.setAttribute('class', 'review-content');
  li.appendChild(content);

  const comments = document.createElement('p');
  comments.innerHTML = review.comments;
  content.appendChild(comments);

  return li;
};

/**
 * Add restaurant name to the breadcrumb navigation menu
 */
window.fillBreadcrumb = (_restaurant = restaurant) => {
  const breadcrumb = document.getElementById('breadcrumb');
  const li = document.createElement('li');
  li.setAttribute('aria-current', 'page');
  li.innerHTML = _restaurant.name;
  breadcrumb.appendChild(li);
};

/**
 * Get a parameter by name from page URL.
 */
window.getParameterByName = (name, url = window.location.href) => {
  const replacedName = name.replace(/[[\]]/g, '\\$&');
  const regex = new RegExp(`[?&]${replacedName}(=([^&#]*)|&|#|$)`);
  const results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
};
