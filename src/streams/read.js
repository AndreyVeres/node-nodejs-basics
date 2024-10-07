import fs from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");
  const stream = fs.createReadStream(filePath, { encoding: "utf8" });

  stream.on("data", (chunk) => process.stdout.write(chunk));

  stream.on("error", (err) => {
    process.stdout.write("File read error:", err);
  });

  stream.on("end", () => {
    process.stdout.write("\nFile read end.");
  });
};

await read();
