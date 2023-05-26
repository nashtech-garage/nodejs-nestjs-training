# NestJS Training.

This repository for NestJS training of NodeJS Team.

## Slide folder

We store training document in folder `/slide`

## How to run this

Clone the project then open terminal

```
cd demo/nestjs-course
npm install
```

Finally start project by

```
npm run start:dev
```

## Environment

The env file is locate at: `demo/nestjs-course/src/core/config/env/.development.env`

## Mirage database:

To mirage database please setup your DATABASE_URL in environment file

Then install dotenv-cli

```
npm install -g dotenv-cli
```

Finally execute command bellow to mirage database

```
npm run migrate:postgres
```
