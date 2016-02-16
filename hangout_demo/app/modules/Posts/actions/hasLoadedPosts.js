function hasLoadedPosts({state, output}) {
  if (state.get('posts.list').length) {
    output.true();
  } else {
    output.false();
  }
}

hasLoadedPosts.outputs = ['true', 'false'];

export default hasLoadedPosts;
