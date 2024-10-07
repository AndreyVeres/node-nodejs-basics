import fs from "fs";
import { createHash } from "crypto";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const calculateHash = async () => {
  const filePath = join(__dirname, "files", "fileToCalculateHashFor.txt");
  const hash = createHash("sha256");
  const stream = fs.createReadStream(filePath);

  stream.on("data", (chunk) => {
    hash.update(chunk);
  });

  stream.on("end", () => {
    const hexHash = hash.digest("hex");
    console.log(`SHA256 hash of ${filePath}: ${hexHash}`);
  });

  stream.on("error", (err) => {
    console.error(`Error reading file: ${err.message}`);
  });
};

await calculateHash();
