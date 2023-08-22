import * as express from "express";
import { config } from "./config";
import * as multer from "multer";
import * as cors from "cors";
import { Filesystem } from "./filesystems";
import { MinioFilesystem } from "./filesystems/minio";
import { UploadFileController } from "./controllers/upload-file.controller";
import { GetFilesController } from "./controllers/get-files.controller";
import path = require("path");
import { LocalFilesystem } from "./filesystems/local";

const app = express();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Select filesystem to inject
const filesystem: Filesystem = ((): Filesystem => {
  if (config.filesystems.selected == "minio") {
    return new MinioFilesystem();
  }

  if (config.filesystems.selected == "local") {
    return new LocalFilesystem();
  }

  // Default
  return new LocalFilesystem();
})();

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.post("/files", upload.single("file"), (req, res) =>
  new UploadFileController(filesystem).handle(req, res)
);

app.get("/files", (req, res) =>
  new GetFilesController(filesystem).handle(req, res)
);

app.listen(config.serverPort, () => {
  console.log(
    `Servidor escuchando en ${config.serverHost}:${config.serverPort}`
  );
});
