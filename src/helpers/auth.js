import { auth } from "../config";

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
    let user = await auth.createUserWithEmailAndPassword(email, password);
    if (user) {
      return user;
    }
  } catch (error) {
    const status = { error: error, successful: false };
    return status;
  }
};

export const LoginUserEmailPassword = async (email, password) => {
  try {
    let user = await auth.signInWithEmailAndPassword(email, password);
    return user;
  } catch (err) {
    const status = { error: err, successful: false };
    return status;
  }
};
