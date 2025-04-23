import { Card, CardContent, Typography, Stack, Divider, Button, CircularProgress, Dialog, DialogActions, DialogContent } from '@mui/material';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { Me } from '../../shared/queries/authQueries/Queires';
import { isDirty, isValid, z } from 'zod';
import { TextFieldElement, useForm } from 'react-hook-form-mui';
import { zodResolver } from '@hookform/resolvers/zod';
import { DialogHeader } from '../../shared/components';
import { useState } from 'react';
import { TUpdateUser } from '../../shared/types/Types';
import { updateMe } from '../../shared/services/api/userService/UserService';

export const UpdateMeSchema = z.object({
  username: z.string().min(1, 'Username is required').optional(),
  email: z.string().email('Invalid email address').optional(),
});

export const UserInfo = () => {
  const { data: me, isRefetching, isRefetchError } = useSuspenseQuery(Me);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const toggleDialog = () => {
    setOpen((!open));
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      username: me.username || '',
      email: me.email || '',
    },
    resolver: zodResolver(UpdateMeSchema),
    mode: 'onTouched',
  });

  const updateMeMutation = useMutation({
    mutationFn: async (data: TUpdateUser) => {
      await updateMe(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(Me);
      toggleDialog();
    },
  });

  if (isRefetching || isRefetchError) {
    return (
      <Card raised>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4">
              My Profile
            </Typography>
            <Divider />
            {isRefetching && <Typography variant="body1">Loading...</Typography>}
            {isRefetchError && <Typography variant="body1">Error loading profile</Typography>}
          </Stack>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card raised>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h4">
              My Profile
            </Typography>
            <Divider />
            <Typography variant="body1">
              Username: {me?.username || 'N/A'}
            </Typography>
            <Typography variant="body1">
              Email: {me?.email || 'N/A'}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={toggleDialog}
            >
              Update Profile
            </Button>
          </Stack>
        </CardContent>
      </Card>
      <Dialog
        open={open}
        onClose={updateMeMutation.isPending ? undefined : toggleDialog}
        component='form'
        fullWidth
        onSubmit={handleSubmit((data) => updateMeMutation.mutate(data))}
      >
        <DialogHeader
          dialogTitle={'Edit Profile'}
          toggleDialog={updateMeMutation.isPending ? undefined : toggleDialog}
        />
        <DialogContent dividers>
          <Stack gap={2}>
            <TextFieldElement
              name='username'
              label='Username'
              control={control}
              variant='outlined'
              fullWidth
              required
              disabled={updateMeMutation.isPending}
            />
            <TextFieldElement
              name='email'
              label='Email'
              control={control}
              variant='outlined'
              fullWidth
              required
              disabled={updateMeMutation.isPending}
            />          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={toggleDialog}
            disabled={updateMeMutation.isPending}
            color='error'
          >
            Cancel
          </Button>
          <Button
            type='submit'
            disabled={updateMeMutation.isPending || !isDirty || !isValid}
          >
            {updateMeMutation.isPending ? <CircularProgress /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};