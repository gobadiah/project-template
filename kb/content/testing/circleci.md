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

* `VAULT_TOKEN`: gives circleci access to the vault.

Here is how to generate a token for circleci :

```
vault write auth/token/create/circleci \
  policies=circleci-global-policy \
  ttl=72h \
  renewable=true \
  periodic=true
```

This will create a periodic token, meaning it can lasts for ever, as long as it is renewed periodically
faster than the ttl. The token is renewed automatically in circleci script, which is run for each build.
This does mean that if no build is run for a duration equal to the ttl, the token will expire, and
subsequent builds will fail. At that time a new token will have to be generated using the command above.

### Config file explained

The config file is a [YAML](https://en.wikipedia.org/wiki/YAML) file describing how circleci builds,
tests and deploys our project.

There are workflows 
