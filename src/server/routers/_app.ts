/**
 * This file contains the root router of your tRPC-backend
 */
import { procedure, router } from '../trpc';
import { usersRouter } from './users';
import { userPointsRouter } from './points';
import { dailyRewardRouter } from './dailyRewards';
import { levelRouter } from './level';
import { leaderboardRouter } from './leaderboard';
import { userProfileRouter } from './userProfile';
import { tokenRouter } from './tokens';

export const appRouter = router({
  healthcheck: procedure.query(() => 'yay!'),

  // post: postRouter,
  users: usersRouter,
  points: userPointsRouter,
  level: levelRouter,
  rewards: dailyRewardRouter,
  leaderboard: leaderboardRouter,
  profile: userProfileRouter,
  token: tokenRouter,
});

export type AppRouter = typeof appRouter;
