import { Link, LinkProps } from '@mui/material';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { forwardRef } from 'react';

interface MUILinkProps extends Omit<LinkProps, 'href'> {
  // Add any additional props you want to pass to the button
}

const MUILinkComponent = forwardRef<HTMLAnchorElement, MUILinkProps>(
  (props, ref) => {
    return <Link ref={ref} {...props} />;
  },
);

MUILinkComponent.displayName = 'MUILinkComponent';

const CreatedLinkComponent = createLink(MUILinkComponent);

export const CustomLink: LinkComponent<typeof MUILinkComponent> = (props) => {
  return <CreatedLinkComponent {...props} />;
};