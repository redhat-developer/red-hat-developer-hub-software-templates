# Guide to kickstart backend-end plugin development

This Software Template guides you to kickstart your back-end plugin development with fewer clicks.

Note: The template allows only `github.com` as host

## Getting started

This template gathers essential information from the user, such as the plugin ID, repository owner, and the repository name. It then checks if the repository already exists or if the user wants to create a new one. Upon execution, the template generates a folder structure with all the necessary files, dependencies, UI components, and unit tests to help you get started. This same folder structure is also created when you run `yarn new --select backend-plugin` using the [Backstage CLI](https://backstage.io/docs/tooling/cli/commands#new). The template includes plugin two routes examples:

* /health: A simply unauthenticated route that returns the JSON `{"status" : "ok"}`;
* /message: A route that requires authentication and returns the JSON `{ "message": "Hello User" }`. where User is the logged using user.

For more details on plugin development, check out the official [Backstage documentation](https://backstage.io/docs/plugins/).