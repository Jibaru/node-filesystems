import { Request, Response } from "express";
import { Filesystem, FilesystemObject } from "../filesystems";

export class GetFilesController {
  constructor(private filesystem: Filesystem) {}

  public handle(_: Request, res: Response) {
    this.filesystem
      .getObjects()
      .then((filesystemObjects: FilesystemObject[]) => {
        return res.status(200).json({
          data: filesystemObjects,
        });
      })
      .catch((error) => {
        return res.status(500).json({
          message: "No se pudo listar los archivos",
          error,
        });
      });
  }
}
