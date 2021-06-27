### About this project

It's an app that lists properties on sale. It uses an **offline-first** approach.

It's just a toy project and not intended to be a real product.

### Technologies

There's a **client** and a **server**.

The _client_ is built with **Vanilla JS**. The build tool is **webpack**.

The _server_ is built with **NodeJS** & **Express**. No databases.

For an offline-first approach we use a **Service Worker** and the **Cache API**.

The UI components were modularized in a way that resembles how React works - but in a much more simpler approach.

### CI/CD

On each PR we deploy a Review App to **Heroku** and **Vercel**. We can't use their auto-deploy feature since Vercel depends on the URL given by Heroku.

This gives us a full isolated environment for testing specific changes in each PR.
