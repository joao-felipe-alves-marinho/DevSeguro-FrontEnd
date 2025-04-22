import { createFileRoute } from '@tanstack/react-router';
import { Login } from '../../pages';

export const Route = createFileRoute('/_not-authenticated/login')({
  component: Login,
});