import React from "react";

import { SideBlock } from "./SideBlock";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Skeleton from "@mui/material/Skeleton";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { Box, Grid, IconButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, fetchComments } from "../redux/slices/comments";
import { selectUser } from "../redux/slices/auth";
import { format } from "date-fns";

export const CommentsBlock = ({ items, children, isLoading = true, postId }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const isAuthorComment = (comment) => {
    return user?._id === comment.user._id
  }

  const handleDeleteComment = async (id) => {
    await dispatch(deleteComment(id));
    await dispatch(fetchComments(postId));
  }

  return (
    <SideBlock title="Комментарии">
      <List>
        {(isLoading ? [...Array(5)] : items).map((obj, index) => (
          <React.Fragment key={index}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                {isLoading ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />
                )}
              </ListItemAvatar>
              {isLoading ? (
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <Skeleton variant="text" height={25} width={120} />
                  <Skeleton variant="text" height={18} width={230} />
                </div>
              ) : (
                <Box width='100%'>
                  <ListItemText
                    primary={obj.user.fullName}
                    secondary={obj.text}
                  />
                  {isAuthorComment(obj) && postId &&
                  <>
                    <IconButton
                      size='small'
                    >
                      <EditOutlinedIcon />
                    </IconButton>
                    <IconButton
                      size='small'
                      edge='end'
                      onClick={() => handleDeleteComment(obj._id)}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
                  </>
                }
                </Box>
              )}
              <Grid>
                <ListItemText
                  secondary={obj?.createdAt && format(obj.createdAt, 'dd.MM.yyyy')}
                />
              </Grid>
            </ListItem>
            <Divider variant="inset" component="li" />
          </React.Fragment>
        ))}
      </List>
      {children}
    </SideBlock>
  );
};
