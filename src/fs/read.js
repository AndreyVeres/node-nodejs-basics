import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const read = async () => {
  const filePath = join(__dirname, "files", "fileToRead.txt");

  try {
    await fs.access(filePath);
  } catch (err) {
    throw new Error("FS operation failed: File does not exist");
  }

  const content = await fs.readFile(filePath, { encoding: "utf-8" });
  console.log(content);
};

await read();
