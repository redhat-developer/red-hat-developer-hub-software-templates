import React from "react";
import { discoveryApiRef } from "@backstage/core-plugin-api";
import { createDevApp } from "@backstage/dev-utils";
import { TestApiProvider } from "@backstage/test-utils";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { plugin, PluginPage } from "../src/plugin";

const mockedDiscoveryApi = {
  getBaseUrl: async (_param: any) => {
    return "http://localhost:7007/api/proxy";
  },
};

createDevApp()
  .registerPlugin(plugin)
  .addPage({
    element: (
      <TestApiProvider apis={[[discoveryApiRef, mockedDiscoveryApi]]}>
        <PluginPage />
      </TestApiProvider>
    ),
    title: "${{values.plugin_id}}",
    path: "/${{values.plugin_id}}",
    icon: () => <PermIdentityOutlinedIcon />,
  })
  .render();
