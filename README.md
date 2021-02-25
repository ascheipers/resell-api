# REsell API

## Requirements

* NodeJS >= 14
* PostgreSQL

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

Create an environment file (.env) in project root directory

```
# EXAMPLE VALUES:
DB_HOST=127.0.0.1
DB_USERNAME=resell
DB_PASSWORD=resell
HOST_NAME=localhost
HOST_PORT=8080
IMG_PATH=D:\semester8\web_interfaces\resell-api\resell-images
IMG_PATH_TEST=D:\semester8\web_interfaces\resell-api\resell-images-test
IMG_ROUTE=resell/images
JWT_SECRET=37ECB12E377028A29426C209E0D75BE462F1E88763052DB0D5E920908617D7E3
```

Create and migrate database

```sh
npm run db:create
npm run db:migrate
```

## Usage

Start Server

```sh
npm start
```
