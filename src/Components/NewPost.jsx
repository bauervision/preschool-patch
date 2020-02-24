import React, { useState, useRef } from 'react';
import moment from 'moment';

import { storage } from '../config';

const NewPost = ({ loggedInUser, userId, handleNewPost }) => {
  const [newText, setNewText] = useState(null);
  const [newFiles, setNewFiles] = useState(null);

  const textref = useRef(null);
  const filesref = useRef(null);

  const { photoUrl, name } = loggedInUser;
  const now = moment().toDate().getTime();

  const handleSubmitPost = () => {
    // files will be in a File List array, so convert them first to a normal array
    const imageArray = Array.from(newFiles);

    const imageUrlArray = [];
    // now upload each, if any, to storage
    imageArray.forEach((file) => {
      const uploadTask = storage
        .ref(`public/${userId}/images/${file.name}`)
        .put(file);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
        // progress
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          console.log(progress);
        // setUploadProgress(progress);
        },
        (error) => {
        // error
          console.log(error);
        },
        () => {
        // complete
          storage
            .ref(`public/${userId}/images/`)
            .child(file.name)
            .getDownloadURL()
            .then((url) => {
              const newImage = {
                image: url
              };
              imageUrlArray.push(newImage);
            });
        }
      );
    });


    const newPost = {
      author: { name, id: userId, photoUrl },
      date: now,
      text: newText,
      images: imageUrlArray,
      likes: [], // start out with an empty array
      comments: [], // and empty comments
    };

    handleNewPost(newPost);
    setNewText(null);
    setNewFiles(null);
    textref.current.value = null;
    filesref.current.value = null;
  };

  return (
    <div
      className="Flex Col JustifyCenter ThreeQuarters MarginBottom">


      <div className="Flex AlignItems JustifyCenter">
        <img alt="profile pic" className="ImgFrameReversed MarginHSmall" src={photoUrl} />
        <div className="Col ThreeQuarters">
          <textarea
            ref={textref}
            className="FullWidth"
            placeholder="What would you like to say about today?"
            name="newPost"
            rows='2'
            cols='80'
            onChange={(e) => setNewText(e.target.value)}

          />
          <div className="Flex  Around">

            <input
              ref={filesref}
              className="InputStyle  ThreeQuarters"
              placeholder="Select a File"
              type="file"
              name="files"
              // value={newFiles}
              multiple
              onChange={(e) => setNewFiles(e.target.files)}
            />

            <button className="Quarter" type="button" onClick={handleSubmitPost}>Submit</button>


          </div>

        </div>

      </div>
    </div>

  );
};
export default NewPost;
