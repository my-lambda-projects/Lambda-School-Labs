import { List } from 'antd';
import CommentItem from './CommentItem';
import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CommentList = ({
  comments,
  addCommentToComment,
  isLoading,
  event,
}) => {
  return (
    <StyledCommentList>
      <h3>Event Comments</h3>
      {comments && comments.length > 0 ? (
        <List
          dataSource={comments}
          header={`${comments.length} ${
            comments.length > 1 ? 'comments' : 'comment'
          }`}
          itemLayout="horizontal"
          renderItem={props => (
            <CommentItem
              {...props}
              event={event}
              allowReply={true}
              addCommentToComment={addCommentToComment}
              isLoading={isLoading}
            />
          )}
        />
      ) : (
        <h5>There are no comments at this time.</h5>
      )}
    </StyledCommentList>
  );
};

const StyledCommentList = styled.div`
  width: 80%;
  margin: 0 auto;
`;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  addCommentToComment: PropTypes.func.isRequired,
  event: PropTypes.object.isRequired,
};

export default CommentList;
