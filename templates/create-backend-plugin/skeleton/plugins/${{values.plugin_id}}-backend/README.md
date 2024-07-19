# ${{values.plugin_id}}

Welcome to the ${{values.plugin_id}} backend plugin!

_This plugin was created through the Backstage CLI_

## Getting started

Your plugin has been added to the example app in this repository, meaning you'll be able to access it by running `yarn
start` in the root directory, wait the server to start and then acessing the plugin endpoints:

* [/${{values.plugin_id}}/health](http://localhost:7007/api/${{values.plugin_id}}/health): This endpoint will simply return a JSON with content `{"status" : "ok"}` and requires no authentication;
* [/${{values.plugin_id}}/hello](http://localhost:7007/api/${{values.plugin_id}}/hello): This endpoint will thrown a 401 error if not authenticated and can be called setting the `Authorization` header with the proper token. Once authenticated it will return a JSON with content `{"message": "Hello User"}`, where User is the authenticated user. Here's an example to call it using the `curl` utility:

```
curl -vH "Authorization: Bearer ${RHDH_TOKEN}" http://localhost:7007/api/${{values.plugin_id}}/hello
```

You can also serve the plugin in isolation by running `yarn start` in the plugin directory.
This method of serving the plugin provides quicker iteration speed and a faster startup and hot reloads.
It is only meant for local development, and the setup for it can be found inside the [/dev](/dev) directory.