import { makeStyles } from '@material-ui/core/styles'

import { red } from '@material-ui/core/colors'

export const postStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}))
