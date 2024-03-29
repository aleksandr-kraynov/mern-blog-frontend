import React from "react";
import styles from "./SideBlock.module.scss";
import Paper from "@mui/material/Paper";

export const SideBlock = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      {children}
    </Paper>
  );
};
