import React from 'react';
import Box from '@mui/material/Box';
import CreatePostCard from '../components/CreatePostCard';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function CreatePostPage() {
  const navigate = useNavigate();

  const handleCreate = async ({ text, imageUrl }) => {
    await axios.post('/api/posts', { text, imageUrl });
    navigate('/');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Create New Post
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3, borderRadius: 2 }}>
            <CreatePostCard onCreate={handleCreate} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
