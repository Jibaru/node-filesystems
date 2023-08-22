import * as dotenv from "dotenv";

dotenv.config();

export const config = {
  serverHost: process.env.SERVER_HOST,
  serverPort: process.env.SERVER_PORT,
  filesystems: {
    selected: process.env.FILESYSTEM,

    minio: {
      endpoint: "minio",
      port: 9000,
      bucket: process.env.MINIO_BUCKET,
      folder: process.env.MINIO_FOLDER,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
  },
};
