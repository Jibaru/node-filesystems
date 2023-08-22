import { Request, Response } from "express";
import { Filesystem, FilesystemObject } from "../filesystems";

export class UploadFileController {
  constructor(private filesystem: Filesystem) {}

  public handle(req: Request, res: Response) {
    const file = req.file;

    if (!file) {
      return res
        .status(400)
        .json({ message: "No se proporcionó ningún archivo" });
    }

    this.filesystem
      .putObject(file)
      .then((data: FilesystemObject) => {
        return res.status(201).json({ data });
      })
      .catch((error) => {
        return res
          .status(500)
          .json({ message: "Error al subir el archivo a MinIO", error });
      });
  }
}
