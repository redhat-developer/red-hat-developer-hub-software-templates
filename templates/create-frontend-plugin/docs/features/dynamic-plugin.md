To be able to run your frontend plugin as a dynamic plugin on Red Hat Developer Hub, follow the steps below:

- To build the plugin and the dynamic entrypoint:

  `yarn install`

  `yarn tsc`

  `yarn build`

  `yarn export-dynamic`

- To install the dynamic plugin from a local build and run it in a local instance of backstage-showcase:

  ```bash
  cd dist-scalprum
  npm pack .
  archive=$(npm pack $pkg)
  tar -xzf "$archive" && rm "$archive"
  mv package $(echo $archive | sed -e 's:\.tgz$::')
  ```

- Move the resulting directory (janus-idp-backstage-plugin-<pluginName>-<version>) into the `dynamic-plugins-root` folder of your backstage-showcase clone, then run yarn start to start the app.

- This configuration will then enable the plugin to be visible in the UI:

  ```yaml
  dynamicPlugins:
    frontend:
      janus-idp.backstage-plugin-<pluginName>:
      appIcons:
        - name: PluginIcon
          importName: PluginIcon
      dynamicRoutes:
        - path: /<plugin-path>
          importName: PluginPage
          menuItem:
            icon: PluginIcon
            text: <PluginName>
  ```
