# CircleCI

[CircleCI](https://circleci.com/) provides Continuous Integration as a Service, as well as continuous deployment if needed.

Each time someone push to a repository, a new workflow is started on circle ci, with different jobs, allowing to automatically test, build and deploy each component of the project.

## Configuration

CircleCI configuration file resides at `.circleci/config.yml`, and documentation can be found [here](https://circleci.com/docs/2.0/).

### Environment variables

In order to function properly, you need to set the following environment variables : 

* `PROJECT`: project name
* `CC_TEST_REPORTER_ID`: [Code Climate](https://codeclimate.com) test reporter id, found in test coverage section
