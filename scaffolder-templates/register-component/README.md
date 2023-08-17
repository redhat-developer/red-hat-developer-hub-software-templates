# Register existing component to Service Catalog

This template is intended to be used as a starting point for registering an existing repository to the Service Catalog.

Currently, it only supports repositories hosted on GitHub (both github.com and GitHub Enterprise are supported).

## Required GitHub permissions

The GitHub application or access token needs to have the following permissions:

- **Repository permissions**
  - **Contents**: **_Read & write_** - To be able to create a new branch and push files new `catalog-info.yaml` file into it.
  - **Pull requests**: **_Read & write_** - To be able to create pull requests with generated `catalog-info.yaml`.
  - **Commit statuses**: **_Read-only_** - To be able to clone private repositories.