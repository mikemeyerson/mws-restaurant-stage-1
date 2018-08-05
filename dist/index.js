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
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/main.js");
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

/***/ "./js/idb.js":
/*!*******************!*\
  !*** ./js/idb.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nvar _idb = __webpack_require__(/*! idb */ \"./node_modules/idb/lib/idb.js\");\n\nvar _idb2 = _interopRequireDefault(_idb);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar IDBHelper = function () {\n  function IDBHelper() {\n    _classCallCheck(this, IDBHelper);\n  }\n\n  _createClass(IDBHelper, null, [{\n    key: 'openDatabase',\n    value: function openDatabase() {\n      return _idb2.default.open('restaurant-reviews', 1, function (upgradeDb) {\n        upgradeDb.createObjectStore('restaurants', { keyPath: 'id' });\n      });\n    }\n  }]);\n\n  return IDBHelper;\n}();\n\nexports.default = IDBHelper;\n\n//# sourceURL=webpack:///./js/idb.js?");

/***/ }),

/***/ "./js/main.js":
/*!********************!*\
  !*** ./js/main.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _api = __webpack_require__(/*! ./api */ \"./js/api.js\");\n\nvar _api2 = _interopRequireDefault(_api);\n\nvar _idb = __webpack_require__(/*! ./idb */ \"./js/idb.js\");\n\nvar _idb2 = _interopRequireDefault(_idb);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar restaurants = void 0;\nvar neighborhoods = void 0;\nvar cuisines = void 0;\nvar newMap = void 0;\nvar idbPromise = void 0;\nvar markers = [];\n\n/**\n * Fetch neighborhoods and cuisines as soon as the page is loaded.\n */\ndocument.addEventListener('DOMContentLoaded', function () {\n  window.initMap(); // added\n  window.fetchNeighborhoods();\n  window.fetchCuisines();\n  idbPromise = _idb2.default.openDatabase();\n});\n\nif ('serviceWorker' in navigator) {\n  window.addEventListener('load', function () {\n    navigator.serviceWorker.register('/sw.js').then(function () {\n      console.log('ServiceWorker registration successful');\n    }, console.error);\n  });\n}\n\n/**\n * Fetch all neighborhoods and set their HTML.\n */\nwindow.fetchNeighborhoods = function () {\n  return _api2.default.fetchNeighborhoods().then(function (_neighborhoods) {\n    neighborhoods = _neighborhoods;\n    window.fillNeighborhoodsHTML();\n  });\n};\n\n/**\n * Set neighborhoods HTML.\n */\nwindow.fillNeighborhoodsHTML = function () {\n  var _neighborhoods = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : neighborhoods;\n\n  var select = document.getElementById('neighborhoods-select');\n  _neighborhoods.forEach(function (neighborhood) {\n    var option = document.createElement('option');\n    option.innerHTML = neighborhood;\n    option.value = neighborhood;\n    select.append(option);\n  });\n};\n\n/**\n * Fetch all cuisines and set their HTML.\n */\nwindow.fetchCuisines = function () {\n  return _api2.default.fetchCuisines().then(function (_cuisines) {\n    cuisines = _cuisines;\n    window.fillCuisinesHTML();\n  });\n};\n\n/**\n * Set cuisines HTML.\n */\nwindow.fillCuisinesHTML = function () {\n  var _cuisines = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : cuisines;\n\n  var select = document.getElementById('cuisines-select');\n\n  _cuisines.forEach(function (cuisine) {\n    var option = document.createElement('option');\n    option.innerHTML = cuisine;\n    option.value = cuisine;\n    select.append(option);\n  });\n};\n\n/**\n * Initialize leaflet map, called from HTML.\n */\nwindow.initMap = function () {\n  newMap = window.L.map('map', {\n    center: [40.722216, -73.987501],\n    zoom: 12,\n    scrollWheelZoom: false\n  });\n  window.L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.jpg70?access_token={mapboxToken}', {\n    mapboxToken: 'pk.eyJ1IjoibWV5YW1leWEiLCJhIjoiY2ppYXloMnd6MWM3ZDNwazJxcXowMDk3MiJ9.ILRY-SV_ddX_YEbE6mzkxw',\n    maxZoom: 18,\n    attribution: 'Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, ' + '<a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, ' + 'Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>',\n    id: 'mapbox.streets'\n  }).addTo(newMap);\n\n  window.updateRestaurants();\n};\n\n/**\n * Update page and map for current restaurants.\n */\nwindow.updateRestaurants = function () {\n  var cSelect = document.getElementById('cuisines-select');\n  var nSelect = document.getElementById('neighborhoods-select');\n\n  var cIndex = cSelect.selectedIndex;\n  var nIndex = nSelect.selectedIndex;\n\n  var cuisine = cSelect[cIndex].value;\n  var neighborhood = nSelect[nIndex].value;\n\n  return _api2.default.fetchRestaurantByCuisineAndNeighborhood(cuisine, neighborhood).then(function (_restaurants) {\n    window.resetRestaurants(_restaurants);\n    window.fillRestaurantsHTML();\n  });\n};\n\n/**\n * Clear current restaurants, their HTML and remove their map markers.\n */\nwindow.resetRestaurants = function (_restaurants) {\n  // Remove all restaurants\n  restaurants = [];\n  var ul = document.getElementById('restaurants-list');\n  ul.innerHTML = '';\n\n  // Remove all map markers\n  markers.forEach(function (m) {\n    return m.setMap(null);\n  });\n  markers = [];\n  restaurants = _restaurants;\n};\n\n/**\n * Create all restaurants HTML and add them to the webpage.\n */\nwindow.fillRestaurantsHTML = function () {\n  var _restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurants;\n\n  var ul = document.getElementById('restaurants-list');\n  _restaurants.forEach(function (restaurant) {\n    ul.append(window.createRestaurantHTML(restaurant));\n  });\n  window.addMarkersToMap();\n};\n\n/**\n * Create restaurant HTML.\n */\nvar counter = 0;\n\nwindow.createRestaurantHTML = function (restaurant) {\n  var li = document.createElement('li');\n\n  var contentDiv = document.createElement('div');\n  contentDiv.className = 'restaurant-details';\n  li.append(contentDiv);\n\n  var imageDiv = document.createElement('div');\n  imageDiv.className = 'restaurant-img-wrapper';\n  li.append(imageDiv);\n\n  var name = document.createElement('h1');\n  var id = 'restaurant-' + counter++;\n  name.id = id;\n  name.innerHTML = restaurant.name;\n\n  var link = document.createElement('a');\n  link.href = _api2.default.urlForRestaurant(restaurant);\n  link.appendChild(name);\n  contentDiv.append(link);\n\n  var image = document.createElement('img');\n  image.alt = 'Photograph inside ' + restaurant.name;\n  image.className = 'restaurant-img';\n  image.src = _api2.default.imageUrlForRestaurant(restaurant);\n  imageDiv.append(image);\n\n  var neighborhood = document.createElement('p');\n  neighborhood.innerHTML = restaurant.neighborhood;\n  contentDiv.append(neighborhood);\n\n  var address = document.createElement('p');\n  address.innerHTML = restaurant.address;\n  contentDiv.append(address);\n\n  var more = document.createElement('a');\n  more.className = 'view-details';\n  more.innerHTML = 'View Details';\n  more.setAttribute('aria-labelledby', id);\n  more.href = _api2.default.urlForRestaurant(restaurant);\n  contentDiv.append(more);\n\n  return li;\n};\n\n/**\n * Add markers for current restaurants to the map.\n */\nwindow.addMarkersToMap = function () {\n  var _restaurants = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : restaurants;\n\n  _restaurants.forEach(function (restaurant) {\n    // Add marker to the map\n    var marker = _api2.default.mapMarkerForRestaurant(restaurant, newMap);\n    marker.on('click', function () {\n      window.location.href = marker.options.url;\n    });\n  });\n};\n\n//# sourceURL=webpack:///./js/main.js?");

/***/ }),

/***/ "./node_modules/idb/lib/idb.js":
/*!*************************************!*\
  !*** ./node_modules/idb/lib/idb.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n(function() {\n  function toArray(arr) {\n    return Array.prototype.slice.call(arr);\n  }\n\n  function promisifyRequest(request) {\n    return new Promise(function(resolve, reject) {\n      request.onsuccess = function() {\n        resolve(request.result);\n      };\n\n      request.onerror = function() {\n        reject(request.error);\n      };\n    });\n  }\n\n  function promisifyRequestCall(obj, method, args) {\n    var request;\n    var p = new Promise(function(resolve, reject) {\n      request = obj[method].apply(obj, args);\n      promisifyRequest(request).then(resolve, reject);\n    });\n\n    p.request = request;\n    return p;\n  }\n\n  function promisifyCursorRequestCall(obj, method, args) {\n    var p = promisifyRequestCall(obj, method, args);\n    return p.then(function(value) {\n      if (!value) return;\n      return new Cursor(value, p.request);\n    });\n  }\n\n  function proxyProperties(ProxyClass, targetProp, properties) {\n    properties.forEach(function(prop) {\n      Object.defineProperty(ProxyClass.prototype, prop, {\n        get: function() {\n          return this[targetProp][prop];\n        },\n        set: function(val) {\n          this[targetProp][prop] = val;\n        }\n      });\n    });\n  }\n\n  function proxyRequestMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return promisifyRequestCall(this[targetProp], prop, arguments);\n      };\n    });\n  }\n\n  function proxyMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return this[targetProp][prop].apply(this[targetProp], arguments);\n      };\n    });\n  }\n\n  function proxyCursorRequestMethods(ProxyClass, targetProp, Constructor, properties) {\n    properties.forEach(function(prop) {\n      if (!(prop in Constructor.prototype)) return;\n      ProxyClass.prototype[prop] = function() {\n        return promisifyCursorRequestCall(this[targetProp], prop, arguments);\n      };\n    });\n  }\n\n  function Index(index) {\n    this._index = index;\n  }\n\n  proxyProperties(Index, '_index', [\n    'name',\n    'keyPath',\n    'multiEntry',\n    'unique'\n  ]);\n\n  proxyRequestMethods(Index, '_index', IDBIndex, [\n    'get',\n    'getKey',\n    'getAll',\n    'getAllKeys',\n    'count'\n  ]);\n\n  proxyCursorRequestMethods(Index, '_index', IDBIndex, [\n    'openCursor',\n    'openKeyCursor'\n  ]);\n\n  function Cursor(cursor, request) {\n    this._cursor = cursor;\n    this._request = request;\n  }\n\n  proxyProperties(Cursor, '_cursor', [\n    'direction',\n    'key',\n    'primaryKey',\n    'value'\n  ]);\n\n  proxyRequestMethods(Cursor, '_cursor', IDBCursor, [\n    'update',\n    'delete'\n  ]);\n\n  // proxy 'next' methods\n  ['advance', 'continue', 'continuePrimaryKey'].forEach(function(methodName) {\n    if (!(methodName in IDBCursor.prototype)) return;\n    Cursor.prototype[methodName] = function() {\n      var cursor = this;\n      var args = arguments;\n      return Promise.resolve().then(function() {\n        cursor._cursor[methodName].apply(cursor._cursor, args);\n        return promisifyRequest(cursor._request).then(function(value) {\n          if (!value) return;\n          return new Cursor(value, cursor._request);\n        });\n      });\n    };\n  });\n\n  function ObjectStore(store) {\n    this._store = store;\n  }\n\n  ObjectStore.prototype.createIndex = function() {\n    return new Index(this._store.createIndex.apply(this._store, arguments));\n  };\n\n  ObjectStore.prototype.index = function() {\n    return new Index(this._store.index.apply(this._store, arguments));\n  };\n\n  proxyProperties(ObjectStore, '_store', [\n    'name',\n    'keyPath',\n    'indexNames',\n    'autoIncrement'\n  ]);\n\n  proxyRequestMethods(ObjectStore, '_store', IDBObjectStore, [\n    'put',\n    'add',\n    'delete',\n    'clear',\n    'get',\n    'getAll',\n    'getKey',\n    'getAllKeys',\n    'count'\n  ]);\n\n  proxyCursorRequestMethods(ObjectStore, '_store', IDBObjectStore, [\n    'openCursor',\n    'openKeyCursor'\n  ]);\n\n  proxyMethods(ObjectStore, '_store', IDBObjectStore, [\n    'deleteIndex'\n  ]);\n\n  function Transaction(idbTransaction) {\n    this._tx = idbTransaction;\n    this.complete = new Promise(function(resolve, reject) {\n      idbTransaction.oncomplete = function() {\n        resolve();\n      };\n      idbTransaction.onerror = function() {\n        reject(idbTransaction.error);\n      };\n      idbTransaction.onabort = function() {\n        reject(idbTransaction.error);\n      };\n    });\n  }\n\n  Transaction.prototype.objectStore = function() {\n    return new ObjectStore(this._tx.objectStore.apply(this._tx, arguments));\n  };\n\n  proxyProperties(Transaction, '_tx', [\n    'objectStoreNames',\n    'mode'\n  ]);\n\n  proxyMethods(Transaction, '_tx', IDBTransaction, [\n    'abort'\n  ]);\n\n  function UpgradeDB(db, oldVersion, transaction) {\n    this._db = db;\n    this.oldVersion = oldVersion;\n    this.transaction = new Transaction(transaction);\n  }\n\n  UpgradeDB.prototype.createObjectStore = function() {\n    return new ObjectStore(this._db.createObjectStore.apply(this._db, arguments));\n  };\n\n  proxyProperties(UpgradeDB, '_db', [\n    'name',\n    'version',\n    'objectStoreNames'\n  ]);\n\n  proxyMethods(UpgradeDB, '_db', IDBDatabase, [\n    'deleteObjectStore',\n    'close'\n  ]);\n\n  function DB(db) {\n    this._db = db;\n  }\n\n  DB.prototype.transaction = function() {\n    return new Transaction(this._db.transaction.apply(this._db, arguments));\n  };\n\n  proxyProperties(DB, '_db', [\n    'name',\n    'version',\n    'objectStoreNames'\n  ]);\n\n  proxyMethods(DB, '_db', IDBDatabase, [\n    'close'\n  ]);\n\n  // Add cursor iterators\n  // TODO: remove this once browsers do the right thing with promises\n  ['openCursor', 'openKeyCursor'].forEach(function(funcName) {\n    [ObjectStore, Index].forEach(function(Constructor) {\n      // Don't create iterateKeyCursor if openKeyCursor doesn't exist.\n      if (!(funcName in Constructor.prototype)) return;\n\n      Constructor.prototype[funcName.replace('open', 'iterate')] = function() {\n        var args = toArray(arguments);\n        var callback = args[args.length - 1];\n        var nativeObject = this._store || this._index;\n        var request = nativeObject[funcName].apply(nativeObject, args.slice(0, -1));\n        request.onsuccess = function() {\n          callback(request.result);\n        };\n      };\n    });\n  });\n\n  // polyfill getAll\n  [Index, ObjectStore].forEach(function(Constructor) {\n    if (Constructor.prototype.getAll) return;\n    Constructor.prototype.getAll = function(query, count) {\n      var instance = this;\n      var items = [];\n\n      return new Promise(function(resolve) {\n        instance.iterateCursor(query, function(cursor) {\n          if (!cursor) {\n            resolve(items);\n            return;\n          }\n          items.push(cursor.value);\n\n          if (count !== undefined && items.length == count) {\n            resolve(items);\n            return;\n          }\n          cursor.continue();\n        });\n      });\n    };\n  });\n\n  var exp = {\n    open: function(name, version, upgradeCallback) {\n      var p = promisifyRequestCall(indexedDB, 'open', [name, version]);\n      var request = p.request;\n\n      if (request) {\n        request.onupgradeneeded = function(event) {\n          if (upgradeCallback) {\n            upgradeCallback(new UpgradeDB(request.result, event.oldVersion, request.transaction));\n          }\n        };\n      }\n\n      return p.then(function(db) {\n        return new DB(db);\n      });\n    },\n    delete: function(name) {\n      return promisifyRequestCall(indexedDB, 'deleteDatabase', [name]);\n    }\n  };\n\n  if (true) {\n    module.exports = exp;\n    module.exports.default = module.exports;\n  }\n  else {}\n}());\n\n\n//# sourceURL=webpack:///./node_modules/idb/lib/idb.js?");

/***/ })

/******/ });