import React from 'react'

import { Grid, Typography, Button } from '@material-ui/core'

import { Add as AddIcon, PersonAdd as PersonAddIcon } from '@material-ui/icons'
import { headerStyles } from './styles'

export const Header = React.memo(function Header({
  handleOpenPostModal,
  handleOpenUserModal,
}) {
  const classes = headerStyles()
  return (
    <Grid container justify="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h2" gutterBottom align="center">
          Timeline
        </Typography>
      </Grid>
      <Grid item className={classes.topButtons}>
        <Button
          className={classes.actionButton}
          onClick={handleOpenUserModal}
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<PersonAddIcon />}
        >
          Include User
        </Button>
        <Button
          className={classes.actionButton}
          onClick={handleOpenPostModal}
          variant="contained"
          color="primary"
          size="medium"
          startIcon={<AddIcon />}
        >
          Create Post
        </Button>
      </Grid>
    </Grid>
  )
})
