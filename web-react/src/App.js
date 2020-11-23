import React from 'react'

import { useMutation, useQuery, gql } from '@apollo/client'

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
  Backdrop,
  Fade,
  TextField,
} from '@material-ui/core'

import { Favorite as FavoriteIcon, Add as AddIcon } from '@material-ui/icons'

import { red } from '@material-ui/core/colors'

// import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  avatar: {
    backgroundColor: red[500],
  },
  createPostButton: {
    top: 'auto',
    bottom: 0,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MUILink color="inherit" href="https://grandstack.io/">
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

  const [addPost] = useMutation(ADD_POST)
  const [addLike] = useMutation(INCREMENT_LIKE)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    addPost({ variables: { title, description, numberOfLikes: 0 } })
  }

  // const incrementLikeInState = (id) => {
  //   const post = postData.Post.find((post) => post.postId === id)
  //   console.log({ post })
  //   post.numberOfLikes++
  // }

  const incrementLike = ({ id, likes }) => {
    likes = likes + 1

    addLike({
      variables: { id, likes },
      update: (store, { data: { UpdatePost } }) => {
        const data = store.readQuery({ query: GET_POSTS })
        data.Post.forEach((post) => {
          if (post.postId === id) {
            console.log(post.numberOfLikes, UpdatePost.numberOfLikes)
            post.numberOfLikes = UpdatePost.numberOfLikes
          }
        })
        store.writeQuery({ query: GET_POSTS, data })
      },
    })
  }

  const { error, loading, data: postData } = useQuery(GET_POSTS)

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <Container maxWidth="md">
      <CssBaseline />
      <Grid item>
        <Typography variant="h2" gutterBottom align="center">
          Timeline
          <Button
            className={classes.createPostButton}
            onClick={handleOpen}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<AddIcon />}
          >
            Create Post
          </Button>
        </Typography>
      </Grid>
      <Grid container spacing={4}>
        {postData.Post.map((post, index) => (
          <Grid key={index} item md={6} sm={1}>
            <Card className={classes.card}>
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
              </CardActions>
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
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
            >
              <TextField
                required
                id="standard-required"
                label="Required"
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                required
                id="standard-required"
                label="Required"
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button type="submit" variant="contained" color="primary">
                Create
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </Container>
  )
}
