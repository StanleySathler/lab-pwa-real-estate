const core = require("@actions/core");

const Heroku = require("heroku-client");
const client = new Heroku({ token: core.getInput("heroku-api-key") });

const storage = require("./storage");

/**
 * @todo: move this secret data to env
 */
const PIPELINE_ID = core.getInput("pipeline-id");
const AUTH_TOKEN = core.getInput("heroku-api-key");
const BRANCH_NAME = core.getInput("branch-name");

const defaultOptions = {
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
};

const listReviewApps = async () =>
  client.get(`/pipelines/${PIPELINE_ID}/review-apps`, defaultOptions);

const pollUntilDeleted = (app) => {
  return new Promise((resolve, reject) => {
    let fetchCount = 0;

    const fetchAndCheck = () => {
      client.delete(`/review-apps/${app.id}`, defaultOptions).then((res) => {
        core.info(`Polling deletion process - last status: ${res.status}`);

        fetchCount++;

        if (res.status === "deleted") resolve(res);
        else if (fetchCount > 5) reject("Deletion polling timed out!");
        else setTimeout(fetchAndCheck, 5000);
      });
    };

    setTimeout(fetchAndCheck, 5000);
  });
};

const deleteReviewApp = async (app) => {
  core.info("Removing Review App for this PR.");
  const res = await client.delete(`/review-apps/${app.id}`, defaultOptions);
  core.debug(res);
  await pollUntilDeleted(app);
  core.info("Review App for this PR removed.");
};

const createReviewApp = async (sourceUrl) =>
  client.post("/review-apps", {
    ...defaultOptions,
    body: {
      branch: BRANCH_NAME, // todo: use env
      pipeline: PIPELINE_ID, // todo: move to secrets
      pr_number: Number(core.getInput("pr-number")),
      source_blob: { url: sourceUrl, version: "0.0.1" },
    },
  });

const findByBranch = (apps, branch) => apps.find((a) => a.branch === branch);

const createApp = async (sourceUrl) => {
  const currentBranch = BRANCH_NAME;
  const apps = await listReviewApps();
  const app = findByBranch(apps, currentBranch);

  core.debug(`currentBranch: ${currentBranch}`);
  core.debug(apps);

  if (app) {
    core.info("A Review App for this PR exists.");
    await deleteReviewApp(app);
  }

  await createReviewApp(sourceUrl);
};

const run = async () => {
  try {
    const appName = core.getInput("heroku-app-name");
    const sourcePath = core.getInput("source-code-dir");

    core.info(`Publishing to Storage | source-code-dir: ${sourcePath}`);
    const sourceUrl = await storage.publish(sourcePath);

    core.info(`Creating Review App | sourceUrl: ${sourceUrl}`);
    await createApp(sourceUrl);

    core.setOutput("app-url", `https://${appName}.herokuapp.com`);
    core.info(`Heroku Review App was created!`);
  } catch (err) {
    console.error(err);
    core.setFailed(`Failed to run this action: ${err}`);
  }
};

run();
