import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import axios from '../services/axios';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (pageNum = 1, append = false) => {
    setLoading(true);
    try {
      const res = await axios.get(`/posts?page=${pageNum}&limit=10`);
      if (append) {
        setPosts(prev => [...prev, ...res.data.posts]);
      } else {
        setPosts(res.data.posts);
      }
      setHasMore(pageNum < res.data.pagination.pages);
    } catch (err) {
      // handle error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
    setPage(1);
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.put(`/posts/${postId}/like`);
      setPosts(posts => posts.map(p =>
        p._id === postId
          ? { ...p, likes: p.likes.includes(window.userId) ? p.likes.filter(id => id !== window.userId) : [...p.likes, window.userId] }
          : p
      ));
      fetchPosts(1);
    } catch {}
  };

  const handleComment = async (postId, comment) => {
    try {
      await axios.post(`/posts/${postId}/comment`, { comment });
      fetchPosts(1);
    } catch {}
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage, true);
    setPage(nextPage);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Pulse Feed
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            {posts.length === 0 && !loading ? (
              <Typography variant="body1" align="center" sx={{ py: 4 }}>
                No posts yet. Be the first to share something!
              </Typography>
            ) : (
              posts.map(post => (
                <PostCard key={post._id} post={post} onLike={handleLike} onComment={handleComment} />
              ))
            )}
            {loading && <Loader />}
            {hasMore && !loading && (
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button variant="outlined" onClick={handleLoadMore}>
                  Load More
                </Button>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
