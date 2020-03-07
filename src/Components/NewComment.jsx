import React, { useState, useRef } from 'react';
import moment from 'moment';

const NewComment = ({ loggedInUser, userId, handleNewComment }) => {
  const [newText, setNewText] = useState(null);

  const textref = useRef(null);
  const { photoUrl, name } = loggedInUser;
  const now = moment().toDate().getTime();


  const handleSubmitComment = async () => {
    // set up key post data
    const newPost = {
      author: { name, id: userId, photoUrl },
      date: now,
      text: newText
    };

    // push it up to parent
    handleNewComment(newPost);
    // handle clean up
    setNewText(null);
    textref.current.value = null;
  };


  return (

    <div className="Flex JustifyCenter MobileRowToCol FullSize">

      <div className="HideMobile">
        <img alt="profile pic" className="ImgFrameCircle MarginHSmall" src={photoUrl} />
      </div>

      <textarea
        className="HideMobile FullSize"
        ref={textref}
        placeholder="What would you like to add to this post?"
        name="newPost"
        onChange={(e) => setNewText(e.target.value)}
      />

      <textarea
        className="ShowMobile"
        ref={textref}
        placeholder="What would you like to add to this post?"
        name="newPost"
        onChange={(e) => setNewText(e.target.value)}
      />

      <button type="button" onClick={handleSubmitComment}>Submit</button>

    </div>


  );
};
export default NewComment;
