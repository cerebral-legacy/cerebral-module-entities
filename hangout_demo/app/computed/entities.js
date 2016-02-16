import compute from 'cerebral-module-entities/compute';

export function posts(path) {
  return compute('entities.posts', path, {
    author: user
  });
}

export function post(path) {
  return compute('entities.posts', path, {
    author: user,
    comments: comments
  });
}

export function user(path) {
  return compute('entities.users', path);
}

export function comments(path) {
  return compute('entities.comments', path);
}
