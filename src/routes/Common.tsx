import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/Common')({
  beforeLoad: () => {
    throw redirect({ to: '/' });
  },
});
