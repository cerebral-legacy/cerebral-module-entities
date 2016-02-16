import set from 'cerebral-addons/set';
import copyForm from 'cerebral-module-forms/copyForm';
import addEntity from 'cerebral-module-entities/addEntity';
import updateEntity from 'cerebral-module-entities/updateEntity';
import httpPost from 'cerebral-module-http/post';
import addPostAsFirst from '../actions/addPostAsFirst';

export default [
  copyForm('state:/posts.newPost', 'output:/newPost'),
  addEntity('posts', 'input:/newPost'),
  set('state:/posts.newPost.name.value', ''),
  addPostAsFirst,
  [
    httpPost('/posts', 'input:/newPost'), {
      success: [
        updateEntity('posts', 'input:/uuid', 'input:/result')
      ],
      error: []
    }
  ]
];
