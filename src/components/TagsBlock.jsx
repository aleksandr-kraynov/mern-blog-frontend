import React from "react";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { SideBlock } from "./SideBlock";
import { Autocomplete, TextField } from "@mui/material";

export const TagsBlock = ({ items, handleSelectTag }) => {
  return (
    <SideBlock>
      <List>
        <ListItem>
          <Autocomplete
            multiple
            limitTags={2}
            options={items}
            getOptionLabel={(option) => option}
            onChange={handleSelectTag}
            defaultValue={[]}
            renderInput={(params) => (
              <TextField {...params} label="Тэги"/>
            )}
            sx={{ width: '100%' }}
          />
        </ListItem>
      </List>
    </SideBlock>
  );
};
