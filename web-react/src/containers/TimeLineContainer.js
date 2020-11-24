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
import { CreateUser } from '../components/modals/CreateUser'

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
      comments {
        comment
        author {
          name
        }
      }
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

const ADD_USER = gql`
  mutation CreateUser($name: String!) {
    CreateUser(name: $name) {
      name
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

const ADD_COMMENT = gql`
  mutation CreateComment($comment: String!) {
    CreateComment(comment: $comment) {
      commentId
    }
  }
`

const ADD_POST_COMMENT = gql`
  mutation AddPostComments($commentId: _CommentInput!, $postId: _PostInput!) {
    AddPostComments(from: $commentId, to: $postId)
  }
`

export const TimeLineContainer = () => {
  const classes = useStyles()

  const [openPostModal, setOpenPostModal] = React.useState(false)
  const [openUserModal, setOpenUserModal] = React.useState(false)

  const [title, setTitle] = React.useState()
  const [description, setDescription] = React.useState()
  const [name, setName] = React.useState()
  const [expanded, setIdentifier] = React.useState(false)

  const [comment, setComment] = React.useState()

  const [addPost] = useMutation(ADD_POST)
  const [addUser] = useMutation(ADD_USER)
  const [addLike] = useMutation(INCREMENT_LIKE)
  const [addComment] = useMutation(ADD_COMMENT)
  const [AddPostComment] = useMutation(ADD_POST_COMMENT)

  const handleOpenPostModal = () => {
    setOpenPostModal(true)
  }

  const handleClosePostModal = () => {
    setOpenPostModal(false)
  }

  const handleOpenUserModal = () => {
    setOpenUserModal(true)
  }

  const handleCloseUserModa = () => {
    setOpenUserModal(false)
  }

  const handleAddComment = (e, postId) => {
    e.preventDefault()
    addComment({
      variables: { comment },
      update: (cache, { data: { CreateComment } }) => {
        const { commentId } = CreateComment

        AddPostComment({
          variables: { postId: postId, commentId: commentId },
          refetchQueries: [{ query: GET_POSTS }],
        })
      },
    })
  }

  const handlePostSubmit = (event) => {
    event.preventDefault()
    addPost({
      variables: { title, description, numberOfLikes: 0 },
      refetchQueries: [{ query: GET_POSTS }],
      update: () => {
        handleClosePostModal()
      },
    })
  }

  const handleUserSubmit = (event) => {
    event.preventDefault()
    addUser({
      variables: { name },
      update: () => {
        handleCloseUserModa()
      },
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
      <Header
        handleOpenPostModal={handleOpenPostModal}
        handleOpenUserModal={handleOpenUserModal}
      />
      <Grid container spacing={4}>
        {postData.Post.map((post, index) => (
          <Grid key={index} item md={6} sm={1} className={classes.card}>
            <Post
              post={post}
              identifier={index}
              expanded={index === expanded}
              incrementLike={incrementLike}
              setIdentifier={setIdentifier}
              handleAddComment={handleAddComment}
              setComment={setComment}
            />
          </Grid>
        ))}
      </Grid>
      <Box pt={4}>
        <Copyright />
      </Box>
      <CreatePost
        isOpen={openPostModal}
        handleSubmit={handlePostSubmit}
        handleClose={handleOpenPostModal}
        setDescription={setDescription}
        setTitle={setTitle}
      />
      <CreateUser
        isOpen={openUserModal}
        handleSubmit={handleUserSubmit}
        handleClose={handleCloseUserModa}
        setName={setName}
      />
    </Container>
  )
}
