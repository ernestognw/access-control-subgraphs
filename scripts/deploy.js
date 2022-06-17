const { spawn } = require("child_process");
const { existsSync, readdirSync } = require("fs");
const { join } = require("path");

const GENERATED_DIR = join(__dirname, "../generated");

const deploy = (generated) =>
  new Promise((resolve) => {
    const subgraphManifestPath = join(
      GENERATED_DIR,
      generated,
      "access-control.subgraph.yaml"
    );
    const { product, name } = require(join(
      GENERATED_DIR,
      generated,
      "deploy.json"
    ));
    const outputPath = join(GENERATED_DIR, generated);
    const ls = spawn("npx", [
      "graph",
      "deploy",
      "--output-dir",
      outputPath,
      "--product",
      product,
      name,
      subgraphManifestPath,
    ]);
    ls.stdout.on("data", (data) => console.log(data.toString()));
    ls.stderr.on("data", (data) => console.error(data.toString()));
    ls.on("close", resolve);
  });

const run = async () => {
  if (!existsSync(GENERATED_DIR)) {
    console.error(
      `Path ${GENERATED_DIR} doesn't exist.`,
      "Did you forget to run yarn build?"
    );
    process.exit(1);
  }
  const deploys = readdirSync(GENERATED_DIR).map((generated) =>
    deploy(generated)
  );
  await Promise.all(deploys);
};

run();
