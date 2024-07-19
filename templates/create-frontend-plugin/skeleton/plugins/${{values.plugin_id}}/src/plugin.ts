import {
  createComponentExtension,
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const plugin = createPlugin({
  id: '${{values.plugin_id}}',
  routes: {
    root: rootRouteRef,
  },
});

export const PluginPage = plugin.provide(
  createRoutableExtension({
    name: 'PluginPage',
    component: () =>
      import('./components').then(m => m.Router),
    mountPoint: rootRouteRef,
  }),
);

export const PluginIcon = plugin.provide(
  createComponentExtension({
    name: 'PluginIcon',
    component: {
      lazy: () => import('./components').then(m => m.ExampleComponentIcon),
    },
  }),
);


