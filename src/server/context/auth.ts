import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth';
import { getServerContext } from '../../pages/api/auth/[...nextauth]';

export const getServerAuthSession = async (ctx: CreateNextContextOptions) =>
  await getServerSession(...getServerContext(ctx.req, ctx.res));
