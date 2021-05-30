const core = require("@actions/core");

const Heroku = require("heroku-client");
const client = new Heroku({ token: core.getInput("herokou-api-key") });

const storage = require("./storage");

/**
 * @todo: move this secret data to env
 */
const PIPELINE_ID = "6f0589a9-927b-4d01-add3-642b8fdb479a";
const AUTH_TOKEN = "aa9af670-a72c-4898-9e53-df0a4e1cec0b";

const baseHeaders = {
  Authorization: `Bearer ${AUTH_TOKEN}`,
};

const listReviewApps = async () =>
  client.get(`/pipelines/${PIPELINE_ID}/review-apps`, baseHeaders);

const deleteReviewApp = async (app) =>
  client.delete(`/review-apps/${app.id}`, baseHeaders);

const createReviewApp = async (sourceUrl) =>
  client.post("/review-apps", baseHeaders, {
    body: {
      branch: process.env.GITHUB_REF_SLUG, // todo: use env
      pipeline: PIPELINE_ID, // todo: move to secrets
      source_blob: { url: sourceUrl, version: "0.0.1" },
    },
  });

const findByBranch = (apps, branch) => apps.find((a) => a.branch === branch);

const createApp = async (sourceUrl) => {
  const currentBranch = process.env.GITHUB_REF_SLUG;
  const apps = await listReviewApps();
  const app = findByBranch(apps, currentBranch);

  if (app) await deleteReviewApp(app);

  await createReviewApp(sourceUrl);
};

const run = async () => {
  try {
    const sourcePath = core.getInput("source-code-dir");

    core.info(`Publishing to Storage | source-code-dir: ${sourcePath}`);
    const sourceUrl = await storage.publish(sourcePath);

    core.info(`Creating Review App | sourceUrl: ${sourceUrl}`);
    await createApp(sourceUrl);

    core.info(`Heroku Review App was created!`);
  } catch (err) {
    console.error(err);
    core.setFailed(`Failed to run this action: ${err}`);
  }
};

run();