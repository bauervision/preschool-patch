import React, { useState, useRef } from 'react';
import moment from 'moment';
import LightBox from './LightBox';
import DropDown from './DropDown/DropDown';

import SingleComment from './SingleComment';
import NewComment from './NewComment';
import { Accept, Cancel, Like, DecorFlat, Edit } from '../images';


const SocialPost = ({ post, userId, loggedInUser, index, updatePost }) => {
  // default like to whether our name is found within the likes array
  const [like, setLike] = useState(post.likes?.some((elem) => elem === loggedInUser.name || false));
  const [showComments, setShowComments] = useState(false);
  const [updatedComments, setUpdatedComments] = useState(post.comments || []);
  const [updatedLikes, setUpdatedLikes] = useState(post.likes || []);
  const [edit, setEdit] = useState(false);
  const [newText, setNewText] = useState(post.text);
  const [editText, setEditText] = useState(post.text);
  const [deleted, setDeleted] = useState(false);
  const { author: { photoUrl, name }, images, date } = post;

  const textref = useRef(null);

  const handlePostUpdate = (commentUpdate, likeUpdate) => {
    // if we pass either of the above updates directly, then set that otherwise use what state has
    const updatedPost = { ...post, text: editText, comments: commentUpdate || updatedComments, likes: likeUpdate || updatedLikes };
    // send up the whole updated social post
    updatePost(updatedPost, deleted, index);
  };

  const handleNewLike = () => {
    // get current state
    const currentLikes = [...updatedLikes];
    // have we have already liked it?
    const foundIndex = currentLikes.findIndex((elem) => elem === loggedInUser.name);
    if (foundIndex !== -1) {
      // found index of our name in the likes, so remove it
      currentLikes.splice(foundIndex, 1);
    } else {
      // this is a new like for us, push our name in the list
      currentLikes.push(loggedInUser.name);
    }

    setLike(!like);
    setUpdatedLikes(currentLikes);
    handlePostUpdate(null, currentLikes);
  };

  const handleNewComment = (comment) => {
    // grab current set of comments for this post
    const update = [...updatedComments, comment];
    setUpdatedComments(update);
    // since we've added a new comment, we want to make sure this gets out to the DB
    handlePostUpdate(update, null);
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

  // handle conditional render strings
  const commentPlurality = updatedComments.length > 1 ? 'comments' : 'comment';
  const commentStatus = updatedComments.length > 0 ? `(${updatedComments.length} ${commentPlurality})` : 'No Comments yet';
  const likePlurality = updatedLikes.length > 1 ? 'likes' : 'like';
  const likeStatus = updatedLikes.length > 0 && `(${updatedLikes.length} ${likePlurality})`;
  // replace our name with You
  const ourNameIndex = updatedLikes.findIndex((elem) => elem === loggedInUser.name);
  const displayLikedNames = [...updatedLikes];
  displayLikedNames[ourNameIndex] = 'You';
  const likedNames = displayLikedNames.length > 0 ? displayLikedNames.join() : 'Be the first!';

  // finally, if the only like is ours, don't show the status
  const showLikeStatus = (updatedLikes.length === 1) && (ourNameIndex !== 0);

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

          {/* If we are currently editing or trying to delete, dont show the dropdown icon */}
          {(!edit && !deleted) ? (
            <DropDown
              data={[{ name: 'Edit', method: setEdit }, { name: 'Delete', method: setDeleted }]}
              transparent
              icon={Edit}
              rounded
            />
          ) : (
            <>

              {/* If we're editing or deleting show these buttons */}
              <div className="Flex">
                {deleted && <div >Delete the Post?</div>}
                <button title={deleted ? 'Remove the post' : 'Submit Edit'} className="transparent" type='button' onClick={() => handleFinalEdit(true)}><img src={Accept} alt="accept change"/></button>
                <button title={deleted ? 'Cancel Removal' : 'Cancel Edit'} className="transparent" type='button' onClick={() => handleFinalEdit(false)}><img src={Cancel} alt="deny change"/></button>
              </div>

            </>
          )}

        </div>
        }

        {/* If we're deleting, who cares about seeing the date */}
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

        {/* Like Button */}
        <button className='SocialActionBtn Flex AlignItems' type="button" onClick={() => handleNewLike(!like)} >
          <img className={`${like ? 'filter-pink' : 'filter-grey'}`} src={Like} alt="like button"/> Like
        </button>
        {showLikeStatus
        && <div className="cursor" title={likedNames} style={{ fontSize: 14, color: 'grey' }}>{likeStatus}</div>
        }

        {/* Show Comments */}
        <button className='SocialActionBtn' type="button" onClick={() => setShowComments(!showComments)}>
          {`${showComments ? 'Hide Comments' : 'Comment'}`}
        </button>

        {/* Only show this if we're not already looking at the comments' */}
        {!showComments
        && <div style={{ fontSize: 14, color: 'grey' }}>{commentStatus}</div>}
      </div>


      {/* Comments if any, and if shown */}
      {showComments
        ? (<>
          {updatedComments.length > 0
            ? (
              <div className="SimpleBorderSmall Flex AlignItems Buffer">
                <div className="Flex Col FullSize">
                  {updatedComments.map((comment) => <SingleComment key={comment.date} comment={comment}/>)}
                  <NewComment userId={userId} loggedInUser={loggedInUser} handleNewComment={handleNewComment}/>
                </div>
              </div>
            )
            : (
              <div className="SimpleBorderSmall Flex AlignItems Buffer">
                <div className="Flex Col FullSize">
                  <NewComment userId={userId} loggedInUser={loggedInUser} handleNewComment={handleNewComment}/>
                </div>
              </div>)}
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
