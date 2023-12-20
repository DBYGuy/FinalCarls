// import { trpc } from '../utils/trpc';
import { NextPageWithLayout } from './_app';
// import { inferProcedureInput } from '@trpc/server';
// import Link from 'next/link';
// import { Fragment } from 'react';
// import type { AppRouter } from '~/server/routers/_app';

const IndexPage: NextPageWithLayout = () => {
  //   const utils = trpc.useUtils();
  //   const postsQuery = trpc.post.list.useInfiniteQuery(
  //     {
  //       limit: 5,
  //     },
  //     {
  //       getPreviousPageParam(lastPage) {
  //         return lastPage.nextCursor;
  //       },
  //     },
  //   );

  //   const addPost = trpc.post.add.useMutation({
  //     async onSuccess() {
  //       // refetches posts after a post is added
  //       await utils.post.list.invalidate();
  //     },
  //   });

  // prefetch all posts for instant navigation
  // useEffect(() => {
  //   const allPosts = postsQuery.data?.pages.flatMap((page) => page.items) ?? [];
  //   for (const { id } of allPosts) {
  //     void utils.post.byId.prefetch({ id });
  //   }
  // }, [postsQuery.data, utils]);

  return <div className="flex flex-col bg-gray-800 py-8"></div>;
};

export default IndexPage;

/**
 * If you want to statically render this page
 * - Export `appRouter` & `createContext` from [trpc].ts
 * - Make the `opts` object optional on `createContext()`
 *
 * @link https://trpc.io/docs/ssg
 */
// export const getStaticProps = async (
//   context: GetStaticPropsContext<{ filter: string }>,
// ) => {
//   const ssg = createServerSideHelpers({
//     router: appRouter,
//     ctx: await createContext(),
//   });
//
//   await ssg.post.all.fetch();
//
//   return {
//     props: {
//       trpcState: ssg.dehydrate(),
//       filter: context.params?.filter ?? 'all',
//     },
//     revalidate: 1,
//   };
// };
