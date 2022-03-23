<h1 align="center">Vote up</h1>

## **Contributing**

The best way to achieve this is together! That's why we are on GitHub. We would love contributions from the community (bug reports, feature requests, suggestions, Pull Requests, whatever you want!).

[Yarn](https://classic.yarnpkg.com/en/docs/cli/) is used as package manager.

To setup your local dev environment:

1. Install [Yarn](https://classic.yarnpkg.com/en/docs/install)

2. Clone repository:

```sh
git clone git@github.com:ctrlup-io/vote-up-server.git
cd vote-up-server
```

3. Install dependencies:

```sh
yarn install
```

4. See [more available scripts](README.md#scripts)

## **Available Scripts**

In the project directory, you can run:

### **`commit`**

Runs the [`git-cz`](https://github.com/streamich/git-cz) CLI to generate commit messages according to the [_Conventional Commit specifications_](https://www.conventionalcommits.org/en/v1.0.0/#specification).

### **`format`**

Runs [Prettier](https://prettier.io/) with [basic configuration](https://prettier.io/docs/en/configuration.html#basic-configuration).

We recommend to use Prettier in your IDE, e.g. in Visual Studio code with [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

### **`lint`**

Runs [ESLint](https://eslint.org/) with [standard configuration](https://standardjs.com/).

### **`release:dry`**

> ✅ **Prerequisites**  
> Set [required environment variables](README.md#environment-variables): `GITHUB_TOKEN`.

Runs [Semantic Release](https://semantic-release.gitbook.io/semantic-release/) in dry-run mode. It allows you to preview the pending release.

## **Environment variables**

1. Create (or reset) a non-versioned [`.env` file](.env) using the template in [`.env.example` file](.env.example):

```sh
cp .env.example .env
```

2. Set the following environment variables:

- `GITHUB_TOKEN` to allow Semantic Release in [Dru-run mode](https://semantic-release.gitbook.io/semantic-release/usage/configuration#dryrun) to verify the repository push permission
- `APP_URI`
- `GOOGLE_APPLICATION_CREDENTIALS`
- `NODE_ENV`
- `PORT`
