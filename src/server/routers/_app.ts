/**
 * This file contains the root router of your tRPC-backend
 */
import { procedure, router } from '../trpc';
import { usersRouter } from './users';
import { userPointsRouter } from './points';
import { dailyRewardRouter } from './dailyRewards';
import { levelRouter } from './level';

export const appRouter = router({
  healthcheck: procedure.query(() => 'yay!'),

  // post: postRouter,
  users: usersRouter,
  points: userPointsRouter,
  level: levelRouter,
  rewards: dailyRewardRouter,
});

export type AppRouter = typeof appRouter;
