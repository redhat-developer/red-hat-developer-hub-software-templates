# Guide to Export Your Plugin to Red Hat Developer Hub

This plugin is ready to be exported to run on Red Hat Developer Hub (RHDH) 1.2 using the [Dynamic Plugins](https://github.com/redhat-developer/rhdh/blob/main/docs/dynamic-plugins/index.md) mechanism.

## Exporting Dynamic Plugins

The dynamic plugins require the dev dependency `@janus-idp/cli` on the corresponding version for your target RHDH. This dependency will brings the command `janus-cli`, so a new script can be added to `package.json` to export dynamic plugins:

```json
"export-dynamic": "janus-cli package export-dynamic-plugin --clean"
```

## Installation

After running this command a new folder will be created in root dir: `dist-dynamic`. This folder should be copied to RHDH dynamic plugins root directory and renamed to `${plugin-id-as-in-package.json}-dynamic`. The plugin can be mapped on `app-config.yaml` using the dynamic section, for example:

```yaml
global:
  dynamic:
    plugins:
      - package: /path/to/plugin/root/dir
        disabled: false
```

Please bear in mind that this way of installing plugins is a TechPreview and it may change in later RHDH releases. 

For more information check [Dynamic Plugins](https://github.com/redhat-developer/rhdh/blob/main/docs/dynamic-plugins/index.md) documentation.
