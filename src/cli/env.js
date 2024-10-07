const parseEnv = () => {
  for (let key in process.env) {
    if (key.startsWith("RSS")) {
      console.log(process.env[key]);
    }
  }
};

parseEnv();
