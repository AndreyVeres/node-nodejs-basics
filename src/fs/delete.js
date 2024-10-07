import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const remove = async () => {
  const filePath = path.join(__dirname, "files", "fileToRemove.txt");
  try {
    await fs.access(filePath);
    await fs.unlink(filePath);
  } catch (err) {
    throw new Error("FS operation failed: File does not exist");
  }
};

await remove();
