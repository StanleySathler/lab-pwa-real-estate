const path = require("path");
const { Storage } = require("@google-cloud/storage");

const TAR_FILE_NAME = `server-${process.env.GITHUB_REF_SLUG}.tgz`;
const BUCKET_NAME = "pr-server-tars";

const client = new Storage();

const upload = async (sourcePath) => {
  return await client.bucket(BUCKET_NAME).upload(sourcePath, {
    destination: TAR_FILE_NAME,
  });
};

const generateDownloadLink = async () => {
  const url = await client
    .bucket(BUCKET_NAME)
    .file(TAR_FILE_NAME)
    .getSignedUrl({
      version: "v4",
      action: "read",
      expires: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

  return url[0];
};

const publish = async (sourcePath) => {
  await upload(sourcePath);
  return await generateDownloadLink();
};

module.exports = {
  publish,
};
