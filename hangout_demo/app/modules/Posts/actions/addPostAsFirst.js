function addPostAsFirst({input, state}) {
  state.unshift('posts.list', input.uuid);
}

export default addPostAsFirst;
