function getMissingComments({input, state, services, output}) {
  const comments = state.get('entities.ids.comments') || {};
  const missingComments = input.result.comments.reduce((missingComments, commentId) => {
    if (!comments[commentId]) {
      missingComments.push(commentId);
    }
    return missingComments;
  }, []);

  services.http.get(`/comments?ids=${missingComments.join(',')}`)
    .then(output.success)
    .catch(output.error);
}

export default getMissingComments;
