import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'cerebral-module-router';
import Controller from 'cerebral';
import Model from 'cerebral-model-baobab';
import {Container} from 'cerebral-view-react';
import Devtools from 'cerebral-module-devtools';
import Http from 'cerebral-module-http';
import Entities from 'cerebral-module-entities';
import Forms from 'cerebral-module-forms';
import Useragent from 'cerebral-module-useragent';

import PostsModule from './modules/Posts';
import Posts from './components/Posts';

const controller = Controller(Model({}));

controller.addModules({
  posts: PostsModule,

  useragent: Useragent(),
  forms: Forms(),
  entities: Entities(),
  http: Http(),
  devtools: Devtools(),
  router: Router({
    '/': 'posts.opened',
    '/:id': 'posts.postClicked'
  }, {
    preventAutostart: false
  })
});

ReactDOM.render(<Container controller={controller}><Posts/></Container>, document.getElementById('root'));
