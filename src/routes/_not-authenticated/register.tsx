import { createFileRoute } from '@tanstack/react-router';
import { Register } from '../../pages';

export const Route = createFileRoute('/_not-authenticated/register')({
  component: Register
});
