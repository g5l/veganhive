import React from 'react'

import {
  Grid,
  Modal,
  Button,
  Backdrop,
  Fade,
  TextField,
} from '@material-ui/core'

import { createUserStyles } from './styles'

export const CreateUser = React.memo(function CreateUser({
  isOpen,
  handleSubmit,
  handleClose,
  setName,
}) {
  const classes = createUserStyles()

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
          <h2 id="transition-modal-title">Create User</h2>
          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={1}>
              <Grid item md={12}>
                <TextField
                  label="Name"
                  required
                  fullWidth={true}
                  id="standard-required"
                  onChange={(e) => setName(e.target.value)}
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
