import React from 'react'

import {
  Typography,
  Divider,
  ListItem,
  List,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { commentStyles } from './styles'

export const Comment = React.memo(function Comment() {
  const classes = commentStyles()

  return (
    <List className={classes.root}>
      <TextField
        label="Write a comment"
        multiline
        rows={2}
        variant="outlined"
        fullWidth={true}
      />
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemText
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Ali Connors
              </Typography>
              {" — I'll be in your neighborhood doing errands this…"}
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  )
})
