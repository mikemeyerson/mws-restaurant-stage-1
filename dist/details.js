/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/restaurant_info.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/api.js":
/*!*******************!*\
  !*** ./js/api.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\n/**\n * Common database helper functions.\n */\nvar APIHelper = function () {\n  function APIHelper() {\n    _classCallCheck(this, APIHelper);\n  }\n\n  _createClass(APIHelper, null, [{\n    key: 'fetchRestaurants',\n\n\n    /**\n     * Fetch all restaurants.\n     */\n    value: function fetchRestaurants() {\n      return fetch(APIHelper.DATABASE_URL).then(function (response) {\n        return response.json();\n      });\n    }\n\n    /**\n     * Fetch a restaurant by its ID.\n     */\n\n  }, {\n    key: 'fetchRestaurantById',\n    value: function fetchRestaurantById(id) {\n      return fetch(APIHelper.DATABASE_URL + '/' + id).then(function (response) {\n        return response.json();\n      });\n    }\n\n    /**\n     * Fetch restaurants by a cuisine type with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisine',\n    value: function fetchRestaurantByCuisine(cuisine) {\n      return APIHelper.fetchRestaurants().then(function (restaurants) {\n        return restaurants.filter(function (r) {\n          return r.cuisine_type === cuisine;\n        });\n      });\n    }\n\n    /**\n     * Fetch restaurants by a neighborhood with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByNeighborhood',\n    value: function fetchRestaurantByNeighborhood(neighborhood) {\n      return APIHelper.fetchRestaurants().then(function (restaurants) {\n        return restaurants.filter(function (r) {\n          return r.neighborhood === neighborhood;\n        });\n      });\n    }\n\n    /**\n     * Fetch restaurants by a cuisine and a neighborhood with proper error handling.\n     */\n\n  }, {\n    key: 'fetchRestaurantByCuisineAndNeighborhood',\n    value: function fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood) {\n      return APIHelper.fetchRestaurants().then(function (restaurants) {\n        var results = restaurants;\n\n        if (cuisine !== 'all') {\n          // filter by cuisine\n          results = results.filter(function (r) {\n            return r.cuisine_type === cuisine;\n          });\n        }\n\n        if (neighborhood !== 'all') {\n          // filter by neighborhood\n          results = results.filter(function (r) {\n            return r.neighborhood === neighborhood;\n          });\n        }\n\n        return results;\n      });\n    }\n\n    /**\n     * Fetch all neighborhoods with proper error handling.\n     */\n\n  }, {\n    key: 'fetchNeighborhoods',\n    value: function fetchNeighborhoods() {\n      return APIHelper.fetchRestaurants().then(function (restaurants) {\n        return restaurants.map(function (_ref) {\n          var neighborhood = _ref.neighborhood;\n          return neighborhood;\n        }).filter(function (neighborhood, i, arr) {\n          return arr.indexOf(neighborhood) === i;\n        });\n      });\n    }\n\n    /**\n     * Fetch all cuisines with proper error handling.\n     */\n\n  }, {\n    key: 'fetchCuisines',\n    value: function fetchCuisines() {\n      return APIHelper.fetchRestaurants().then(function (restaurants) {\n        return restaurants.map(function (_ref2) {\n          var cuisine_type = _ref2.cuisine_type;\n          return cuisine_type;\n        }).filter(function (cuisine, i, arr) {\n          return arr.indexOf(cuisine) === i;\n        });\n      });\n    }\n\n    /**\n     * Restaurant page URL.\n     */\n\n  }, {\n    key: 'urlForRestaurant',\n    value: function urlForRestaurant(restaurant) {\n      return './restaurant.html?id=' + restaurant.id;\n    }\n\n    /**\n     * Restaurant image URL.\n     */\n\n  }, {\n    key: 'imageUrlForRestaurant',\n    value: function imageUrlForRestaurant(restaurant) {\n      var fileName = restaurant.photograph ? restaurant.photograph + '.jpg' : 'not-found.svg';\n\n      return '/img/' + fileName;\n    }\n\n    /**\n     * Map marker for a restaurant.\n     */\n\n  }, {\n    key: 'mapMarkerForRestaurant',\n    value: function mapMarkerForRestaurant(restaurant, newMap) {\n      // https://leafletjs.com/reference-1.3.0.html#marker\n      var marker = new window.L.marker([restaurant.latlng.lat, restaurant.latlng.lng], {\n        title: restaurant.name,\n        alt: restaurant.name,\n        url: APIHelper.urlForRestaurant(restaurant)\n      });\n      marker.addTo(newMap);\n      return marker;\n    }\n  }, {\n    key: 'DATABASE_URL',\n\n    /**\n     * Database URL.\n     */\n    get: function get() {\n      var port = 1337;\n      return 'http://localhost:' + port + '/restaurants';\n    }\n  }]);\n\n  return APIHelper;\n}();\n\nexports.default = APIHelper;\n\n//# sourceURL=webpack:///./js/api.js?");

/***/ }),

/***/ "./js/restaurant_info.js":
/*!*******************************!*\
  !*** ./js/restaurant_info.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _api = __webpack_require__(/*! ./api */ \"./js/api.js\");\n\nvar _api2 = _interopRequireDefault(_api);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurant = void 0;\nvar newMap = void 0;\n\n/**\n * Initialize map as soon as the page is loaded.\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  window.initMap();\n});\n\n/**\n * Initialize leaflet map\n */\nwindow.initMap = function () {\n  return window.fetchRestaurantFromURL().then(function (_restaurant) {\n    newMap = window.L.map('map', {\n      center: [_restaurant.latlng.lat, _restaurant.latlng.lng],\n      zoom: 16,\n      scrollWheelZoom: false\n    });\n    window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {\n      mapboxToken: 'pk.eyJ1IjoibWV5YW1leWEiLCJhIjoiY2ppYXloMnd6MWM3ZDNwazJxcXowMDk3MiJ9.ILRY-SV_ddX_YEbE6mzkxw',\n      maxZoom: 18,\n      attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, ' + '<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, ' + 'Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\n      id: 'mapbox.streets'\n    }).addTo(newMap);\n    window.fillBreadcrumb();\n    _api2.default.mapMarkerForRestaurant(restaurant, newMap);\n  });\n};\n\n/**\n * Get current restaurant from page URL.\n */\nwindow.fetchRestaurantFromURL = function () {\n  if (restaurant) {\n    // restaurant already fetched!\n    return restaurant;\n  }\n\n  var id = window.getParameterByName('id');\n\n  if (!id) {\n    // no id found in URL\n    return Promise.reject(new Error('No restaurant id in URL'));\n  }\n\n  return _api2.default.fetchRestaurantById(id).then(function (_restaurant) {\n    restaurant = _restaurant;\n    window.fillRestaurantHTML();\n    return _restaurant;\n  }).catch(function (err) {\n    console.error(err);\n    throw err;\n  });\n};\n\n/**\n * Create restaurant HTML and add it to the webpage\n */\nwindow.fillRestaurantHTML = function () {\n  var _restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurant;\n\n  var name = document.getElementById('restaurant-name');\n  name.innerHTML = _restaurant.name;\n\n  var address = document.getElementById('restaurant-address');\n  address.innerHTML = _restaurant.address;\n\n  var image = document.getElementById('restaurant-img');\n  image.className = 'restaurant-img';\n  image.alt = 'Photograph inside ' + _restaurant.name;\n  image.src = _api2.default.imageUrlForRestaurant(_restaurant);\n\n  var cuisine = document.getElementById('restaurant-cuisine');\n  cuisine.innerHTML = _restaurant.cuisine_type;\n\n  // fill operating hours\n  if (_restaurant.operating_hours) {\n    window.fillRestaurantHoursHTML();\n  }\n  // fill reviews\n  window.fillReviewsHTML();\n};\n\n/**\n * Create restaurant operating hours HTML table and add it to the webpage.\n */\nwindow.fillRestaurantHoursHTML = function () {\n  var operatingHours = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurant.operating_hours;\n\n  var hours = document.getElementById('restaurant-hours');\n  for (var key in operatingHours) {\n    var row = document.createElement('tr');\n\n    var day = document.createElement('td');\n    day.innerHTML = key;\n    row.appendChild(day);\n\n    var time = document.createElement('td');\n    time.innerHTML = operatingHours[key];\n    row.appendChild(time);\n\n    hours.appendChild(row);\n  }\n};\n\n/**\n * Create all reviews HTML and add them to the webpage.\n */\nwindow.fillReviewsHTML = function () {\n  var reviews = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurant.reviews;\n\n  var container = document.getElementById('reviews-container');\n  var title = document.createElement('h2');\n  title.innerHTML = 'Reviews';\n  container.appendChild(title);\n\n  if (!reviews) {\n    var noReviews = document.createElement('p');\n    noReviews.innerHTML = 'No reviews yet!';\n    container.appendChild(noReviews);\n    return;\n  }\n  var ul = document.getElementById('reviews-list');\n  reviews.forEach(function (review) {\n    ul.appendChild(window.createReviewHTML(review));\n  });\n  container.appendChild(ul);\n};\n\n/**\n * Create review HTML and add it to the webpage.\n */\nwindow.createReviewHTML = function (review) {\n  var li = document.createElement('li');\n\n  var header = document.createElement('div');\n  header.setAttribute('class', 'review-header');\n  li.appendChild(header);\n\n  var name = document.createElement('h5');\n  name.innerHTML = review.name;\n  header.appendChild(name);\n\n  var date = document.createElement('p');\n  date.innerHTML = review.date;\n  header.appendChild(date);\n\n  var rating = document.createElement('p');\n  var numRating = parseInt(review.rating, 10);\n  var ratingString = '&#9733'.repeat(numRating);\n  rating.className = 'rating';\n  rating.setAttribute('aria-label', review.rating + ' stars');\n  rating.innerHTML = '<strong>Rating: </strong><span aria-hidden=\"true\">' + ratingString + '</span>';\n  li.appendChild(rating);\n\n  var content = document.createElement('div');\n  content.setAttribute('class', 'review-content');\n  li.appendChild(content);\n\n  var comments = document.createElement('p');\n  comments.innerHTML = review.comments;\n  content.appendChild(comments);\n\n  return li;\n};\n\n/**\n * Add restaurant name to the breadcrumb navigation menu\n */\nwindow.fillBreadcrumb = function () {\n  var _restaurant = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurant;\n\n  var breadcrumb = document.getElementById('breadcrumb');\n  var li = document.createElement('li');\n  li.setAttribute('aria-current', 'page');\n  li.innerHTML = _restaurant.name;\n  breadcrumb.appendChild(li);\n};\n\n/**\n * Get a parameter by name from page URL.\n */\nwindow.getParameterByName = function (name) {\n  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;\n\n  var replacedName = name.replace(/[[\\]]/g, '\\\\$&');\n  var regex = new RegExp('[?&]' + replacedName + '(=([^&#]*)|&|#|$)');\n  var results = regex.exec(url);\n  if (!results) return null;\n  if (!results[2]) return '';\n  return decodeURIComponent(results[2].replace(/\\+/g, ' '));\n};\n\n//# sourceURL=webpack:///./js/restaurant_info.js?");

/***/ })

/******/ });