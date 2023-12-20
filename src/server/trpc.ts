import { inferAsyncReturnType, initTRPC, TRPCError } from '@trpc/server';
import { CreateNextContextOptions } from '@trpc/server/adapters/next';
import { type Session } from 'next-auth';
import superjson from 'superjson';
import { getServerAuthSession } from './context/auth';
import { prisma } from './context/db';

type InnerContextOptions = {
  session: Session | null;
};

export const createInnerContext = async (opts: InnerContextOptions) => {
  return {
    session: opts.session,
    prisma,
  };
};

export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  const ctx = await createInnerContext({
    session,
  });

  return ctx;
};

type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<Context>().create({
  transformer: superjson,
});

const isAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }

  return next({
    ctx: {
      ...ctx,
      // infers that `session` is non-nullable to downstream resolvers
      session: { ...ctx.session, user: ctx.session.user },
    },
  });
});

export const router = t.router;
export const procedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
