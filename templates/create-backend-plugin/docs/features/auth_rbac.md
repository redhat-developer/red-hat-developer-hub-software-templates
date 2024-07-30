# Guide to Handle Authentication and Authorization

This plugin exports two routes: `/health` and `/message`. The route `/health` is configured to have no authentication, and `/message` requires the user to be logged in. By default a route will require authentication, the client will have to add authentication tokens to access it, otherwise the route will respond with `401 Unauthorized`, meaning that the route requires an author (authentication), but was not able to identify it.

## Authorization

There are other cases where Authorization is required. It means that even being authenticated, the user most be part of a role that has access to it. 

Backstage provides a permission framework that can be used to add roles checking to a route. In order to use it you must first create a `permissions.ts` file that will export the required permissions to your route. Here's an example of a permission `read` for `ocm.cluster.read`

```ts
import { createPermission } from '@backstage/plugin-permission-common';

export const ocmClusterReadPermission = createPermission({
  name: 'ocm.cluster.read',
  attributes: {
    action: 'read',
  },
});

export const ocmClusterPermissions = [ocmClusterReadPermission];
```

Then make sure that the permission is exported from `index.ts`:

```ts
export * from './permissions';
```

To check the permission for the route you will need the service `PermissionsService`:

```ts
export interface RouterOptions {
  logger: Logger;
  config: Config;
  discovery: PluginEndpointDiscovery;
  permissions: PermissionsService; // Permission framework
  httpAuth?: HttpAuthService; // Auth Service
}

export async function createRouter(
  options: RouterOptions,
): Promise<express.Router> {
  const { logger } = options;
  const { config } = options;
  const { permissions } = options; // Added

  const { httpAuth } = createLegacyAuthAdapters(options); // Added

  return buildRouter(config, logger, httpAuth, permissions);
}

export const ocmPlugin = createBackendPlugin({
  pluginId: 'ocm',
  register(env) {
    env.registerInit({
      deps: {
        logger: coreServices.logger,
        config: coreServices.rootConfig,
        http: coreServices.httpRouter,
        httpAuth: coreServices.httpAuth, // Added the core services httpAuth
        permissions: coreServices.permissions, // Added the core services permissions
      },
      async init({ config, logger, http, httpAuth, permissions }) { // additions
        http.use(
          buildRouter(
            config,
            logger,
            httpAuth, // Addition
            permissions, // Addition
          ),
        );
      },
    });
  },
});
```

In our `buildRouter` we must integrate permissions with the router using the constant `permissionsIntegrationRouter` with the permissions from our `permissions.ts` file:

```ts
const buildRouter = (
  config: Config,
  logger: Logger,
  httpAuth: HttpAuthService,
  permissions: PermissionsService,
) => {
  const router = Router();

  const permissionsIntegrationRouter = createPermissionIntegrationRouter({
    permissions: ocmEntityPermissions,
  }); // Create the permission integration routes and pass in our permissions

  router.use(express.json());
  router.use(permissionsIntegrationRouter); // Set the router to use the permissions
  

};
```

After the permission integration router has been set, we will need to handle authorization within our Backend plugin. For this we create a method `authorize`, call it and and handle `DENY` results:

```ts
const authorize = async (request: Request, permission: BasicPermission) => {
  const decision = (
    await permissions.authorize([{ permission: permission }], {
      credentials: await httpAuth.credentials(request),
    })
  )[0];
  return decision;
}

router.get('/myRoute', async (request, response) => {
  const decision = await authorize(request, ocmEntityReadPermission);
  if (decision.result === AuthorizeResult.DENY) {
    throw new NotAllowedError('Unauthorized');
  }
  // Continue here if user is allowed...
}
```
