/**
 * This file contains the root router of your tRPC-backend
 */
import { procedure, router } from '../trpc';
import { usersRouter } from './users';
import { userPointsRouter } from './points';

export const appRouter = router({
  healthcheck: procedure.query(() => 'yay!'),

  // post: postRouter,
  users: usersRouter,
  points: userPointsRouter,
});

export type AppRouter = typeof appRouter;
