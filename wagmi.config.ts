import { defineConfig } from '@wagmi/cli';
import { react } from '@wagmi/cli/plugins';
import { itscTigerContract } from '~/contracts/tiger';

export default defineConfig({
  out: 'src/generated.ts',
  contracts: [itscTigerContract],
  plugins: [react()],
});
