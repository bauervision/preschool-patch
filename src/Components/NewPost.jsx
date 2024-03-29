import React, { useState, useRef } from 'react';
import moment from 'moment';

import { storage } from '../config';
import { Corner, UploadPic } from '../images';

const NewPost = ({ loggedInUser, userId, handleNewPost }) => {
  const [newText, setNewText] = useState(null);
  const [newFiles, setNewFiles] = useState(null);
  const [thumbArray, setThumbArray] = useState([]);
  const [imageUrlArray, setImageUrlArray] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadPics, setUploadPics] = useState(false);


  const textref = useRef(null);
  const filesref = useRef(null);

  const { photoUrl, name } = loggedInUser;
  const now = moment().toDate().getTime();

  // upload the file to storage and grab the download link
  const imageUpload = (file) => {
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
              setImageUrlArray(update);
              resolve(task);
            });
        }
      );
    })).then(() => {
      // now that this single image promise has completed, return the updated array to pass to finalizePost
      return update;
    });
  };

  const finalizePost = (imageArray) => {
    // set up key post data
    const newPost = {
      author: { name, id: userId, photoUrl },
      date: now,
      text: newText,
      images: imageArray || null
    };

    // push it up to parent
    handleNewPost(newPost);
    setUploading(false);
    // handle clean up
    setNewText(null);
    setNewFiles(null);
    textref.current.value = null;
    if (filesref.current) {
      filesref.current.value = null;
    }
  };


  const handleSubmitPost = async () => {
    // as long as we actually select files
    if (newFiles) {
      // trigger the loader
      setUploading(true);

      /* files will be in a File List array, so convert them first to a normal array and then
      upload each to storage with promises*/
      const data = await Promise.all(Array.from(newFiles).map(imageUpload));
      // because it is an array of promises, image array data will be inside another array, so merge it into 1
      const merged = [].concat(...data);
      // combine the image data with the rest of the post data and submit it
      finalizePost(merged);
    } else {
      // we didnt select files, so just post
      finalizePost();
    }
  };


  // this simple component will handle when the user changes their mind about a pic to upload, and removes it
  const HoverableThumbnail = ({ file, index }) => {
    const [hover, setHover] = useState(false);

    const handleRemove = () => {
      // grab current list of thumbnails to upload
      const updatedList = newFiles;
      updatedList.splice(index, 1);
      setNewFiles(updatedList);
      // and update the thumbs
      const updatedThumbs = [...thumbArray];
      updatedThumbs.splice(index, 1);
      setThumbArray(updatedThumbs);

      // TODO clean up the files loaded in textref
      // console.log(textref.current.value);
    };

    return (
      <div key={file.name} className={'UploadImageRow'} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {hover && <span className="RemoveUpload Flex AlignItems JustifyCenter">
          <button type='button' title="Remove this image from the upload" onClick={handleRemove}>X</button></span>}
        <img className="UploadImage"src={file} alt="thumbnail"/>
      </div>
    );
  };


  const handleNewFiles = (files) => {
    const arrayFiles = Array.from(files);
    const thumbs = arrayFiles.map((file) => ({ thumb: URL.createObjectURL(file) }));
    setNewFiles(arrayFiles);
    setThumbArray(thumbs);
  };

  return (
    <div className="NewPost" >

      {/* Picture and textarea */}
      <div className="Flex JustifyCenter AlignItems FullSize">
        <div className=" HideMobile MarginHSmall">
          <img alt="profile pic" className="ImgFrameReversed" src={photoUrl} />
        </div>

        <textarea
          ref={textref}
          placeholder="What would you like to say about today?"
          name="newPost"
          className="FullSizeMobile"
          onChange={(e) => setNewText(e.target.value)}
        />

        {/* Far Right section for submit and optional pic uploader: Hidden on Mobile */}
        {!uploadPics && (

          <div className="Flex Col AlignItems JustifyCenter Quarter HideMobile">
            <button
              type='button'
              onClick={() => setUploadPics(true)}
              className="transparent filter-green NoMargin NoPadding"
              title="Upload pictures with this post?"
            >
              <img src={UploadPic} alt="pic uploader"/>
            </button>

            <button type="button" onClick={handleSubmitPost}className="NoMargin" >Post</button>
          </div>

        )}
      </div>

      {/* File input, Thumbnails and submit button */}
      {uploadPics && (
        <div className="Flex Col JustifyCenter AlignItems PaddingLite">
          <div className="TextLeft FullSize Flex JustifyCenter Col">
            <span className="InputTextLabel HideMobile" style={{ fontSize: 14, color: 'grey', marginLeft: 10 }}>Limit of 10 Images</span>
            <span className="InputTextLabel ShowMobile" style={{ fontSize: 12, color: 'grey', marginLeft: 10 }}>Limit 10</span>
            <input
              ref={filesref}
              className="InputStyle"
              placeholder="Select a File"
              type="file"
              name="files"
              multiple
              onChange={(e) => handleNewFiles(e.target.files)}
            />
          </div>

          {/* Thumbnail images prior to upload */}
          { newFiles && <div className="UploadImageContainer">
            { thumbArray.map((file, index) => (
              <HoverableThumbnail key={index.toString()} file={file.thumb} index={index}/>))}
          </div>
          }

        </div>
      )}

      {/* Show this section on Mobile as it displays in a Row underneath the textarea */}
      {!uploadPics && (
        <div className="AlignItems ShowMobileFlex MarginSmall">
          <button
            type='button'
            onClick={() => setUploadPics(true)}
            className="transparent filter-pink NoMargin NoPadding"
            title="Upload pictures with this post?"
          >
            <img src={UploadPic} alt="pic uploader"/>
          </button>
          <button type="button" onClick={handleSubmitPost}className="NoMargin" >Post</button>
        </div>
      )}

      {uploadPics && (
        <>
          {!uploading ? (<button type="button" style={{ margin: 0 }} onClick={handleSubmitPost}>Post</button>) : (
            <div className="Flex Col JustifyCenter AlignItems">
              <img src={Corner} alt='corner' className='filter-green Rotate Alert' style={{ width: 50, height: 'auto', zIndex: 0, paddingRight: 10 }} />
            </div>
          )}
        </>
      )}


    </div>

  );
};
export default NewPost;
