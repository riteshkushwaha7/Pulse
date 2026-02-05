import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

export default function CreatePostCard({ onCreate }) {
  const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text && !imageUrl) return;
    setSubmitting(true);
    await onCreate({ text, imageUrl });
    setText('');
    setImageUrl('');
    setSubmitting(false);
  };

  return (
    <Card sx={{ mb: 3, borderRadius: 3, boxShadow: 2, maxWidth: 600, mx: 'auto' }}>
      <CardHeader
        avatar={<Avatar sx={{ bgcolor: 'primary.main' }}><AddIcon /></Avatar>}
        title="Create a New Post"
        subheader="Share your thoughts or an image"
      />
      <CardContent>
        <form onSubmit={handleSubmit}>
          <TextField
            label="What's on your mind?"
            fullWidth
            multiline
            minRows={3}
            value={text}
            onChange={e => setText(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
            variant="outlined"
          />
          <TextField
            label="Image URL (optional)"
            fullWidth
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            sx={{ mb: 2 }}
            disabled={submitting}
            variant="outlined"
            placeholder="https://example.com/image.jpg"
          />
          <Box sx={{ textAlign: 'right', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting || (!text && !imageUrl)}
              size="large"
              startIcon={<SendIcon />}
            >
              {submitting ? 'Posting...' : 'Post'}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}
