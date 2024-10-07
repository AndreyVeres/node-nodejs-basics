import fs from "fs";
import zlib from "zlib";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const decompress = async () => {
  const inputFile = join(__dirname, "files", "archive.gz");
  const outputFile = join(__dirname, "files", "fileToCompress.txt");

  const inputStream = fs.createReadStream(inputFile);
  const outputStream = fs.createWriteStream(outputFile);
  const gunzip = zlib.createGunzip();
  inputStream.pipe(gunzip).pipe(outputStream);

  return new Promise((resolve, reject) => {
    outputStream.on("finish", resolve);
    outputStream.on("error", reject);
  });
};

await decompress();
