import * as Minio from "minio";
import { Filesystem, FilesystemObject } from ".";
import { config } from "../config";

export class MinioFilesystem implements Filesystem {
  private minioClient: Minio.Client;

  constructor() {
    this.minioClient = new Minio.Client({
      endPoint: config.filesystems.minio.endpoint,
      port: config.filesystems.minio.port,
      useSSL: false,
      accessKey: config.filesystems.minio.accessKey,
      secretKey: config.filesystems.minio.secretKey,
    });
  }

  public async putObject(file: Express.Multer.File): Promise<FilesystemObject> {
    return new Promise((resolve, reject) => {
      this.minioClient.putObject(
        config.filesystems.minio.bucket,
        config.filesystems.minio.folder + "/" + file.originalname,
        file.buffer,
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            console.log(data);
            resolve({
              id: data.etag,
              url: this.generateUrl(
                config.filesystems.minio.folder + "/" + file.originalname
              ),
            });
          }
        }
      );
    });
  }

  public async getObjects(): Promise<FilesystemObject[]> {
    const filesystemObjects: FilesystemObject[] = [];

    return new Promise((resolve, reject) => {
      this.minioClient
        .listObjects(config.filesystems.minio.bucket, "", true)
        .on("data", (obj) => {
          const filesystemObject: FilesystemObject = {
            id: obj.etag,
            url: this.generateUrl(obj.name),
          };
          filesystemObjects.push(filesystemObject);
        })
        .on("end", () => {
          resolve(filesystemObjects);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  }

  private generateUrl(name: string): string {
    return `${config.serverHost}:${config.filesystems.minio.port}/${config.filesystems.minio.bucket}/${name}`;
  }
}
