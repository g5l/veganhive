import React from 'react'

import { useMutation, useQuery, gql } from '@apollo/client'

import clsx from 'clsx'

import { makeStyles } from '@material-ui/core/styles'

import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  Box,
  Link as MUILink,
  IconButton,
  Modal,
  Button,
  Collapse,
  Backdrop,
  Fade,
  TextField,
  CircularProgress,
} from '@material-ui/core'

import {
  Favorite as FavoriteIcon,
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  PersonAdd as PersonAddIcon,
} from '@material-ui/icons'

import { red } from '@material-ui/core/colors'

// import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: red[500],
  },
  actionButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    width: '100%',
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topButtons: {
    display: 'flex',
    flexDirection: 'column',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
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
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" target="_blank" href="https://www.g5l.com.br/">
        Gabriel
      </MUILink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const GET_POSTS = gql`
  {
    Post {
      postId
      title
      description
      numberOfLikes
    }
  }
`

const ADD_POST = gql`
  mutation CreatePost(
    $title: String!
    $description: String!
    $numberOfLikes: Int!
  ) {
    CreatePost(
      title: $title
      description: $description
      numberOfLikes: $numberOfLikes
    ) {
      title
      description
      numberOfLikes
    }
  }
`

const INCREMENT_LIKE = gql`
  mutation incrementLike($id: ID!, $likes: Int!) {
    UpdatePost(postId: $id, numberOfLikes: $likes) {
      postId
      numberOfLikes
    }
  }
`

export default function App() {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState()
  const [description, setDescription] = React.useState()
  const [expanded, setExpanded] = React.useState(false)

  const [addPost] = useMutation(ADD_POST)
  const [addLike] = useMutation(INCREMENT_LIKE)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addPost({
      variables: { title, description, numberOfLikes: 0 },
      refetchQueries: [{ query: GET_POSTS }],
    })
  }

  const incrementLike = ({ id, likes }) => {
    likes = likes + 1

    addLike({
      variables: { id, likes },
      refetchQueries: [{ query: GET_POSTS }],
    })
  }

  const { error, loading, data: postData } = useQuery(GET_POSTS)

  if (error) return <p>Error</p>
  if (loading) {
    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
      </Backdrop>
    )
  }

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h2" gutterBottom align="center">
            Timeline
          </Typography>
        </Grid>
        <Grid item className={classes.topButtons}>
          <Button
            className={classes.actionButton}
            onClick={handleOpen}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<PersonAddIcon />}
          >
            Include User
          </Button>
          <Button
            className={classes.actionButton}
            onClick={handleOpen}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Create Post
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={4}>
        {postData.Post.map((post, index) => (
          <Grid key={index} item md={6} sm={1} className={classes.card}>
            <Card>
              <CardHeader
                avatar={
                  <Avatar aria-label="recipe" className={classes.avatar}>
                    R
                  </Avatar>
                }
                title={post.title}
                subheader="September 14, 2016"
              />
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton
                  onClick={() =>
                    incrementLike({
                      id: post.postId,
                      likes: post.numberOfLikes,
                    })
                  }
                  aria-label="add to favorites"
                >
                  <FavoriteIcon />
                </IconButton>
                {post.numberOfLikes}
                <IconButton
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </IconButton>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                  <Typography paragraph>Method:</Typography>
                  <Typography paragraph>
                    Heat 1/2 cup of the broth in a pot until simmering, add
                    saffron and set aside for 10 minutes.
                  </Typography>
                  <Typography paragraph>
                    Heat oil in a (14- to 16-inch) paella pan or a large, deep
                    skillet over medium-high heat. Add chicken, shrimp and
                    chorizo, and cook, stirring occasionally until lightly
                    browned, 6 to 8 minutes. Transfer shrimp to a large plate
                    and set aside, leaving chicken and chorizo in the pan. Add
                    pimentón, bay leaves, garlic, tomatoes, onion, salt and
                    pepper, and cook, stirring often until thickened and
                    fragrant, about 10 minutes. Add saffron broth and remaining
                    4 1/2 cups chicken broth; bring to a boil.
                  </Typography>
                  <Typography paragraph>
                    Add rice and stir very gently to distribute. Top with
                    artichokes and peppers, and cook without stirring, until
                    most of the liquid is absorbed, 15 to 18 minutes. Reduce
                    heat to medium-low, add reserved shrimp and mussels, tucking
                    them down into the rice, and cook again without stirring,
                    until mussels have opened and rice is just tender, 5 to 7
                    minutes more. (Discard any mussels that don’t open.)
                  </Typography>
                  <Typography>
                    Set aside off of the heat to let rest for 10 minutes, and
                    then serve.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
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
    </Container>
  )
}
