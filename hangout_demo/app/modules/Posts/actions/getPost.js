function getPost({input, services, output}) {
  services.http.get(`/posts/${input.id}`)
    .then(output.success)
    .catch(output.error);
}

export default getPost;
