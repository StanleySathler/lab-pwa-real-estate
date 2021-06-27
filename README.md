## What

This is a small toy app that lists fake properties on sale. It's not indended to be a real product.

The main idea behind this project is to practice 2 things:

1. Offline-first approach. We're using a **Service Worker** and the **Cache API** to cache resources and data.
2. GitHub Actions. We're auto-deploying to **Heroku** and **Vercel**. We can't use their auto-deploy feature (explained below), so we wrote actions that deploy to Heroku, then to Vercel, and make Vercel point to the correct Heroku app.

## Design: Solutions & Limitations

### Heroku

We wanted to support Review Apps so each PR has an isolated environment so that we can easily test any change.

But Heroku's auto-deploy feature doesn't work fine with monorepos. They expect to find the Node.js project at the root folder, which is not the case for monorepos. They don't allow us to customize it.

To work around that, we use Heroku API to manually deploy a Review App. Since the API expects a tarball file with the source code, you can zip only your Node.js project. It works.

### Vercel

Each Review App on Vercel needs to point to its corresponding Review App on Heroku.

This means before deploying to Vercel we need to deploy to Heroku, get the URL, and then inject into the client project.

To "inject" we just set a custom env var to Vercel while deploying it.

This means we can't their auto-deploy feature too, 'cause we first need to wait for Heroku to deploy.

## Improvements

- [ ] Make Heroku deploy a Staging app as soon as a code is merged into `main`.
- [ ] Make Vercel deploy a Production app as soon as a code is merged into `main`.
