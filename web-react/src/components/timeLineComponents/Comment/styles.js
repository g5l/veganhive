import { makeStyles } from '@material-ui/core/styles'

export const commentStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  comment: {
    marginBottom: 10,
  },
}))
