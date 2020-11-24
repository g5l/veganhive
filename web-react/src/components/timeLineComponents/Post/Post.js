import React, { useCallback } from 'react'

import clsx from 'clsx'

import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Collapse,
} from '@material-ui/core'

import {
  Favorite as FavoriteIcon,
  ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons'

import { postStyles } from './styles'

import { Comment } from '../Comment'

export const Post = React.memo(function Post({
  post,
  incrementLike,
  setIdentifier,
  identifier,
  expanded,
  handleAddComment,
  setComment,
}) {
  const classes = postStyles()

  const handleIdentifier = useCallback(() => {
    expanded ? setIdentifier(false) : setIdentifier(identifier)
  }, [setIdentifier, identifier, expanded])

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        title={post.title}
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
          onClick={handleIdentifier}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Comment
            handleAddComment={handleAddComment}
            setComment={setComment}
            comments={post.comments}
            postId={post.postId}
          />
        </CardContent>
      </Collapse>
    </Card>
  )
})
