// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
   */
  interface Session {
    user: {
      /** Unique id of the user. */
      id: string;
      /** The user's wallet address. */
      walletAddress: string;
      /** ENS name */
      ENSName?: string | null;
      /** Email assigned to the wallet address (should be verified first) */
      associatedEmail?: string | null;
      /** Twitter handle of user */
      Xhandle?: string | null;
      /** Discord ID of the user */
      discordID?: string | null;
      /** Profile picture */
      avatar?: string | null;
      // Other properties can be added here if needed for the session
      username?: string | null;
    };
  }
  interface User {
    /** Profile picture */
    avatar?: string | null;
    /** Twitter handle of user */
    XHandle?: string | null;
    /** Wallet address */
    walletAddress: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Account {}

  interface Profile {
    screen_name: string;
    profile_image_url_https: string;
    // data: {
    //   username: string;
    //   id: string;
    //   name: string;
    //   profile_image_url: string;
    // };
  }
}
