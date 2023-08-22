import path = require("path");
import fs = require("fs");
import { Filesystem, FilesystemObject } from ".";
import { config } from "../config";

export class LocalFilesystem implements Filesystem {
  private storageDirectoryName: string = "storage";

  async putObject(file: Express.Multer.File): Promise<FilesystemObject> {
    const id = new Date().getTime() + "-" + file.originalname;

    fs.writeFileSync(
      path.join(__dirname, `../public/${this.storageDirectoryName}/`, id),
      file.buffer
    );

    return {
      id,
      url: this.generateUrl(id),
    };
  }

  async getObjects(): Promise<FilesystemObject[]> {
    const storage = path.join(
      __dirname,
      `../public/${this.storageDirectoryName}/`
    );
    const fileNames = fs.readdirSync(storage);
    const objects: FilesystemObject[] = [];

    for (const fileNameId of fileNames) {
      objects.push({
        id: fileNameId,
        url: this.generateUrl(fileNameId),
      });
    }

    return objects;
  }

  private generateUrl(id: string): string {
    return `${config.serverHost}:${config.serverPort}/${this.storageDirectoryName}/${id}`;
  }
}
