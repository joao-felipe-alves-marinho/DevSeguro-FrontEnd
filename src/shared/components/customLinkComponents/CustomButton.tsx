import { forwardRef } from 'react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { Button, ButtonProps } from '@mui/material';

interface MUILinkProps extends Omit<ButtonProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => {
    return <Button component='a' ref={ref} {...props} />;
  },
);

MUILinkComponent.displayName = 'MUILinkComponent';

const CreatedLinkComponent = createLink(MUILinkComponent);

export const CustomButton: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};