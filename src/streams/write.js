import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { Writable } from "stream";

const write = async () => {
  const filePath = join(__dirname, "files", "fileToWrite.txt");
  const writableStream = fs.createWriteStream(filePath);

  const stdinStream = new Writable({
    write(chunk, encoding, callback) {
      writableStream.write(chunk, encoding, callback);
    },
  });

  process.stdin.pipe(stdinStream);

  writableStream.on('data' , () => {
    console.log('started')
  })

  writableStream.on("finish", () => {
    console.log("Data has been written to fileToWrite.txt");
  });
};

await write();
