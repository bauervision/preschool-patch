// Import FirebaseAuth and firebase.
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase';


const FirebaseUI = ({ uiConfig, isNewUser }) => {
  return (
    <>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      <div className="CursiveFont LargeFont">{isNewUser ? 'Thanks for joining us!' : 'Welcome Back!'}</div>
    </>
  );
};
export default FirebaseUI;
