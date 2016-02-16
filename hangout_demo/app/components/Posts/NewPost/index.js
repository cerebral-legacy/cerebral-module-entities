import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import Input from 'cerebral-module-forms/react/Input';

@Cerebral()
class NewPost extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.signals.posts.newPostSubmitted();
  }
  render() {
    return (
      <div className={styles.wrapper}>
        <h2>New Post</h2>
        <form className={styles.form} onSubmit={this.onSubmit}>
          <Input field={['posts', 'newPost', 'name']}/>
        </form>
      </div>
    );
  }
}

 export default NewPost;
