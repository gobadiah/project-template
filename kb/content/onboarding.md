# Onboarding

## Contents

* [Direnv](#direnv)

## Direnv

[Direnv](https://direnv.net/) allows for doing some actions when `cd`-ing into the project and
`cd`-ing out, like modifying the environment, your path (e.g. for easily using devops scripts).

### Macos

```
brew install direnv
```

### Ubuntu

```
sudo apt-get install -y direnv
```

### After

`cd` into the project, you should see a message looking like this:
_direnv: error .envrc is blocked. Run `direnv allow` to approve its content._

Enter

```
touch .env
direnv allow .
```

to enable the `.envrc` file. This must be done after any (infrequent) changes made to the file,
as well as the `.env` file.

The `.envrc` is version-controlled, however the `.env` file is not and should contain user-related
configuration variables (e.g. user-specific access token, ...).

## Module dependencies

For each module comprised in this project, please follow the install instructions present in each
`README.md` file at the module root.
