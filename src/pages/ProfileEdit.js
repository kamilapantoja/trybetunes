import React from 'react';
import Header from '../components/Header';

class ProfileEdit extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <div data-testid="page-profile-edit">Profile Edit</div>
      </div>
    );
  }
}

export default ProfileEdit;
