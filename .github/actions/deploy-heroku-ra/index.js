const core = require("@actions/core");

const storage = require("./storage");
const heroku = require("./heroku");

const run = async () => {
  try {
    const appName = core.getInput("heroku-app-name");
    const sourcePath = core.getInput("source-code-dir");

    core.info(`Publishing to Storage | Source Local Path: ${sourcePath}`);
    const sourceUrl = await storage.publish(sourcePath);

    core.info(`Creating Review App | Source Public URL: ${sourceUrl}`);
    await heroku.create(sourceUrl);

    core.setOutput("app-url", `https://${appName}.herokuapp.com`);
    core.info(`Heroku Review App has been created!`);
  } catch (err) {
    console.error(err);
    core.setFailed(`Failed to run this action: ${err}`);
  }
};

run();
