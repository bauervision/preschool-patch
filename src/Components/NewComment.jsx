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

    <div className="Flex AlignStart FullSize">
      <div>
        <img alt="profile pic" className="ImgFrameCircle MarginHSmall" src={photoUrl} />
      </div>

      <textarea
        ref={textref}
        className="FullWidth"
        placeholder="What would you like to add to this post?"
        name="newPost"
        onChange={(e) => setNewText(e.target.value)}
      />

      <button className="Quarter" type="button" onClick={handleSubmitComment}>Submit</button>

    </div>


  );
};
export default NewComment;
