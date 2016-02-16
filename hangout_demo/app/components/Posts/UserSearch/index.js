import React from 'react';
import {Decorator as Cerebral} from 'cerebral-view-react';
import styles from './styles.css';
import fuse from 'cerebral-module-fuse/lib/compute';

@Cerebral({
  users: fuse(['posts', 'userSearch']),
  query: 'posts.userSearch.query'
})
class UserSearch extends React.Component {
  constructor(props) {
    super(props);
    this.renderUserResult = this.renderUserResult.bind(this);
  }
  renderUserResult(user, index) {
    return (
      <div className={styles.userResult} key={index}>
        {user.name}
      </div>
    );
  }
  render() {
    const search = this.props.signals.posts.userSearch.search;

    return (
      <div className={styles.wrapper}>
        <h2>Search users</h2>
        <input
          type="text"
          value={this.props.query}
          onChange={(e) => search({query: e.target.value})}/>
        {
          this.props.users.length ?
            <div className={styles.searchResultWrapper}>
              {this.props.users.map(this.renderUserResult)}
            </div>
          :
            null
        }
      </div>
    );
  }
}

 export default UserSearch;
