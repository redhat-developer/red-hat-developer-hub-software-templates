import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * ${{values.plugin_id}}Plugin backend plugin
 *
 * @public
 */
export const plugin = createBackendPlugin({
  pluginId: '${{values.plugin_id}}',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        httpAuth: coreServices.httpAuth,
        discovery: coreServices.discovery,
      },
      async init({ httpRouter, logger, config, httpAuth, discovery }) {
        logger.info('${{values.plugin_id}} plugin :: init');
        httpRouter.use(
          await createRouter({
            logger,
            config,
            httpAuth,
            discovery
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
      },
    });
  },
});
