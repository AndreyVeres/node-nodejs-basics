const parseArgs = () => {
  for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i].startsWith("--") && process.argv[i + 1]) {
      const key = process.argv[i].slice(2);
      const value = process.argv[i + 1];
      console.log(key + " -- " + value);
      i++;
    }
  }
};

parseArgs();
