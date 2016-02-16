import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import {posts, post} from '../../computed/entities';

import NewPost from './NewPost';
import UserSearch from './UserSearch';

@Cerebral({
  posts: posts('posts.list'),
  isLoading: 'posts.isloading',
  currentPost: post('posts.currentPost')
})
class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.renderRow = this.renderRow.bind(this);
    this.renderComment = this.renderComment.bind(this);
  }
  renderComment(comment, index) {
    return (
      <div key={index}>
        {comment.$notFound ? 'Loading...' : comment.message}
      </div>
    )
  }
  renderRow(post, index) {
    const isSelected = this.props.currentPost && this.props.currentPost.id === post.id;
    return (
      <div
        className={isSelected ? styles.selectedRow : styles.row}
        key={index}
        onClick={() => this.props.signals.posts.postClicked({id: post.id})}>
        <div className={styles.postInfo}>
          <div className={styles.post}>
            <div className={styles.cell}>
              {post.id ? post.id : 'Saving...'}
            </div>
            <div className={styles.cell}>
              {post.name}
            </div>
            <div className={styles.cell}>
              {post.author.$notFound ? 'Loading...' : post.author.name}
            </div>
            </div>
        </div>
        <div className={styles.postComments}>
          {
            isSelected ?
              <div className={styles.comments}>
                  {
                    this.props.currentPost.comments ?
                      this.props.currentPost.comments.map(this.renderComment)
                    :
                      'Loading post...'
                  }
              </div>
            :
              null
          }
        </div>
      </div>
    );
  }
  render() {
    if (this.props.isLoading) {
      return (
        <h3>Loading posts...</h3>
      );
    }
    return (
      <div>

        <div className={styles.topBarWrapper}>
          <NewPost/>
          <UserSearch/>
        </div>

        <div className={styles.table}>
          <div className={styles.row}>
            <div className={styles.postInfo}>
              <div className={styles.post}>
                <div className={styles.cell}>
                  <b>ID</b>
                </div>
                <div className={styles.cell}>
                  <b>NAME</b>
                </div>
                <div className={styles.cell}>
                  <b>AUTHOR</b>
                </div>
              </div>
            </div>
          </div>
          {this.props.posts.map(this.renderRow)}
        </div>
      </div>
    );
  }
}

 export default Posts;
