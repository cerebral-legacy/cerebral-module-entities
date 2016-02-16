/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var _path = __webpack_require__(1);

	var _path2 = _interopRequireDefault(_path);

	var _express = __webpack_require__(2);

	var _express2 = _interopRequireDefault(_express);

	var _webpack = __webpack_require__(3);

	var _webpack2 = _interopRequireDefault(_webpack);

	var _webpackDevMiddleware = __webpack_require__(4);

	var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

	var _webpackHotMiddleware = __webpack_require__(5);

	var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

	var _webpackConfig = __webpack_require__(6);

	var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

	var _fs = __webpack_require__(9);

	var _fs2 = _interopRequireDefault(_fs);

	var _bodyParser = __webpack_require__(10);

	var _bodyParser2 = _interopRequireDefault(_bodyParser);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var isDeveloping = process.env.NODE_ENV !== 'production';
	var port = isDeveloping ? 3000 : process.env.PORT;
	var app = (0, _express2.default)();

	app.use(_bodyParser2.default.json());

	app.get('/favicon.ico', function (req, res) {
	  res.status(404);
	  res.send();
	});

	if (isDeveloping) {
	  (function () {
	    var compiler = (0, _webpack2.default)(_webpackConfig2.default);
	    var middleware = (0, _webpackDevMiddleware2.default)(compiler, {
	      publicPath: _webpackConfig2.default.output.publicPath,
	      contentBase: 'src',
	      stats: {
	        colors: true,
	        hash: false,
	        timings: true,
	        chunks: false,
	        chunkModules: false,
	        modules: false
	      }
	    });

	    var posts = [];
	    for (var x = 0; x < 20; x++) {
	      posts.push({
	        id: String(parseInt(Math.random() * 10000)),
	        index: x,
	        name: 'Post ' + x,
	        author: String(x)
	      });
	    }
	    app.get('/posts', function (req, res) {
	      setTimeout(function () {
	        res.send(posts);
	      }, 1000);
	    });

	    app.post('/posts', function (req, res) {
	      setTimeout(function () {
	        posts.unshift({
	          id: String(parseInt(Math.random() * 10000)),
	          name: req.body.name,
	          author: "0",
	          index: posts.length
	        });
	        res.send(posts[0]);
	      }, 1000);
	    });

	    app.get('/posts/:id', function (req, res) {
	      var id = req.params.id;
	      var post = posts.reduce(function (returnedPost, post) {
	        return post.id === id ? post : returnedPost;
	      }, null);
	      var returnedPost = Object.assign(post, {
	        comments: [String(post.index), String(post.index + 1), String(post.index + 2)]
	      });
	      setTimeout(function () {
	        res.send(returnedPost);
	      }, 1000);
	    });

	    app.get('/comments', function (req, res) {
	      setTimeout(function () {
	        res.send(req.query.ids.split(',').map(function (id) {
	          return {
	            id: id,
	            message: 'Whatap ' + id,
	            author: id
	          };
	        }));
	      }, 1000);
	    });

	    app.get('/users', function (req, res) {
	      setTimeout(function () {
	        res.send(req.query.ids.split(',').map(function (id) {
	          return {
	            id: id,
	            name: 'User ' + id
	          };
	        }));
	      }, 1000);
	    });

	    app.use(middleware);
	    app.use((0, _webpackHotMiddleware2.default)(compiler));
	    app.get('*', function (req, res) {
	      res.type('html');
	      res.send(middleware.fileSystem.readFileSync(_path2.default.join(__dirname, 'dist/index.html')).toString());
	    });
	  })();
	} else {
	  app.get('*', function (req, res) {
	    res.type('html');
	    res.send(_fs2.default.readFileSync(_path2.default.join(__dirname, 'dist/index.html')).toString());
	  });
	}

	app.listen(port, '0.0.0.0', function (err) {
	  if (err) {
	    console.log(err);
	  }
	  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("webpack");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("webpack-dev-middleware");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("webpack-hot-middleware");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	var path = __webpack_require__(1);
	var webpack = __webpack_require__(3);
	var ExtractTextPlugin = __webpack_require__(7);
	var HtmlWebpackPlugin = __webpack_require__(8);

	module.exports = {
	  devtool: 'eval-source-map',
	  entry: ['webpack-hot-middleware/client?reload=true', './app/main.js'],
	  output: {
	    path: path.join(__dirname, '/dist/'),
	    filename: '[name].js',
	    publicPath: '/'
	  },
	  plugins: [new HtmlWebpackPlugin({
	    template: 'app/index.tpl.html',
	    inject: 'body',
	    filename: 'index.html'
	  }), new webpack.optimize.OccurenceOrderPlugin(), new webpack.HotModuleReplacementPlugin(), new webpack.DefinePlugin({
	    'process.env': {
	      'NODE_ENV': JSON.stringify('development')
	    }
	  }), new ExtractTextPlugin("styles.css")],
	  module: {
	    loaders: [{
	      test: /\.css$/,
	      loader: ExtractTextPlugin.extract("style-loader", "css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]")
	    }, {
	      test: /\.js?$/,
	      exclude: /node_modules/,
	      loader: 'babel',
	      query: {
	        "presets": ["react", "es2015", "stage-0"],
	        "plugins": [["transform-decorators-legacy"]]
	      }
	    }]
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("extract-text-webpack-plugin");

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = require("html-webpack-plugin");

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = require("fs");

/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ }
/******/ ]);