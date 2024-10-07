import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rename = async () => {
  const filePath = join(__dirname, "files", "wrongFilename.txt");
  const newFilePath = join(__dirname, "files", "properFilename.md");

  try {
    await fs.access(newFilePath);
    throw new Error(`FS operation failed: file already exists.`);
  } catch (err) {
    if (err.code !== "ENOENT") {
      throw err;
    }
  }

  try {
    await fs.access(filePath);
    fs.rename(filePath, newFilePath);
  } catch (error) {
    throw new Error("FS operation failed: File does not exist");
  }
};

await rename();
