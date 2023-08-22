# Filesystem NodeJS Example

Example of how to load files (images) in node with simple adapter pattern.

## Get started

1. Clone the `.env.example` to `.env`.
2. Create a `dist` folder in the root of the project.
3. Change `FILESYSTEM`value to `local`, `minio` depending on what you want to test.
4. Serve the project with `docker-compose up`.

## Usage with minio

1. Prepare your project following get started.
2. Run for the first time the project with `docker-compose up`.
3. Go to `localhost:9001` on a browser and enter with `admin123` and `admin123`.
4. Create a bucket with name `test`.
5. Access to the bucket and change policy to public.
6. Go to access key and create access key and secret, then put replace values of `MINIO_ACCESS_KEY` and `MINIO_SECRET_KEY` at `.env`.
7. Go to object browser and create new path called `images`.
8. Stop docker compose with `ctrl + c`, and run again.

## Upload files with frontend

Access to `http://localhost:3004`to upload and list your files.
