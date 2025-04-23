import { Box, Button, Card, CardActionArea, CardContent, CircularProgress, Dialog, DialogActions, DialogContent, Divider, Grid, IconButton, Paper, Stack, Typography, useTheme } from '@mui/material';
import { MyPosts } from '../../shared/queries/authQueries/Queires';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { IPost } from '../../shared/types/Types';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import { z } from 'zod';
import { CheckboxElement, TextFieldElement, useForm } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { createPostMe, deletePostMe, updatePostMe } from '../../shared/services/api/userService/UserService';
import { DialogHeader } from '../../shared/components';

const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be 100 characters or less'),
  content: z.string().min(1, 'Content is required'),
  is_published: z.boolean(),
});

type CreatePostInput = z.infer<typeof createPostSchema>;

export const UserPosts = () => {
  const { data: posts, isRefetching, isRefetchError } = useSuspenseQuery(MyPosts);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [editPost, setEditPost] = useState<IPost | null>(null);

  const { control, handleSubmit, reset, formState: { isDirty, isValid }, } = useForm<CreatePostInput>({
    defaultValues: {
      title: '',
      content: '',
      is_published: false,
    },
    resolver: zodResolver(createPostSchema),
    mode: 'onTouched',
  });

  const handleOpen = (post?: IPost) => {
    if (post) {
      setEditPost(post);
      reset({ title: post.title, content: post.content, is_published: post.is_published });
    } else {
      setEditPost(null);
      reset({
        title: '',
        content: '',
        is_published: false,
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditPost(null);
    reset({
      title: '',
      content: '',
      is_published: false,
    });
  };

  const addPost = useMutation({
    mutationFn: async (data: CreatePostInput) => {
      await createPostMe(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      handleClose();
    },
  });

  const updatePost = useMutation({
    mutationFn: async ({ id, data }: { id: number, data: CreatePostInput }) => {
      await updatePostMe(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      handleClose();
    },
  });

  const deletePost = useMutation({
    mutationFn: async (id: number) => {
      await deletePostMe(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['POSTS'] });
      handleClose();
    },
  });

  if (isRefetching || isRefetchError) {
    return (
      <Box component={Paper} sx={{
        display: 'flex',
        justifyContent: 'center',
        p: 8,
      }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Card raised>
        <CardContent>
          <Stack gap={1}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
              <Typography variant="h4">
                My Posts
              </Typography>
              <IconButton
                onClick={() => handleOpen()}
                size="large"
                aria-label="Add Post"
                sx={{
                  backgroundColor: theme.palette.primary.main,
                  '&:hover': { backgroundColor: theme.palette.primary.dark },
                  color: theme.palette.primary.contrastText,
                }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Divider />
            {!isRefetching && !isRefetchError && posts?.length === 0 && (
              <Typography variant="body1">No posts available</Typography>
            )}
            <Grid container spacing={2}>
              {posts?.map((post: IPost) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={post.id}>
                  <Card key={post.id} variant='outlined'>
                    <CardActionArea onClick={() => handleOpen(post)}>
                      <CardContent>
                        <Typography variant="h6"
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: 'fit-content',
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography variant="caption" color="textSecondary">
                          {post.is_published ? 'Published' : 'Unpublished'}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={addPost.isPending || updatePost.isPending ? undefined : handleClose}
        component='form'
        fullWidth
        onSubmit={handleSubmit((data) => {
          if (editPost) {
            updatePost.mutate({ id: editPost.id, data });
          } else {
            addPost.mutate(data);
          }
        })}
      >
        <DialogHeader
          dialogTitle={editPost ? 'Update Post' : 'Add Post'}
          toggleDialog={addPost.isPending || updatePost.isPending ? undefined : handleClose}
        />
        <DialogContent dividers>
          <Stack gap={2}>
            <TextFieldElement
              name='title'
              label='Title'
              control={control}
              variant='outlined'
              fullWidth
              required
              disabled={addPost.isPending || updatePost.isPending}
            />

            <TextFieldElement
              name='content'
              label='Content'
              control={control}
              variant='outlined'
              fullWidth
              multiline
              rows={4}
              required
              disabled={addPost.isPending || updatePost.isPending}
            />

            <CheckboxElement
              name='is_published'
              label='Publish'
              control={control}
              disabled={addPost.isPending || updatePost.isPending}
            />

          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            disabled={addPost.isPending || updatePost.isPending}
            color='error'
          >
            Cancel
          </Button>
          <Stack direction={'row'} gap={2}>
            {editPost && (
              <Button
                onClick={() => deletePost.mutate(editPost.id)}
                disabled={deletePost.isPending}
                color='error'
              >
                {deletePost.isPending ? <CircularProgress size={24} /> : 'Delete'}
              </Button>
            )}
            <Button
              type='submit'
              disabled={addPost.isPending || updatePost.isPending || !isDirty || !isValid}
            >
              {addPost.isPending || updatePost.isPending ? <CircularProgress /> : 'Save'}
            </Button>
          </Stack>
        </DialogActions>
      </Dialog>
    </>
  );
};