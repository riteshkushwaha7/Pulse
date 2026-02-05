import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useAuth } from '../context/AuthContext';
import axios from '../services/axios';
import { useNavigate } from 'react-router-dom';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

export default function AuthPage() {
  const [tab, setTab] = useState(0);
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleTab = (_, v) => {
    setTab(v);
    setForm({ username: '', email: '', password: '' });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (tab === 0) {
        // Login
        const res = await axios.post('/auth/login', {
          email: form.email,
          password: form.password,
        });
        login(res.data.user, res.data.token);
        navigate('/');
      } else {
        // Signup
        const res = await axios.post('/auth/signup', {
          username: form.username,
          email: form.email,
          password: form.password,
        });
        login(res.data.user, res.data.token);
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {tab === 0 ? 'Sign In' : 'Sign Up'}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Tabs value={tab} onChange={handleTab} variant="fullWidth" sx={{ mb: 2 }}>
            <Tab label="Login" />
            <Tab label="Signup" />
          </Tabs>
          <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
            <form onSubmit={handleSubmit}>
              {tab === 1 && (
                <TextField
                  label="Username"
                  name="username"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={form.username}
                  onChange={handleChange}
                  required
                  disabled={loading}
                />
              )}
              <TextField
                label="Email"
                name="email"
                type="email"
                fullWidth
                sx={{ mb: 2 }}
                value={form.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                fullWidth
                sx={{ mb: 2 }}
                value={form.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
              {error && (
                <Typography color="error" sx={{ mb: 2 }}>{error}</Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
                sx={{ mt: 1, mb: 2 }}
              >
                {tab === 0 ? 'Login' : 'Signup'}
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}
