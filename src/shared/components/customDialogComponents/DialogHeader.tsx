import { Stack, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface DialogHeaderProps {
  toggleDialog?: () => void;
  dialogTitle: string;
}

export const DialogHeader = (props: DialogHeaderProps) => {
  return (
    <Stack direction='row' justifyContent='space-between'>
      <DialogTitle>
        {props.dialogTitle}
      </DialogTitle>
      <IconButton onClick={props.toggleDialog} sx={{
        padding: 2,
      }}>
        <CloseIcon />
      </IconButton>
    </Stack>
  );
};