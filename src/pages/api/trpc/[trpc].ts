/**
 * This file contains tRPC's HTTP response handler
 */
import * as trpcNext from '@trpc/server/adapters/next';
import { appRouter } from '~/server/routers/_app';
import { createContext } from '../../../server/trpc';
import { H, Handlers } from '@highlight-run/node';

H.init({ projectID: 'xdnrmv4e' });

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext,
  onError: ({ error, req }) => {
    Handlers.trpcOnError({ error, req }, { projectID: 'xdnrmv4e' });
  },
});
