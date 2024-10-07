import fs from "fs";
import zlib from "zlib";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compress = async () => {
  const fileToCompress = join(__dirname, "files", "fileToCompress.txt");
  const outputFile = join(__dirname, "files", "archive.gz");
  const inputStream = fs.createReadStream(fileToCompress);
  const outputStream = fs.createWriteStream(outputFile);
  const gzip = zlib.createGzip();
  inputStream.pipe(gzip).pipe(outputStream);

  return new Promise((resolve, reject) => {
    outputStream.on("finish", resolve);
    outputStream.on("error", reject);
  });
};

await compress();
