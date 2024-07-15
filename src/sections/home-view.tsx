'use client';

import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, AppBar, Toolbar, Box, Dialog, DialogActions, DialogContent } from '@mui/material';
import { users, posts, User, Post } from '../utils/data';
import { dijkstra } from '../utils/djikstra';
import { useRouter } from 'next/navigation';
import Label from '@/components/label';

const Home: React.FC = () => {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [post, setPost] = useState<Post | null>(null);
  const [loggedUser, setLoggedUser] = useState<User | null>(null);
  const [recommendations, setRecommendations] = useState<Post[]>([]);

  useEffect(() => {
    const loggedUserData = sessionStorage.getItem('loggedUser');
    if (loggedUserData) {
      const user: User = JSON.parse(loggedUserData);
      setLoggedUser(user);
      const recommendedPosts = dijkstra(user, posts);
      setRecommendations(recommendedPosts);
    } else {
      router.push('/login');
    }
  }, []);

  if (!loggedUser) {
    return null;
  }

  const renderPostDialog = (
    post !== null && (
      <Dialog open={open} onClose={() => setOpen(false)} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 2,
      }}>
        <DialogContent sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}>
          <Typography variant="h5">{post.title}</Typography>
          <Typography variant="body1">{post.content}</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
          }}>
            <Typography variant='body2'
            >Tags: {
                post.tags.map((tag) => (
                  <Label>{tag}</Label>
                ))
              }</Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant='contained' color='error' onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  );

  return (
    <Container>
      <AppBar position="static">
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <Typography variant="h6">
            Welcome, {loggedUser.name}
          </Typography>

          <Button color="warning" variant='contained' onClick={() => {
            sessionStorage.removeItem('loggedUser');
            router.push('/login');
          }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Box mt={2} sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}>
        <Typography variant="h5">Your Interests: {loggedUser.interests.join(', ')}</Typography>
        <Typography variant="h6" gutterBottom>
          Recommended Posts for You:
        </Typography>
        <List sx={{
          width: '100%',
          maxWidth: 800,
          bgcolor: 'background.paper',
          borderRadius: 4,
          boxShadow: 4,
        }}>
          {recommendations.map((post) => (
            <Box
              onClick={() => {
                setPost(post);
                setOpen(true);
              }}
              sx={{
                '&:hover': {
                  bgcolor: 'primary.light',
                  cursor: 'pointer',
                }
              }}>
              <ListItem key={post.id}>
                <ListItemText primary={post.title} secondary={post.content} />
                <Label>{post.tags.join(', ')}</Label>
              </ListItem>
            </Box>
          ))}
        </List>
      </Box>
      {renderPostDialog}
    </Container>
  );
};

export default Home;
