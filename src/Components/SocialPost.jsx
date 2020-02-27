import React, { useState, useRef } from 'react';
import moment from 'moment';
import LightBox from './LightBox';
import DropDown from './DropDown/DropDown';

import SingleComment from './SingleComment';
import NewComment from './NewComment';
import { Accept, Cancel, Like, DecorFlat, Edit } from '../images';


const SocialPost = ({ post, userId, loggedInUser, index, updatePost }) => {
  const [like, setLike] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [updatedComments, setUpdatedComments] = useState(post.comments || []);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(post.text);
  const [editText, setEditText] = useState(post.text);
  const [deleted, setDeleted] = useState(false);
  const { author: { photoUrl, name }, images, date } = post;

  const textref = useRef(null);

  const handlePostUpdate = () => {
    // send up the whole updated social post
    const updatedPost = { ...post, text: editText, comments: updatedComments };
    updatePost(updatedPost, deleted, index);
  };


  const handleNewComment = (comment) => {
    // grab current set of comments for this post
    const update = [...updatedComments, comment];
    setUpdatedComments(update);
    // since we've added a new comment, we want to make sure this gets out to the DB
    handlePostUpdate();
  };

  const myMessage = post.author.id === userId;

  // take care of editing
  const handleFinalEdit = (accepted) => {
    // if we're not deleting the post
    if (!deleted) {
      // and we've hit accept
      if (accepted) {
        // update the text
        setNewText(editText);
        // and push the update
        handlePostUpdate();
      }
      // regardless if we hit accept or cancel, turn off editing
      setEdit(false);
    } else {
      // we are trying to delete the post
      if (accepted) {
        // if we accepted the removal, then push it up
        handlePostUpdate();
      }
      // regardless, reset deleting
      setDeleted(false);
    }
  };


  return (
    <div className={'LightPinkBorder MaxSocial MinSocial MarginBottom SeeThru BoxShadow'} >
      {/* Post Author and date */}
      <div className="Flex AlignItems LightPinkFill PaddingLite SocialPostHeader">
        <div className="CursiveFont MediumFont MarginHSmall">{name}</div>

      </div>

      {/* Post Data */}
      <div className="Flex AlignItems Buffer  SocialMessage">
        {/* Author Pic */}
        <img alt="profile pic" className="ImgFrame" src={photoUrl} />


        {/* Post Message IF NOT EDITING */}
        {!edit ? (
          <div className="FullSize TextLeft RoundBorder Padding" >
            {newText}
          </div>
        ) : (
          <>
            {!deleted ? (
              <textarea
                ref={textref}
                className="FullWidth"
                value={editText}
                name="newPost"
                rows='2'
                cols='80'
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <>
                <div className="FullSize TextLeft RoundBorder Padding" >
                  {newText}
                </div>

              </>
            )}

          </>
        )}


        {/* Only if this is our message can we edit it */}
        {myMessage
        && <div className="cursor" >
          {(!edit && !deleted) ? (
            <DropDown
              data={[{ name: 'Edit', method: setEdit }, { name: 'Delete', method: setDeleted }]}
              transparent
              icon={Edit}
              rounded
            />
          ) : (
            <>

              {/* If we're editing show these buttons */}
              <div className="Flex">
                {deleted && <div >Delete the Post?</div>}
                <button title={deleted ? 'Remove the post' : 'Submit Edit'} className="transparent" type='button' onClick={() => handleFinalEdit(true)}><img src={Accept} alt="accept change"/></button>
                <button title={deleted ? 'Cancel Removal' : 'Cancel Edit'} className="transparent" type='button' onClick={() => handleFinalEdit(false)}><img src={Cancel} alt="deny change"/></button>
              </div>

            </>
          )}

        </div>
        }

        {!deleted
        && <div style={{ fontSize: 14, color: 'grey' }}>{moment(date).fromNow()}</div>

        }


      </div>
      {/* Pictures if any */}
      <div className="margin-bottom">
        <LightBox
          images={images}
        />
      </div>

      {/* Like or Comment Area */}
      <div className=" Flex AlignItems JustifyCenter">
        <button className='SocialActionBtn Flex AlignItems' type="button" onClick={() => setLike(!like)}>
          <img className={`${like ? 'filter-pink' : 'filter-grey'}`} src={Like} alt="like button"/> Like
        </button>

        <button className='SocialActionBtn' type="button" onClick={() => setShowComments(!showComments)}>
          {`${showComments ? 'Hide Comments' : 'Comment'}`}
        </button>
      </div>


      {/* Comments if any, and if shown */}
      {showComments
        ? (<>
          {updatedComments.length > 0
            ? (
              <div className="SimpleBorderSmall Flex AlignItems ">
                <div className="Flex Col FullSize">
                  {updatedComments.map((comment) => <SingleComment key={comment.date} comment={comment}/>)}
                  <NewComment userId={userId} loggedInUser={loggedInUser} handleNewComment={handleNewComment}/>
                </div>
              </div>
            )
            : (<NewComment userId={userId} loggedInUser={loggedInUser} handleNewComment={handleNewComment}/>)}
        </>) : (
          <div className="Flex JustifyCenter">
            <img src={DecorFlat} alt="decorative" className='filter-green' style={{ width: 200, height: 'auto' }} />
          </div>
        )
      }


    </div>
  );
};
export default SocialPost;
