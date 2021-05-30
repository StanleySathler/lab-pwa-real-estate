const path = require("path");
const { Storage } = require("@google-cloud/storage");

const ROOT_PATH = path.join(__dirname, "../../");
const TAR_FILE_NAME = `server-${process.env.GITHUB_REF_SLUG}.tgz`;
const BUCKET_NAME = "pr-server-tars";

const client = new Storage({
  projectId: "lab-pwa-real-estate",
  keyFilename: path.join(__dirname, "./google-service-account.json"),
});

const upload = async () => {
  return await client
    .bucket(BUCKET_NAME)
    .upload(path.join(ROOT_PATH, TAR_FILE_NAME), {
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

(async () => {
  await upload();
  const link = await generateDownloadLink();
  console.log(link);
})();
