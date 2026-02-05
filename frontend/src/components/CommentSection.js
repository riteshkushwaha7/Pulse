import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { useAuth } from '../context/AuthContext';

export default function CommentSection({ post, onComment }) {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setSubmitting(true);
    await onComment(post._id, comment);
    setComment('');
    setSubmitting(false);
  };

  return (
    <Box sx={{ px: 2, pb: 2 }}>
      <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
        Comments
      </Typography>
      <List dense>
        {post.comments?.map((c, idx) => (
          <React.Fragment key={idx}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={<b>{c.username}</b>}
                secondary={
                  <>
                    {c.comment}
                    <br />
                    <Typography variant="caption" color="text.secondary">
                      {new Date(c.createdAt).toLocaleString()}
                    </Typography>
                  </>
                }
              />
            </ListItem>
            {idx < post.comments.length - 1 && <Divider component="li" />}
          </React.Fragment>
        ))}
      </List>
      {user && (
        <form onSubmit={handleSubmit} style={{ marginTop: 12 }}>
          <TextField
            size="small"
            fullWidth
            variant="outlined"
            placeholder="Add a comment..."
            value={comment}
            onChange={e => setComment(e.target.value)}
            disabled={submitting}
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            sx={{ mt: 1, float: 'right' }}
            disabled={submitting || !comment.trim()}
          >
            Post
          </Button>
        </form>
      )}
    </Box>
  );
}
