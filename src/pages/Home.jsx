import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components/Post";
import { TagsBlock } from "../components/TagsBlock";
import { CommentsBlock } from "../components/CommentsBlock";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { format } from "date-fns";
import { fetchLastComments, selectComments } from "../redux/slices/comments";

export const Home = () => {
  const dispatch = useDispatch();
  const userData = useSelector(state => state.auth.data);
  const { posts, tags } = useSelector(state => state.posts);
  const { lastComments, status } = useSelector(selectComments);
  const [ category, setCategory ] = useState('new')
  const [ selectTags, setSelectTags ] = useState([])

  const handleCategory = (_, category) => {
    setCategory(category);
    dispatch(fetchPosts({category, tags: selectTags}))
  }

  const handleSelectTag = (_, tags) => {
    setSelectTags(tags);
    dispatch(fetchPosts({category, tags}))
  }

  const isPostsLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isCommentsLoading = status === "loading";

  useEffect(() => {
    dispatch(fetchPosts({category, selectTags}))
    dispatch(fetchTags());
    dispatch(fetchLastComments('last'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={category} onChange={handleCategory} aria-label='basic tabs example'>
        <Tab label='Новые' value='new'/>
        <Tab label='Популярные' value='popular'/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostsLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostsLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={obj._id}
                id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""}
                user={obj.user}
                createdAt={format(obj.createdAt, 'dd.MM.yyyy')}
                viewsCount={obj.viewsCount}
                commentsCount={obj.commentsCount}
                tags={obj.tags}
                rating={obj.rating}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
            tag={selectTags}
            handleSelectTag={handleSelectTag}
          />
          <CommentsBlock items={lastComments} isLoading={isCommentsLoading}/>
        </Grid>
      </Grid>
    </>
  );
};
