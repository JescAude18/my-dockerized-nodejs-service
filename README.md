# my-dockerized-nodejs-service

A small Node.js HTTP service with a public health-style endpoint and a Basic Authentication-protected secret endpoint.

## Table of Contents

- [Requirements](#requirements)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
  - [`GET /`](#get-)
  - [`GET /secret`](#get-secret)
  - [Unknown routes](#unknown-routes)
- [Authentication](#authentication)

## Requirements

- Node.js 20.6.0 or later, because the service uses Node.js's built-in `--env-file` option.

## Configuration

Create a `.env` file in the project root with the credentials and message used by the protected endpoint:

```env
APP_USERNAME=Nodejser
APP_PASSWORD=1234
SECRET_MESSAGE=This is a secret message.
```

Do not commit real credentials or other sensitive values to version control.

## Running the Service

Install the project dependencies and start the server:

```bash
npm install
npm start
```

The service listens on port `3000` and is available at <http://localhost:3000>.

## API Endpoints

### `GET /`

Returns a plain-text greeting with HTTP status `200`.

```bash
curl http://localhost:3000/
```

Expected response:

```text
Hello, world!
```

### `GET /secret`

Requires valid HTTP Basic Authentication. With the example configuration:

```bash
curl -u Nodejser:1234 http://localhost:3000/secret
```

Valid credentials return `SECRET_MESSAGE` with HTTP status `200`. Missing, unsupported, or invalid credentials return HTTP status `401`.

### Unknown routes

Any other route returns `Not found!` with HTTP status `404`.

## Authentication

The `/secret` endpoint expects an `Authorization` header in this format:

```text
Authorization: Basic <base64(username:password)>
```

The username and password are compared with `APP_USERNAME` and `APP_PASSWORD` from the environment. The service currently supports only the `Basic` authentication scheme.
