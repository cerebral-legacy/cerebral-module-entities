function getMissingUsers({input, state, services, output}) {
  const users = state.get('entities', 'ids', 'users') || {};
  const missingUsers = input.result.reduce((missingUsers, post) => {
    if (!users[post.author]) {
      missingUsers.push(post.author);
    }
    return missingUsers;
  }, []);

  services.http.get(`/users?ids=${missingUsers.join(',')}`)
    .then(output.success)
    .catch(output.error);
}

export default getMissingUsers;
