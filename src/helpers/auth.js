import { auth } from '../config';

export const SignUserOut = () => {
  auth
    .signOut()
    .then(() => {
      return true;
    })
    .catch((error) => {
      return [false, error];
    });
};

export const RegisterUser = async (email, password) => {
  try {
    const user = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      return user;
    }
  } catch (error) {
    const status = { error, successful: false };
    return status;
  }
  return null;
};

export const LoginUserEmailPassword = async (email, password) => {
  try {
    const user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    const status = { error: err, successful: false };
    return status;
  }
};

export const PasswordReset = async (email) => {
  auth.sendPasswordResetEmail(email).then(() => {
    console.log('Password reset request sent');
  });
};


export const SetNewPassword = (newPassword) => {
  auth.updatePassword(newPassword).then(() => {
    console.log('Password Update successful');
  }).catch((error) => {
    console.error(error);
    // An error happened.
  });
};

export const SendValidationEmail = (user) => {
  user.sendEmailVerification().then(() => {
    console.log('Email Validation sent');
  }).catch((error) => {
    console.error(error);
  });
};
