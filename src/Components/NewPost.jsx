import React, { useState } from 'react';
import moment from 'moment';

const NewPost = ({ photoUrl, userId, handleNewPost }) => {
  const [newText, setNewText] = useState(null);
  const [newFiles, setNewFiles] = useState(null);

  const now = moment().toDate().getTime();

  const handleSubmitPost = () => {
    const newPost = {
      author: userId,
      datePosted: now,
      text: newText,
      files: newFiles,
      likes: [], // start out with an empty array
      comments: [], // and empty comments
    };

    handleNewPost(newPost);
    // userId will be a part of the file path so grab it first
    // const UID = f.auth().currentUser.uid;

    // const uploadTask = storage
    //   .ref(`public/${UID}/profilePic/${file.name}`)
    //   .put(file);

    // uploadTask.on(
    //   'state_changed',
    //   (snapshot) => {
    //     // progress
    //     const progress = Math.round(
    //       (snapshot.bytesTransferred / snapshot.totalBytes) * 100
    //     );
    //     console.log(progress);
    //     // setUploadProgress(progress);
    //   },
    //   (error) => {
    //     // error
    //     console.log(error);
    //   },
    //   () => {
    //     // complete
    //     storage
    //       .ref(`public/${UID}/profilePic/`)
    //       .child(file.name)
    //       .getDownloadURL()
    //       .then((url) => {
    //         setPhotoUrl(url);
    //       });
    //   }
    // );
  };

  return (
    <div
      className="Flex Col JustifyCenter ThreeQuarters MarginBottom">


      <div className="Flex AlignItems JustifyCenter">
        <img alt="profile pic" className="ImgFrameReversed MarginHSmall" src={photoUrl} />
        <div className="Col ThreeQuarters">
          <textarea
            className="FullWidth"
            placeholder="What would you like to say about today?"
            name="newPost"
            rows='2'
            cols='80'
            onChange={(e) => setNewText(e.target.value)}
            value={newText}
          />
          <div className="Flex  Around">

            <input
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
