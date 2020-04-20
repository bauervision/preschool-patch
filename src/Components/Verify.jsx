import React, { useState, useEffect, useRef } from 'react';
import * as images from '../images/humanVerifications';

const Verify = ({ handleVerify }) => {
  const [image, setImage] = useState(null);
  const [answerIndex, setAnswerIndex] = useState(null);
  const [answer, setAnswer] = useState(null);
  const [isHuman, setIsHuman] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [reset, setReset] = useState(false);
  const [tries, setTries] = useState(1);
  const [email, setEmail] = useState(null); // used to find auto-populating bots

  const inputRef = useRef(null);

  const getImage = (index) => {
    setAnswerIndex(index);

    switch (index) {
      case 1: {
        setAnswer('9');
        return images.Verify1;
      }
      case 2: {
        setAnswer('4');
        return images.Verify2;
      }
      case 3: {
        setAnswer('8');
        return images.Verify3;
      }
      default: {
        setAnswer('6');
        return images.Verify4;
      }
    }
  };

  // get image to load on mount
  useEffect(() => {
    if (!image) {
      setImage(getImage(Math.round(Math.random() * 4)));
    }
  }, [image, reset]);

  const handleChange = (e) => {
    if (e.target.value !== '') {
      setTries(tries - 1);
      setUserAnswer(e.target.value);
    }
  };

  // handle correct answer
  useEffect(() => {
    // make sure we have an answer set first
    if (userAnswer && !email) {
      // now check to see which image was loaded
      if (answer === userAnswer) {
        setIsHuman(true);
        setReset(false);
        handleVerify(true);
      } else {
        setIsHuman(false);
        handleVerify(false);
      }
    }
  }, [answer, answerIndex, userAnswer, handleVerify, email]);

  useEffect(() => {
    if (reset) {
      setIsHuman(false);
      setUserAnswer(null);
      setAnswer(null);
      setImage(null);
      setReset(false);
      setTries(2);
      if (inputRef.current) {
        inputRef.current.value = null;
      }
    }
  }, [reset]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}
    >
      <div >

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img src={image} alt="thisImage" />
          <input
            ref={inputRef}
            type="phone" // <--mislabeled on purpose
            onChange={(e) => handleChange(e)}
            style={{
              borderRadius: '0.3em',
              border: 'solid 1px grey',
              width: '100px',
              padding: '0.3em',
              fontSize: '2em'
            }}
          />
        </div>

        {/* Hidden input */}
        <input
          type="email"
          style={{ display: 'none' }}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="button"
          onClick={() => setReset(true)}
          style={{ padding: '1em', margin: '1em' }}
        >
          Refresh
        </button>
        <div style={{ padding: '1em' }}>
          {isHuman && (
            <div style={{ color: 'green' }}>Ok, you're a Human :)</div>
          )}
          {userAnswer && !isHuman && (
            <div style={{ color: 'red' }}>Nope, don't believe you</div>
          )}
        </div>
      </div>
    </div>
  );
};
export default Verify;
