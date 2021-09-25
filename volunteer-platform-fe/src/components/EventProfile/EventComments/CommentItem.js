import React, { useEffect, useState } from 'react';
import { Comment, Avatar, Icon } from 'antd';
import Editor from './Editor';
import PropTypes from 'prop-types';
import moment from 'moment';
import { getFileUrl, deleteComment } from '../../../actions';
import { useStateValue } from '../../../hooks/useStateValue';

export const CommentItem = ({
  name,
  usersUid,
  avatarPath,
  comment,
  addCommentToComment,
  commentId,
  isLoading,
  allowReply,
  replies,
  createdAt,
  event,
}) => {
  const [{ auth }, dispatch] = useStateValue();
  const [reply, setReply] = useState(false);
  const [avatUrl, setUrl] = useState('');

  useEffect(() => {
    if (avatarPath) {
      getFileUrl(avatarPath).then(url => {
        setUrl(url);
      });
    }
  }, avatarPath);

  const handleSubmit = values => {
    addCommentToComment(values, { name, avatarPath, comment, commentId });
  };

  const handleDeleteComment = () => {
    deleteComment(commentId, event, dispatch);
  };

  const getActions = () => {
    const actions = [];
    if (auth.googleAuthUser && allowReply) {
      actions.push(
        <span onClick={() => setReply(!reply)} key="comment-nested-reply-to">
          Reply to
        </span>
      );
    }

    if (auth.googleAuthUser && usersUid === auth.googleAuthUser.uid) {
      actions.push(
        <span onClick={handleDeleteComment}>
          <Icon type="delete" />
        </span>
      );
    }
    return actions;
  };

  return (
    <div>
      <Comment
        actions={getActions()}
        author={
          <a>
            {name && name} {moment.unix(createdAt).format('LLL')}
          </a>
        }
        avatar={<Avatar src={avatUrl} alt={name} />}
        content={<p>{comment}</p>}
      >
        {replies &&
          replies.map(reply => {
            return (
              <CommentItem
                allowReply={false}
                event={event}
                isLoading={false}
                {...reply}
              />
            );
          })}
        {reply && <Editor onSubmit={handleSubmit} submitting={isLoading} />}
      </Comment>
    </div>
  );
};

CommentItem.propTypes = {
  name: PropTypes.string.isRequired,
  avatarPath: PropTypes.string,
  comment: PropTypes.string.isRequired,
  addCommentToComment: PropTypes.func,
  commentId: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
  allowReply: PropTypes.bool.isRequired,
  replies: PropTypes.arrayOf(PropTypes.object),
  event: PropTypes.object.isRequired,
};
export default CommentItem;
