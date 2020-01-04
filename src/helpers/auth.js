import { auth } from "../config";

export const SignUserOut = () => {
  auth
    .signOut()
    .then(() => {
      console.log("Logged Out");
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

export const RegisterUser = (email, password) => {
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(newUser => {
      return newUser;
    })
    .catch(error => console.log(error));
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
