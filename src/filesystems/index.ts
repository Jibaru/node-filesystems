export interface FilesystemObject {
  id: string;
  url: string;
}

export interface Filesystem {
  putObject(file: Express.Multer.File): Promise<FilesystemObject>;
  getObjects(): Promise<FilesystemObject[]>;
}
