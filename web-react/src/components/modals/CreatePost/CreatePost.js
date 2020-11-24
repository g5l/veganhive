import React from 'react'

import {
  Grid,
  Modal,
  Button,
  Backdrop,
  Fade,
  TextField,
} from '@material-ui/core'

import { createPostStyles } from './styles'

export const CreatePost = React.memo(function CreatePost({
  isOpen,
  handleSubmit,
  handleClose,
  setDescription,
  setTitle,
}) {
  const classes = createPostStyles()

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">Create Post</h2>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <TextField
                  label="Title"
                  required
                  fullWidth={true}
                  id="standard-required"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item md={12}>
                <TextField
                  label="Description"
                  required
                  multiline
                  fullWidth={true}
                  rows={4}
                  id="standard-required"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item md={12}>
                <Button type="submit" variant="contained" color="primary">
                  Create
                </Button>
              </Grid>
            </Grid>
          </form>
        </div>
      </Fade>
    </Modal>
  )
})
