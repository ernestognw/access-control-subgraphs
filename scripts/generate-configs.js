const { rmSync, mkdirSync, writeFileSync, readFileSync } = require("fs");
const { join } = require("path");
const networks = require("../utils/networks-mapping.json");

const GENERATED_DIR = join(__dirname, "../generated");

const run = () => {
  rmSync(GENERATED_DIR, { recursive: true, force: true });
  mkdirSync(GENERATED_DIR);

  const configTemplate = readFileSync(
    join(__dirname, "../utils/config-template.json")
  );

  Object.entries(networks).forEach(([defenderName, networkConfig]) => {
    // Some defender supported networks don't have a mapping to the graph
    if (!networkConfig) return;

    const networkDir = join(GENERATED_DIR, defenderName);
    mkdirSync(networkDir);

    const config = configTemplate
      .toString()
      .replaceAll("{{GRAPH_NAME}}", networkConfig.graphName)
      .replaceAll("{{DEFENDER_NAME}}", defenderName);

    writeFileSync(join(networkDir, "config.json"), config);
    writeFileSync(
      join(networkDir, "deploy.json"),
      JSON.stringify(networkConfig.deploy)
    );

    console.info(`${defenderName} config created`);
  });
};

run();
