# REsell API

## Requirements

* NodeJS >= 14

## Setup

Install Dependencies

```sh
npm install
```

Create Postgresql user

```
postgres=# CREATE ROLE resell WITH LOGIN PASSWORD 'resell';
postgres=# ALTER ROLE resell CREATEDB SUPERUSER;
```

If the user should not be a superuser create UUID extension on databases

```
resell_dev=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
resell_test=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
resell_prod=# CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

## Usage

Start Server

```sh
npm start
```
