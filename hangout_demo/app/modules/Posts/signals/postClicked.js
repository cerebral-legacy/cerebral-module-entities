import opened from './opened';
import copy from 'cerebral-addons/copy';
import getPost from '../actions/getPost';
import getMissingComments from '../actions/getMissingComments';
import addEntity from 'cerebral-module-entities/addEntity';
import copyEntity from 'cerebral-module-entities/copyEntity';
import entityHas from 'cerebral-module-entities/entityHas';
import hasLoadedPosts from '../actions/hasLoadedPosts';

export default [
  copy('input:/id', 'state:/posts.currentPost'),
  hasLoadedPosts, {
    true: [],
    false: [
      ...opened
    ]
  },
  entityHas('posts', 'input:/id', ['comments']), {
    yes: [
      copyEntity('posts', 'input:/id', 'output:/result'),
      [
        getMissingComments, {
          success: [
            addEntity('comments', 'input:/result')
          ],
          error: []
        }
      ]
    ],
    no: [
      [
        getPost, {
          success: [
            addEntity('posts', 'input:/result'),
            [
              getMissingComments, {
                success: [
                  addEntity('comments', 'input:/result')
                ],
                error: []
              }
            ]
          ],
          error: []
        }
      ]
    ]
  }
];
