# CircleCI

[CircleCI](https://circleci.com/) provides Continuous Integration as a Service, as well as
continuous deployment if needed.

Each time someone push to a repository, a new workflow is started on circle ci, with different
jobs, allowing to automatically build, test and deploy each component of the project.

## Configuration

CircleCI configuration file resides at `<project-root>/.circleci/config.yml`, and documentation
can be found [here](https://circleci.com/docs/2.0/).

### Environment variables

The following environment variables need to be set in circleci:

* `PROJECT`: `project-template`

### Config file explained

The config file is a [YAML](https://en.wikipedia.org/wiki/YAML) file describing how circleci builds,
tests and deploys our project.

There are workflows 
