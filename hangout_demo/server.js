import path from 'path';
import express from 'express';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from './webpack.config.js';
import fs from 'fs';
import bodyParser from 'body-parser';

const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();

app.use(bodyParser.json());

app.get('/favicon.ico', (req, res) => {
  res.status(404);
  res.send();
});

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
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

  const posts = [];
  for (let x = 0; x < 20; x++) {
    posts.push({
      id: String(parseInt(Math.random() * 10000)),
      index: x,
      name: 'Post ' + x,
      author: String(x)
    });
  }
  app.get('/posts', (req, res) => {
    setTimeout(() => {
      res.send(posts);
    }, 1000);
  });

  app.post('/posts', (req, res) => {
    setTimeout(() => {
      posts.unshift({
        id: String(parseInt(Math.random() * 10000)),
        name: req.body.name,
        author: "0",
        index: posts.length
      });
      res.send(posts[0]);
    }, 1000);
  });

  app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const post = posts.reduce((returnedPost, post) => post.id === id ? post : returnedPost, null);
    const returnedPost = Object.assign(post, {
      comments: [String(post.index), String(post.index + 1), String(post.index + 2)]
    })
    setTimeout(() => {
      res.send(returnedPost);
    }, 1000);
  });

  app.get('/comments', (req, res) => {
    setTimeout(() => {
      res.send(req.query.ids.split(',').map((id) => ({
        id: id,
        message: 'Whatap ' + id,
        author: id
      })));
    }, 1000);
  });

  app.get('/users', (req, res) => {
    setTimeout(() => {
      res.send(req.query.ids.split(',').map((id) => ({
        id: id,
        name: 'User ' + id
      })));
    }, 1000);
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', (req, res) => {
    res.type('html');
    res.send(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')).toString());
  });
} else {
  app.get('*', (req, res) => {
    res.type('html');
    res.send(fs.readFileSync(path.join(__dirname, 'dist/index.html')).toString());
  });
}

app.listen(port, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
