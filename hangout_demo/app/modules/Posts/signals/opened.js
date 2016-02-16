import httpGet from 'cerebral-module-http/get';
import addEntity from 'cerebral-module-entities/addEntity';
import copy from 'cerebral-addons/copy';
import set from 'cerebral-addons/set';
import getMissingUsers from '../actions/getMissingUsers';

export default [
  set('state:/posts.isLoading', true),
  [
    httpGet('/posts'), {
      success: [
        addEntity('posts', 'input:/result'),
        copy('input:/uuids', 'state:/posts.list')
      ],
      error: []
    }
  ],
  set('state:/posts.isLoading', false),
  [
    getMissingUsers, {
      success: [
        addEntity('users', 'input:/result')
      ],
      error: []
    }
  ]
];
