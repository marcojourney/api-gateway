<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://avatars.githubusercontent.com/u/181590366?s=400&u=48e6e52f42236e212cdb47a386878fccc77b0345&v=4" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">ERP HUB API Gateway is a NestJS-based gateway that routes and secures ERP microservice communication.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## 🧭 ERP HUB API Gateway

ERP HUB API Gateway is a centralized gateway service built with NestJS to handle and route all incoming requests to microservices within the ERP system. It acts as the single entry point for external clients and internal modules, enforcing security, observability, configuration management, and performance optimization.

## 🧱 Tech Stack

- **NestJS** – Scalable Node.js framework
- **Axios** via `@nestjs/axios` – For service-to-service HTTP communication
- **Custom Configuration Service** – Dynamic `.env`-like configs from database
- **TypeORM** – For database interaction
- **Redis (Optional)** – For response/config caching
- **Helmet & Compression** – Security and performance enhancements

## 🔌 Core Features

- ✅ **Dynamic Routing** to stock, HR, accounting, and other services
- 🔐 **Safe Header Forwarding** to protect downstream services
- 🧩 **Trace ID Injection** for request tracing across microservices
- ⚡ **Keep-Alive + Retry**-enabled HTTP clients for performance
- 🧠 **Centralized Config Table** to manage `.env`-like configs at runtime
- 🔍 **Request Filtering Middleware** for header and payload hygiene
- 📈 **Scalable Architecture** designed for enterprise ERP platforms


## 🔐 Security & Stability Features

This API Gateway is enhanced with several production-grade features to ensure better security, stability, and resilience:

### 🚦 Rate Limiting

- **Purpose:** Prevent abuse, brute-force attacks, and excessive requests from clients.
- **Implementation:** Utilizes `@nestjs/throttler` with `Redis` as distributed storage.
- **Configurable Values:**
  - `THROTTLE_TTL` – Time-to-live in seconds (e.g., `60`)
  - `THROTTLE_LIMIT` – Max requests within the TTL (e.g., `5`)
- **Tracker Logic:** Supports custom tracking via user ID, API key, or IP.

### 🌐 Cross-Origin Resource Sharing (CORS)

- **Purpose:** Allows controlled access from different origins (e.g., frontend apps).
- **Implementation:** Configured using NestJS CORS setup.
- **Settings:**
  - Origins allowed: `*` (or specific domains)
  - Methods: `GET, POST, PUT, DELETE, OPTIONS`
  - Headers: `Content-Type, Authorization`

### 🕵️‍♂️ Sensitive Data Masking

- **Purpose:** Prevent sensitive data (e.g., passwords, tokens) from being exposed in logs or responses.
- **Implementation:**
  - Middleware or interceptor masks fields such as:
    - `password`
    - `token`
    - `pin`
    - `creditCardNumber`
  - Can be extended with custom masking rules.

### ✅ Health Check Endpoint

- **Endpoint:** `GET /health`
- **Rate Limited:** Yes – 5 requests per minute
- **Response:**
  ```json
  { "ok": true }


## 📦 Modules Communicated (via HTTP)

- `Stock-Service`
- `HR-Service`
- `Accounting-Service`
- *(More coming soon)*


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Conventional Commit Format


- **type**: the kind of change you're making.
- **scope** (optional): the area of the codebase the change affects.
- **summary**: a brief description of the change, written in **imperative mood** (e.g., "add", "fix", not "added" or "fixed").

---

### 🔧 Common Types

| Type     | Description                                      |
|----------|--------------------------------------------------|
| `feat`   | A new feature                                     |
| `fix`    | A bug fix                                         |
| `docs`   | Documentation changes                             |
| `style`  | Code style changes (formatting, etc.)             |
| `refactor` | Code refactoring (no functionality change)     |
| `test`   | Adding or updating tests                          |
| `chore`  | Maintenance tasks (build tools, configs, etc.)    |
| `perf`   | Performance improvements                          |
| `build`  | Changes that affect the build system              |
| `ci`     | Changes to CI/CD pipelines                        |

---

## 📝 License

This project is licensed under the **CC BY-NC 4.0 License** — for **non-commercial use only**.  
See the [LICENSE](./LICENSE) file for details.

## 📚 Resources
- Conventional Commits Official Site (https://www.conventionalcommits.org/)
- Semantic Release (https://semantic-release.gitbook.io/)
- Git Commit Message Guidelines (Chris Beams) (https://chris.beams.io/posts/git-commit/)
