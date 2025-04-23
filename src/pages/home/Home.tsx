import { useSuspenseQuery } from '@tanstack/react-query';
import { IPost } from '../../shared/types/Types';
import { Stack, Typography, Paper, Card, CardActionArea, CardContent, Grid, Divider, Dialog, DialogContent } from '@mui/material';

import { useState } from 'react';
import { DialogHeader } from '../../shared/components';
import { ListPosts } from '../../shared/queries/authQueries/Queires';

export const Home = () => {
  const { data: posts, isRefetching, isRefetchError } = useSuspenseQuery(ListPosts);
  const [open, setOpen] = useState<IPost | null>(null);

  const handleOpen = (post: IPost) => {
    setOpen(post);
  };
  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <Stack spacing={2} sx={{ padding: 2 }} component={Paper} elevation={3}>
        <Typography variant="h4" component="h1" gutterBottom>
          Posts
        </Typography>
        <Divider />
        {isRefetching && <Typography variant="body1">Loading...</Typography>}
        {isRefetchError && <Typography variant="body1">Error loading posts</Typography>}
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
                    <Typography variant="body2" color="textSecondary">
                      {post.user.username}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Stack>
      <Dialog
        open={!!open}
        onClose={handleClose}
        fullWidth
      >
        <DialogHeader
          dialogTitle={open?.title || ''}
          toggleDialog={handleClose}
        />
        <DialogContent dividers>
          <Stack gap={2}>
            <Stack direction='row' gap={2} alignItems='center'>
              <Typography variant="subtitle1" component="h2">
                User: {open?.user.username}
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                Email: {open?.user.email}
              </Typography>
            </Stack>
            <Typography variant='body1' sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', margin: 0 }}>
              {open?.content}
            </Typography>
          </Stack>
        </DialogContent>
      </Dialog>
    </>
  );
};