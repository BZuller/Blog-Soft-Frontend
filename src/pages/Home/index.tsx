import {
  Box,
  Button,
  Chip,
  createTheme,
  Fab,
  Grid,
  MenuItem,
  Modal,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ImBug } from 'react-icons/im';
import { AxiosError } from 'axios';
import Card from '../../components/Card';
import IPost from '../../interfaces/IPost';
import PostsService from '../../services/posts.service';
import formatDate from '../../utils/formatDate';
import ICategorie from '../../interfaces/ICategorie';
import CategoriesService from '../../services/categories.service';
import ICreatePost from '../../interfaces/ICreatePost';
import toastMsg, { ToastType } from '../../utils/toastMsg';
import { AuthContext } from '../../contexts/AuthContext';

function Home(): React.ReactElement {
  const [showModal, setShowModal] = useState(false);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [categories, setCategories] = useState<ICategorie[]>([]);
  const [fields, setFields] = useState<ICreatePost>({ title: '', content: '', categorieId: '' });
  const [loader, setLoader] = useState<boolean>(false);
  const handleOpenModal = (): void => setShowModal(true);
  const handleCloseModal = (): void => setShowModal(false);
  const auth = useContext(AuthContext);
  const token = localStorage.getItem('userToken');
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');

  const fetchPosts = (): void => {
    PostsService.getPosts()
      .then((response) => setPosts(response))
      .catch((error) => toast.error((error as AxiosError).response?.data.message));
  };
  useEffect(() => {
    fetchPosts();
    CategoriesService.getCategories()
      .then((response) => setCategories(response))
      .catch((error) => toast.error((error as AxiosError).response?.data.message));
  }, []);

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    try {
      setLoader(true);
      const { title, content, categorieId } = fields;
      if (userId) {
        await PostsService.createPost({ title, content, categorieId, authorId: userId });
        toastMsg(ToastType.Success, 'Post criado com sucesso!');
        fetchPosts();
        handleCloseModal();
      }
      setLoader(false);
    } catch {
      toastMsg(ToastType.Error, 'Falha ao criar um post');
      setLoader(false);
    }
  };

  const theme = createTheme({
    palette: {
      primary: { main: '#990011', light: '#FCF6F5FF', dark: '#730000', contrastText: 'white' },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            width: 600,
            height: 600,
            backgroundColor: '#1a1a1a',
            p: 4,
            display: 'flex',
            borderRadius: '2%',
          }}
        >
          <form
            onSubmit={(event) => {
              handleSubmit(event);
            }}
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              borderRadius: '2%',
            }}
          >
            <ImBug fontSize={50} color="white" />
            <Typography fontSize={30} sx={{ color: 'white' }}>
              {' '}
              Create your post
            </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              value={fields?.title}
              onChange={(event) => setFields({ ...fields, title: event.target.value })}
              autoFocus
              sx={{ backgroundColor: '#d1d1d1', borderRadius: '0.2rem', marginBottom: '-1%' }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="content"
              label="Content"
              type="content"
              id="content"
              value={fields?.content}
              onChange={(event) => setFields({ ...fields, content: event.target.value })}
              sx={{ backgroundColor: '#d1d1d1', borderRadius: '0.2rem', mt: 3, mb: 2 }}
            />
            <Select
              fullWidth
              id="categorieId"
              label="Categories"
              name="categorieId"
              value={fields?.categorieId}
              onChange={(event) => setFields({ ...fields, categorieId: event.target.value })}
              sx={{ backgroundColor: '#d1d1d1', borderRadius: '0.2rem' }}
            >
              {categories.map((categorie) => (
                <MenuItem key={categorie.id} value={categorie.id}>
                  {categorie.name}
                </MenuItem>
              ))}
            </Select>
            <Button
              type="submit"
              disabled={loader}
              variant="contained"
              sx={{ mt: 3, mb: 2, color: '#c1262e', backgroundColor: 'white', fontWeight: 'bold' }}
            >
              Post!
            </Button>
          </form>
        </Box>
      </Modal>
      <Grid
        container
        component="main"
        p={0}
        sx={{
          height: '100vh',
          width: '100vw',
          justifyContent: 'center',
          backgroundColor: '#401b1b',
        }}
      >
        <Grid
          container
          component="main"
          p={0}
          sx={{
            position: 'fixed',
            width: '90vw',
            backgroundColor: '#300a0a',
            boxShadow: ' 0 0.25rem 1.25rem var(--gray-rgba)',
            justifyContent: 'space-between',
            color: 'white',
          }}
        >
          <Grid sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
            {token ? (
              <div>
                <Chip
                  label={userName}
                  variant="outlined"
                  sx={{ marginRight: '1rem', marginTop: '5px', color: 'white' }}
                />
                <Chip
                  label="Sign out"
                  clickable
                  sx={{ marginRight: '1rem', marginTop: '5px', color: 'white', backgroundColor: '#c1262e' }}
                  onClick={() => auth.signOut()}
                />
              </div>
            ) : (
              <ButtonGroup sx={{ marginRight: '1rem', marginTop: '5px' }}>
                <Button variant="outlined" href="/Login">
                  Sign in
                </Button>
                <Button variant="contained" href="/Register">
                  Sign up
                </Button>
              </ButtonGroup>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          component="main"
          p={0}
          sx={{
            height: '100vh',
            width: '100vw',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#1a1a1a',
          }}
        >
          {posts.map((post) => (
            <Grid key={post.id}>
              <Card
                renderHeader={post.title}
                renderCategorie={post.categorie.name}
                cy="post"
                renderBody={post.content}
                renderFooter={post.author.name}
                renderDate={formatDate(post.created_at)}
                key={post.id}
              />
            </Grid>
          ))}
          {token && (
            <Grid sx={{ width: '100vw', display: 'flex', justifyContent: 'flex-end' }}>
              <Fab color="primary" aria-label="add" sx={{ bottom: '2rem', right: '2rem', position: 'fixed' }}>
                <AddIcon onClick={handleOpenModal} />
              </Fab>
            </Grid>
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default Home;
