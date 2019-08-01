# node-builda

🚧 Command line tool for build node js boiler plate. 🚧

## Usage

```
node-builda <app-name> [options]
```

## Example

```
node-builda node-service -f express -d mongodb -m [lodash, zeromq]
```

## Documentation

Here a list of options available for the first release:

```
    -f,     --framework <moduleName>    Use specific nodejs framework (express, koa, null)
    -d,     -db <dbName>                Use specific database with orm (mongodb, null)
    --m,    --modules [<moduleName>]    Add list of modules to package.json
```

Here a list of options for the future:

```
    -l,     --linter        Add linter config (by default standardJs)
    -t,     --typescript    Add typescript config
```