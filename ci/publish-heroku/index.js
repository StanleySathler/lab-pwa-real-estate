const Heroku = require("heroku-client");
const client = new Heroku({ token: process.env.HEROKU_API_KEY });

console.log("GITHUB_REF_SLUG", process.env.GITHUB_REF_SLUG);

const PIPELINE_ID = "6f0589a9-927b-4d01-add3-642b8fdb479a";

// client
//   .post("/review-apps", {
//     headers: {
//       Authorization: "Bearer aa9af670-a72c-4898-9e53-df0a4e1cec0b", // todo: move to secrets
//       Accept: "application/vnd.heroku+json; version=3",
//       "Content-Type": "application/json",
//     },
//     body: {
//       branch: process.env.GITHUB_REF_SLUG, // todo: use env
//       pipeline: PIPELINE_ID, // todo: move to secrets
//       source_blob: { url: process.env.SOURCE_URL, version: "0.0.1" },
//     },
//   })
//   .then(() => {
//     console.log("Review App deployed!!");
//   })
//   .catch(console.log);

(async () => {
  try {
    // fetch existent apps
    const apps = await client.get(`/pipelines/${PIPELINE_ID}/review-apps`, {
      headers: { Authorization: "Bearer aa9af670-a72c-4898-9e53-df0a4e1cec0b" },
    });

    console.log(apps);

    // get app for this branch
    let app = apps.find((a) => a.branch === process.env.GITHUB_REF_SLUG);

    // if already exists, remove it first
    if (app)
      await client.delete(`/review-apps/${app.id}`, {
        headers: {
          Authorization: "Bearer aa9af670-a72c-4898-9e53-df0a4e1cec0b",
        },
      });

    // create review app
    app = await client.post("/review-apps", {
      headers: {
        Authorization: "Bearer aa9af670-a72c-4898-9e53-df0a4e1cec0b", // todo: move to secrets
        Accept: "application/vnd.heroku+json; version=3",
        "Content-Type": "application/json",
      },
      body: {
        branch: process.env.GITHUB_REF_SLUG, // todo: use env
        pipeline: "6f0589a9-927b-4d01-add3-642b8fdb479a", // todo: move to secrets
        source_blob: { url: process.env.SOURCE_URL, version: "0.0.1" },
      },
    });

    console.log(app);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
