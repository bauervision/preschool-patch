import React, { useState, useRef } from 'react';
import moment from 'moment';

import { storage } from '../config';

const NewPost = ({ loggedInUser, userId, handleNewPost }) => {
  const [newText, setNewText] = useState(null);
  const [newFiles, setNewFiles] = useState(null);
  const [imageUrlArray, setImageUrlArray] = useState([]);

  const textref = useRef(null);
  const filesref = useRef(null);

  const { photoUrl, name } = loggedInUser;
  const now = moment().toDate().getTime();


  const uploadImageAsPromise = (file) => {
    const update = [...imageUrlArray];
    const storageRef = storage.ref(`public/${userId}/images/${file.name}`);

    return new Promise(((resolve, reject) => {
      // Upload file
      const task = storageRef.put(file);
      // TODO Update progress bar
      task.on('state_changed',
        (snapshot) => { },
        (err) => { reject(err); },
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
              update.push(newImage);
              console.log('=>', update);
              setImageUrlArray(update);
              resolve(task);
            });
        }
      );
    })).then(() => {
      console.log('then', update, imageUrlArray);
      return update;
    });
  };

  const finalizePost = (imageArray) => {
    const newPost = {
      author: { name, id: userId, photoUrl },
      date: now,
      text: newText,
      images: imageArray || null,
      likes: [], // start out with an empty array
      comments: [], // and empty comments
    };
    console.log('finalizing post', newPost);
    handleNewPost(newPost);
    // handle clean up
    setNewText(null);
    setNewFiles(null);
    textref.current.value = null;
    filesref.current.value = null;
  };


  const handleSubmitPost = async () => {
    // files will be in a File List array, so convert them first to a normal array
    // as long as we actually select files
    if (newFiles) {
      // upload each to storage with promises
      const data = await Promise.all(Array.from(newFiles).map(uploadImageAsPromise));
      const merged = [].concat(...data);

      finalizePost(merged);
    } else {
      finalizePost();
    }
  };


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
                  <img className="UploadImage"src={URL.createObjectURL(file)} alt="thumbnail"/>
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
