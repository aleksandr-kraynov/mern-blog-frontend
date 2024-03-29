import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { Post } from '../components/Post';
import { FormComments } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { selectComments, fetchComments } from '../redux/slices/comments';
import { format } from 'date-fns';
import { fetchPost, selectPost } from '../redux/slices/posts';

export const FullPost = () => {

  const { id } = useParams();

  const dispatch = useDispatch();

  const comments = useSelector(selectComments);
  const { items, status } = useSelector(selectPost);

  const isLoading = status === 'loading';

  useEffect(() => {
    dispatch(fetchPost(id))
    dispatch(fetchComments(id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {Object.keys(items).length !== 0 &&
        <Post
          id={items._id}
          title={items.title}
          imageUrl={items.imageUrl ? `http://localhost:4444${items.imageUrl}` : ''}
          user={items.user}
          createdAt={items.createdAt && format(items.createdAt, 'dd.MM.yyyy')}
          viewsCount={items.viewsCount}
          commentsCount={comments ? comments.items.length : '0'}
          tags={items.tags}
          rating={items.rating}
          isLoading={isLoading}
          isFullPost>
          <ReactMarkdown children={items.text} />
        </Post>
      }
      <CommentsBlock
        items={comments.items}
        postId={id}
        isLoading={false}>
      </CommentsBlock>
      <FormComments
        postId={id}
      />
    </>
  );
};
