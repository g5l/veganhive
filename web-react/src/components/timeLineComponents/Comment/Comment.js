import React from 'react'

import {
  Grid,
  Button,
  Divider,
  ListItem,
  List,
  ListItemText,
  TextField,
} from '@material-ui/core'

import { commentStyles } from './styles'

export const Comment = React.memo(function Comment({
  comments,
  handleAddComment,
  setComment,
  postId,
}) {
  const classes = commentStyles()

  return (
    <List className={classes.root}>
      <form
        noValidate
        autoComplete="off"
        onSubmit={(e) => handleAddComment(e, postId)}
      >
        <Grid
          container
          spacing={1}
          justify="center"
          alignItems="center"
          className={classes.comment}
        >
          <Grid item md={10}>
            <TextField
              label="Write a comment"
              multiline
              rows={2}
              variant="outlined"
              fullWidth={true}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item md={2}>
            <Button type="submit" variant="contained" color="primary">
              Add!
            </Button>
          </Grid>
        </Grid>
      </form>
      {comments.map((comment, index) => (
        <Grid key={index} item md={12}>
          <Divider variant="fullWidth" component="li" />
          <ListItem alignItems="flex-start">
            <ListItemText
              secondary={<React.Fragment>{comment.comment}</React.Fragment>}
            />
          </ListItem>
        </Grid>
      ))}
    </List>
  )
})
