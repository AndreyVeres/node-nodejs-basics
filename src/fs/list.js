import { promises as fs } from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const list = async () => {
  const folderPath = path.join(__dirname, "files");

  try {
    await fs.access(folderPath);
  } catch (err) {
    throw new Error("FS operation failed");
  }

  const files = await fs.readdir(folderPath);
  console.log(files);
};

await list();
