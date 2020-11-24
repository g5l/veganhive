import React from 'react'

import { useMutation, useQuery, gql } from '@apollo/client'

import { makeStyles } from '@material-ui/core/styles'

import {
  CssBaseline,
  Container,
  Grid,
  Typography,
  Box,
  Link as MUILink,
  Backdrop,
  CircularProgress,
} from '@material-ui/core'

import { Header } from '../components/commons/Header'
import { Post } from '../components/timeLineComponents/Post'
import { CreatePost } from '../components/modals/CreatePost'

// import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  card: {
    width: '100%',
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

export const TimeLineContainer = () => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState()
  const [description, setDescription] = React.useState()
  const [expanded, setIdentifier] = React.useState(false)

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
      <Header handleOpen={handleOpen} />
      <Grid container spacing={4}>
        {postData.Post.map((post, index) => (
          <Grid key={index} item md={6} sm={1} className={classes.card}>
            <Post
              post={post}
              identifier={index}
              expanded={index === expanded}
              incrementLike={incrementLike}
              setIdentifier={setIdentifier}
            />
          </Grid>
        ))}
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
      <CreatePost
        isOpen={open}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        setDescription={setDescription}
        setTitle={setTitle}
      />
    </Container>
  )
}
