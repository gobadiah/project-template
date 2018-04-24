# Kb

Kb stands for knowledge base, it a set of markdown files containing general informations about the
project, guidelines, policies, etc ... These files can be served via [Raneto](http://raneto.com/),
a lightweight http node server for markdown.

## Install

```
yarn install
```

## Run

```
npm run start
```

_Notes_: Raneto's default port is 3000, like most node http server, it may conflicts with other
modules. In case of conflict, use `PORT=4000 npm run start`.
