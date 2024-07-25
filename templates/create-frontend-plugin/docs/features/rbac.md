# Guide to Enforcing Access Controls in your Frontend Plugin

## Add new permissions to your plugin

The available options for defining a permission include `resourceType`, `name`, and `attributes`. The `resourceType` is optional and should mainly be used if you are planning to attach conditional rules to the permissions. `name` is required and specifies the permission name. `attributes` are required, however the `action` defined within attributes section is optional. The available actions are `create`, `read`, `update`, and `delete`. If no action is specified, the RBAC Backend plugin will substitute `use` in its place. This means that any permission policies defined for the RBAC Backend plugin will appear as `p, role:default/<SOME_ROLE>, <MY_PERMISSION_WITHOUT_ACTION>, use, allow`.

### Steps

- Create a new `plugin-common` using the Backstage CLI, if you do not already have one for your plugin.
- Create the `permissions.ts` file and populate it with your permissions. An example has been provided below.

  ```ts
  import { createPermission } from ‘@backstage/plugin-permission-common’;

  export const ocmClusterReadPermission = createPermission({
    name: ‘ocm.cluster.read’,
    attributes: {
      action: ‘read’,
    },
  });

  export const ocmClusterPermissions = [ocmClusterReadPermission];
  ```

- In the `index.ts`, export the permissions that you have created.

  ```ts title="index.ts"
  export * from ‘./permissions’;
  ```

## Restrict access to your frontend plugin

There are two ways, `usePermission` and `RequirePermission` that can be used to protect parts of your frontend plugin. `usePermission` can be used to determine if a user has the appropriate permissions to perform a certain action on the frontend. `RequirePermission` will render a child element if the user has the appropriate permission. Below are the examples of how to use the two mechanisms.

### `usePermission` to block access to editing a resource

```ts
const getEditIcon = (isAllowed: boolean, roleName: string) => {
  const { kind, name, namespace } = getKindNamespaceName(roleName);

  return (
    <EditRole
      dataTestId={isAllowed ? 'update-policies' : 'disable-update-policies'}
      roleName={roleName}
      disable={!isAllowed}
      to={`../../role/${kind}/${namespace}/${name}?activeStep=${2}`}
    />
  );
};

export const PermissionsCard = ({ entityReference }: PermissionsCardProps) => {
  const { data, loading, retry, error } = usePermissionPolicies(entityReference);
  const [permissions, setPermissions] = React.useState<PermissionsData[]>();
  const permissionResult = usePermission({ // check if the user has required permissions
    permission: policyEntityUpdatePermission,
    resourceRef: policyEntityUpdatePermission.resourceType,
  });

  // ... additional code ... //

  const actions = [
    {
      icon: getRefreshIcon,
      tooltip: 'Refresh',
      isFreeAction: true,
      onClick: () => {
        retry.permissionPoliciesRetry();
        retry.policiesRetry();
      },
    },
    {
      icon: () => getEditIcon(permissionResult.allowed, entityReference), // reference hook
      tooltip: !permissionResult.allowed ? 'Unauthorized to edit' : 'Edit',
      isFreeAction: true,
      onClick: () => {},
    },
  ];

  // ... additional code ... //
```

### `RequirePermission` to block elements from rendering

```ts
export const ClusterInfoCard = () => {
  const { data } = useCluster();

  if (!data) {
    return null;
  }

  // ... Additional code ... //
  return (
    <RequirePermission permission={ocmEntityReadPermission}> // Block access to table
      <TableCardFromData data={data} title="Cluster Info" nameMap={nameMap} />
    </RequirePermission>
  );
}
```

## References

Additional documentation:

- [OCM frontend plugin](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/ocm)
- [RBAC frontend plugin](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/rbac)
- [Topology frontend plugin](https://github.com/janus-idp/backstage-plugins/tree/main/plugins/topology)
- [Youtube video on permissions framework](https://www.youtube.com/watch?v=BDoQhegtw6E)
- [Permission Concepts](https://backstage.io/docs/permissions/concepts)

Basic permissions examples:

- [Catalog Permissions](https://github.com/backstage/backstage/blob/master/plugins/catalog-common/src/permissions.ts)
- [Jenkins Permissions](https://github.com/backstage/backstage/blob/master/plugins/jenkins-common/src/permissions.ts)
- [Devtools Permissions](https://github.com/backstage/backstage/blob/master/plugins/devtools-common/src/permissions.ts)
- [Kubernetes Permissions](https://github.com/backstage/backstage/blob/master/plugins/kubernetes-common/src/permissions.ts)

Condition permissions examples:

- [Catalog Backend](https://github.com/backstage/backstage/blob/master/plugins/catalog-backend/src/permissions/conditionExports.ts)
- [Playlist Backend](https://github.com/backstage/backstage/blob/c9ddf111a70fbbf286abe13081b67fc7719108d4/plugins/playlist-backend/src/permissions/conditions.ts#L20)
- [Scaffolder Backend](https://github.com/backstage/backstage/blob/master/plugins/scaffolder-backend/src/service/rules.ts)
- [Upstream Documentation](https://backstage.io/docs/permissions/custom-rules)
