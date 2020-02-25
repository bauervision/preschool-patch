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
    const imageUrlArray = [];

    // as long as we actually select files
    if (newFiles) {
      const imageArray = Array.from(newFiles);

      // upload each to storage
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
    }

    const newPost = {
      author: { name, id: userId, photoUrl },
      date: now,
      text: newText,
      images: imageUrlArray,
      likes: [], // start out with an empty array
      comments: [], // and empty comments
    };

    handleNewPost(newPost);
    // handle clean up
    setNewText(null);
    setNewFiles(null);
    textref.current.value = null;
    filesref.current.value = null;
  };

  console.log(newFiles);
  return (
    <div className="Flex Col  AlignItems ThreeQuarters FullSize " >


      <div className="Flex AlignItems ">
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
            res

          />
          <div className="Flex Col JustifyCenter">

            <div className="TextLeft Buffer">
              <div className="InputTextLabel" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>Limit of 10 Images</div>
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
            </div>
            {/* Thumbnail images prior to upload */}
            { newFiles
            && <div className="UploadImageContainer">
              { Array.from(newFiles).map((file) => (
                <div key={file.name} className="UploadImageRow">
                  <img className="UploadImage"src={URL.createObjectURL(file)} />
                </div>))}
            </div>
            }

            <button className="Quarter" type="button" onClick={handleSubmitPost}>Submit</button>


          </div>

        </div>

      </div>
    </div>

  );
};
export default NewPost;
