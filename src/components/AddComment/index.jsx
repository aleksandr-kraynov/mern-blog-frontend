import React, { useEffect } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { selectComments, createComments } from "../../redux/slices/comments";
import { selectUser } from "../../redux/slices/auth";

export const FormComments = ({postId}) => {
  const dispatch = useDispatch();

  const { status } = useSelector(selectComments);
  const data = useSelector(selectUser);

  const isLoaded = status === 'loaded';

  const {
      register,
      handleSubmit,
      resetField
  } = useForm({
      defaultValues: {
          text: '',
      }
  })

  const onSubmit = (data) => {
    dispatch(createComments({postId, params: data}));
  }

  useEffect(() => {
    if(isLoaded) {
        resetField('text', { keepError: true })
    }
  }, [isLoaded, resetField])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src={data?.avatarUrl}
        />
        <div className={styles.form}>
          <TextField
            {...register('text')}
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button
            variant="contained"
            type="submit"
          >
            Отправить
            </Button>
        </div>
      </div>
    </form>
  );
};
