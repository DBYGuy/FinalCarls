/**
 * This file contains the root router of your tRPC-backend
 */
import { procedure, router } from '../trpc';
import { postRouter } from './post';
import { usersRouter } from './users';

export const appRouter = router({
  healthcheck: procedure.query(() => 'yay!'),

  post: postRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
