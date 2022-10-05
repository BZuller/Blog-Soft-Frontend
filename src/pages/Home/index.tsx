import { Container, createTheme, Grid, ThemeProvider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Card from '../../components/Card';
import IPost from '../../interfaces/IPost';
import PostsService from '../../services/posts.service';

function Home(): React.ReactElement {
  const [posts, setPosts] = useState<IPost[]>([]);
  const postsList = posts;

  useEffect(() => {
    PostsService.getPosts()
      .then((response) => setPosts(response))
      // eslint-disable-next-line no-console
      .catch(() => console.log('deuproblema aamigao'));
  });

  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000' },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        component="main"
        p={0}
        sx={{
          height: '100vh',
          width: '100vw',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#401b1b',
        }}
      >
        <Container
          sx={{
            backgroundColor: '#1c0c0c',
          }}
        >
          {postsList.map((post) => (
            <Grid key={post.id}>
              <Card
                renderHeader={post.title}
                renderCategorie={post.categorie.name}
                cy="sla"
                renderBody={post.content}
                renderFooter={post.author.name}
                key={post.id}
              />
            </Grid>
          ))}
        </Container>
      </Grid>
    </ThemeProvider>
  );
}

export default Home;
