import { spawn } from "child_process";
import { stdin, stdout } from "process";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (...args) => {
  console.log(args, "args");
  const child = spawn(
    "node",
    [join(__dirname, "files", "script.js"), ...args],
    {
      stdio: ["pipe", "pipe", "pipe"],
    }
  );
  stdin.pipe(child.stdin);

  child.stdout.pipe(stdout);
  child.stderr.on("data", (data) => {
    console.error(`Child stderr: ${data}`);
  });
  child.on("exit", (code) => {
    console.log(`Child process exited with code ${code}`);
  });
};

spawnChildProcess(123, 456, 789);
