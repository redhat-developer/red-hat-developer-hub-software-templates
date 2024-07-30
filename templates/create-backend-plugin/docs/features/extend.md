# Guide to Understand And Extend Your Plugin

## Understanding the plugin code

The plugin is created on file `plugin.ts` and when creating it you can pick what services you want to be used by your plugin. In this case we use services `LoggerService`, `Config`, `DiscoveryService` and `HttpAuthService`. Some service may be used by other APIs, in this plugin Discovery and HttpAuth services are used by the function `createLegacyAuthAdapters` in `router.ts`.

Talking about `route.ts`, it is where the HTTP routes are created to handle user requests. It creates only two routes, `GET /health`, that simples return a JSON, and `GET /hello`, that retries user information from the request to be returned with a message.

Later on `plugin.ts` we also free the `/health` route from any authenticatication, meaning that anyone can request the route without being loged in into Backstage.

## Extending the plugin capabilities

When calling `registerInit` in `plugin.ts` it is possible to access other [services](https://backstage.io/docs/backend-system/architecture/services):

```ts
env.registerInit({
  deps: {
    // services to be injected
  },
  async init({
    // services are passed as parameters to init
  }) {
    // use the services here
  };      
});
```

## Extending Existing Plugins and Services

Backstage plugins can be extended by using backend modules. Example of plugins that can be extended are catalog entities and scaffolding actions. Registering a module looks like what is done to plugins, with the difference that we call createBackendModule

```ts
import { createBackendModule } from '@backstage/backend-plugin-api';

export const myCustomPluginIdModuleId = createBackendModule({
  pluginId: 'plugin-id', // plugin to be extended
  moduleId: 'my-custom-module-id',
  register(env) {
    env.registerInit({
      deps: {
        // services or other extension points
      },
      async init({ catalog }) {
        // your code here
      },
    });
  },
});
```

So if you are looking to create actions, catalog processors or other extensions that are for a existing plugin, check if a module is not the suitable way of doing that.
