import React, { useState } from 'react';

import Header from './Header';
import { Footer } from './Footer';
import PasswordInput from './PasswordInput';
import { Logo, Elegant } from '../images';
import { SetNewPassword } from '../helpers/auth';

const PasswordReset = () => {
  const [password, setPasswordLogin] = useState('');
  const [passwordError, setPasswordError] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordType, setPasswordType] = useState('password');


  const setPassword = (pw) => {
    const error = pw.length < 6;
    setPasswordError(error);
    setPasswordLogin(pw);
  };

  const handlePasswordVisibility = () => {
    setPasswordType(!showPassword ? 'text' : 'password');
    setShowPassword(!showPassword);
  };


  const sendPasswordReset = async (e) => {
    e.preventDefault();
    SetNewPassword(password);
  };

  return (
    <div>
      <div>
        <Header />

        {/* Top Left Title */}
        <div className="CursiveFont SuperFont TextLeft Buffer " style={{ marginLeft: 30 }}>Preschool Patch</div>

        {/* Page Data*/}
        <div
          className="Flex AlignItems SeeThru "
          style={{
            justifyContent: 'space-evenly',

          }}
        >


          {/* Page Title */}
          <div className="Flex Col Buffer MarginTop">
            <div>
              <div className="CursiveFont SuperFont PinkFont">Reset Password</div>

            </div>

            <div className="MarginTop">

              <form onSubmit={sendPasswordReset}>
                <div className="Flex Col JustifyCenter AlignItems">
                  <div className="Flex Col LoginForm BoxShadow">
                    <PasswordInput
                      handlePasswordVisibility={handlePasswordVisibility}
                      setPassword={setPassword}
                      password={password}
                      passwordType={passwordType}
                      passwordError={passwordError}
                    />

                    { passwordError ? (
                      <div className="FakeButton">
                        {'Enter Valid Password ( at least 6 characters )'}
                      </div>
                    ) : (
                      <button type="submit">Reset Password</button>
                    )}
                  </div>


                </div>
              </form>

            </div>


          </div>


        </div>

        <img src={Elegant} alt="decorative" className="filter-green Margins" />

      </div>

      <div className="Buffer">
        <img src={Logo} alt="logo" style={{ width: 600, height: 'auto' }} />
      </div>

      <Footer />
    </div>
  );
};
export default PasswordReset;
