import { promises as fs } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function copy() {
  const sourceDir = join(__dirname, "files");
  const destDir = join(__dirname, "files_copy");

  try {
    await fs.access(sourceDir);
  } catch {
    throw new Error("FS operation failed: Source folder does not exist");
  }

  try {
    await fs.access(destDir);
    throw new Error("FS operation failed: Destination folder already exists");
  } catch (error) {
    if (error.code !== "ENOENT") {
      throw error;
    }
  }

  await fs.mkdir(destDir, { recursive: true });

  async function copyFiles(src, dest) {
    const entries = await fs.readdir(src, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = join(src, entry.name);
      const destPath = join(dest, entry.name);

      const isDirectory = entry.isDirectory();

      if (isDirectory) {
        await fs.mkdir(destPath, { recursive: true });
        await copyFiles(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }
  }

  await copyFiles(sourceDir, destDir);
}

await copy();
