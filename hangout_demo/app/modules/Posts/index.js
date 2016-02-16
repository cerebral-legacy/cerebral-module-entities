import opened from './signals/opened';
import postClicked from './signals/postClicked';
import newPostSubmitted from './signals/newPostSubmitted';
import Form from 'cerebral-module-forms/Form';
import fuse from 'cerebral-module-fuse';
import {posts} from '../../computed/entities';

export default (module) => {
  module.addState({
    currentPost: null,
    list: [],
    isLoading: true,
    userSearchQuery: '',
    newPost: Form({
      name: {
        value: '',
        validations: ['minLength:3'],
        errorMessages: ['Has to be longer than 3 characters']
      },
      author: {
        value: '0'
      }
    })
  });
  module.addSignals({
    opened,
    postClicked,
    newPostSubmitted
  });
  module.addModules({
    userSearch: fuse({
      statePath: ['entities', 'users'],
      options: {keys: ['name']}
    })
  })
}
