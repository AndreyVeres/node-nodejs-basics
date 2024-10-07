import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const fileContent = "I am fresh and young";

const create = async () => {
  const filePath = join(__dirname, "files", "fresh.txt");

  try {
    await fs.access(filePath);
    throw new Error("FS operation failed: File already exists");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.writeFile(filePath, fileContent);
};

await create();
