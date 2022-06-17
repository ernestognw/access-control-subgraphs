const { spawn } = require("child_process");
const { existsSync, readdirSync } = require("fs");
const { join } = require("path");

const GENERATED_DIR = join(__dirname, "../generated");

const compile = (config) =>
  new Promise((resolve) => {
    const configPath = join(GENERATED_DIR, config, "config.json");
    const includePath = join(
      __dirname,
      "../node_modules/@openzeppelin/subgraphs/src/datasources"
    );

    const ls = spawn("npx", [
      "graph-compiler",
      "--config",
      `${configPath}`,
      "--include",
      `${includePath}`,
      "--root",
      join(__dirname, "../"),
      "--export-schema",
      "--export-subgraph",
    ]);
    ls.stdout.on("data", (data) => console.log(data.toString()));
    ls.stderr.on("data", (data) => console.error(data.toString()));
    ls.on("close", resolve);
  });

const run = async () => {
  if (!existsSync(GENERATED_DIR)) {
    console.error(
      `Path ${GENERATED_DIR} doesn't exist.`,
      "Did you forget to run yarn generate:configs?"
    );
    process.exit(1);
  }
  const compiles = readdirSync(GENERATED_DIR).map((config) => compile(config));
  await Promise.all(compiles);
};

run();
