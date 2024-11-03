import { composePlugins, withNx } from '@nx/next';
import { WithNxOptions } from '@nx/next/plugins/with-nx';

const nextConfig: WithNxOptions = {
  nx: {
    svgr: false,
  },
};

const plugins = [
  withNx,
];

export default composePlugins(...plugins)(nextConfig);
