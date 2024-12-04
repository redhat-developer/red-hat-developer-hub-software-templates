import { MiddlewareFactory } from '@backstage/backend-defaults/rootHttpRouter';
import { createLegacyAuthAdapters } from '@backstage/backend-common';
import {
  DiscoveryService,
  HttpAuthService,
  LoggerService,
} from '@backstage/backend-plugin-api';
import { Config } from '@backstage/config';
import express from 'express';
import Router from 'express-promise-router';

export interface RouterOptions {
  logger: LoggerService;
  config: Config;
  discovery: DiscoveryService;
  httpAuth?: HttpAuthService;
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger, config } = options;
  const { httpAuth } = createLegacyAuthAdapters(options);

  const router = Router();
  router.use(express.json());
  router.get('/health', async (_, res) => res.json({ status: 'ok' }));

  router.get('/hello', async (req, res) => {
    const caller = await httpAuth.credentials(req, { allow: ['user'] });
    res.json({ message: `Hello ${caller.principal.userEntityRef}` });
  });

  const middleware = MiddlewareFactory.create({ logger, config });

  router.use(middleware.error());
  return router;
}
