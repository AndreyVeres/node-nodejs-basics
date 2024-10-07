import { Transform } from "stream";

const transform = async () => {
  const reverseStream = new Transform({
    transform(chunk, _, callback) {
      const reversed = chunk.toString().split("").reverse().join("");
      callback(null, reversed);
    },
  });

  console.log("Enter text (Press Ctrl+C to stop):");

  process.stdin.pipe(reverseStream).pipe(process.stdout);

  process.stdin.on("error", (err) => {
    console.error("Error reading from stdin:", err);
  });

  reverseStream.on("error", (err) => {
    console.error("Error processing stream:", err);
  });
};

await transform();
