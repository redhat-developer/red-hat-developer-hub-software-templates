The ExampleFetchComponent demonstrates the common task of making an asynchronous request to a public API and displaying the response data in a table using Backstage components.

You can modify these components, rename them, or replace them entirely.

To consume APIs from your backend plugin, follow these steps:

- Create an `api` folder under your `src` directory and add a client file for making API calls. The file name should follow the format `<PluginNameInTitleCase>BackendClient.ts`.

  The file structure should be as follows:

  ```ts title="<PluginNameInTitleCase>BackendClient.ts"

      import {
      ConfigApi,
      createApiRef,
      IdentityApi,
      } from '@backstage/core-plugin-api';

      // @public
      export type <PluginNameInTitleCase>API = {
      getUsers: () => Promise<{ status: string } | Response>;
      };

      export type Options = {
      configApi: ConfigApi;
      identityApi: IdentityApi;
      };

      // @public
      export const <PluginNameInCamelCase>ApiRef = createApiRef<<PluginNameInTitleCase>API>({
      id: 'plugin.<PluginNameInCamelCase>.service',
      });

      export class <PluginNameInTitleCase>BackendClient implements <PluginNameInTitleCase>API {

      private readonly configApi: ConfigApi;
      private readonly identityApi: IdentityApi;

      constructor(options: Options) {
          this.configApi = options.configApi;
          this.identityApi = options.identityApi;
      }

      async getUsers() {
          const { token: idToken } = await this.identityApi.getCredentials();
          const backendUrl = this.configApi.getString('backend.baseUrl');
          const jsonResponse = await fetch(`${backendUrl}/api/<mention-your-api-here>/`, {
          headers: {
              ...(idToken && { Authorization: `Bearer ${idToken}` }),
          },
          });
          return jsonResponse.json();
      }
      }
  ```

- After creating the client, consume the APIs in your components:

  ```tsx title="ExampleFetchComponent.tsx"

      export const ExampleFetchComponent = () => {
      const theme = useTheme();
      const chipStyle = getChipStyle(theme);
      const pluginApi = useApi(<PluginNameInCamelCase>ApiRef); // use the api ref created in the client file
      const users = pluginApi.getUsers();
      const columns: TableColumn[] = [
          { title: 'Column title 1', field: 'column-field-1' },
          { title: 'Column title 2', field: 'column-field-2' },
          { title: 'Column title 3', field: 'column-field-3' },
      ];

      const data = users.map((user: any) => {
          // prepare your table data here
      });

      return (
          <Table
          title="<table-title>"
          options={{ search: false, paging: true }}
          columns={columns}
          data={data}
          />
      );
      };

  ```

You may customize the components as needed to fit your requirements.

## References

- [RBAC frontend plugin](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/rbac)

- [Orchestrator frontend plugin](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/orchestrator)
