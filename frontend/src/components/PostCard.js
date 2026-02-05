import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Collapse from '@mui/material/Collapse';
import CommentSection from './CommentSection';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import { useAuth } from '../context/AuthContext';

export default function PostCard({ post, onLike, onComment }) {
  const { user } = useAuth();
  const [expanded, setExpanded] = useState(false);

  const handleLike = () => {
    if (user) onLike(post._id);
  };

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2, maxWidth: 600, mx: 'auto' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}>{post.author?.username?.[0]?.toUpperCase() || '?'}</Avatar>}
        title={post.author?.username || 'Unknown'}
        subheader={new Date(post.createdAt).toLocaleString()}
        action={
          <Chip label="Post" size="small" color="primary" variant="outlined" />
        }
      />
      <CardContent>
        {post.text && (
          <Typography variant="body1" sx={{ mb: post.imageUrl ? 2 : 0 }}>
            {post.text}
          </Typography>
        )}
        {post.imageUrl && (
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <img
              src={post.imageUrl}
              alt="post"
              style={{ maxWidth: '100%', borderRadius: 8, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}
            />
          </Box>
        )}
      </CardContent>
      <Divider />
      <CardActions disableSpacing sx={{ px: 2, py: 1 }}>
        <IconButton onClick={handleLike} color={post.likes?.includes(user?._id) ? 'error' : 'default'}>
          <FavoriteIcon />
        </IconButton>
        <Typography variant="body2" sx={{ mr: 2 }}>{post.likes?.length || 0} likes</Typography>
        <IconButton onClick={handleExpandClick}>
          <ChatBubbleOutlineIcon />
        </IconButton>
        <Typography variant="body2">{post.comments?.length || 0} comments</Typography>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Divider />
        <CommentSection post={post} onComment={onComment} />
      </Collapse>
    </Card>
  );
}
