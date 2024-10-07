import { Worker } from "worker_threads";
import os from "os";

const performCalculations = async () => {
  const numCPUs = os.cpus().length;
  const workers = [];
  const results = [];

  for (let i = 0; i < numCPUs; i++) {
    const worker = new Worker(new URL("./worker.js", import.meta.url));
    workers.push(worker);

    const numberToSend = 10 + i;
    worker.postMessage(numberToSend);

    worker.on("message", (result) => {
      results[i] = result;
      worker.terminate();
    });

    worker.on("error", () => {
      results[i] = { status: "error", data: null };
      worker.terminate();
    });

    worker.on("exit", (code) => {
      if (code !== 0 && results[i] === undefined) {
        results[i] = { status: "error", data: null };
      }
    });
  }

  await Promise.all(
    workers.map(
      (worker) =>
        new Promise((resolve) => {
          worker.on("exit", resolve);
        })
    )
  );

  console.log(results);
};

await performCalculations();
