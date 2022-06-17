# Access Control Subgraphs 👮🏻‍♂️

This repository is used to manage the [@openzeppelin/subgraphs](https://github.com/OpenZeppelin/openzeppelin-subgraphs)'s `accesscontrol` module deployed across [Defender available networks](https://docs.openzeppelin.com/defender/#networks)

## Getting started

To install dependencies, just run:

```bash
yarn
```

or

```bash
npm run install
```

Now go to the [network mapping](./utils/network-mapping.json), and customize the networks to be deployed. It's a mapping between [OpenZeppelin Defender](https://defender.openzeppelin.com) available networks and its corresponding name in [TheGraph protocol](https://thegraph.com), as long with its deployment details.

This is the shape of the configuration:

```typescript
type Username = string; // Your username in TheGraph

interface Mapping {
  graphName: string; // This is the name of the network in TheGraph service,
  deploy: {
    product: "hosted-service" | "subgraph-studio",
    name: `${Username}/${string}`
  }
}

type Config = {
  [key: string]?: Mapping
}
```

You can add as many networks as you like

## Usage

In order to generate the configurations for the networks, just run:

```bash
yarn generate:config
```

This will create a `generated` folder with the definitions of your graphs using [@openzeppelin/subgraphs](https://github.com/OpenZeppelin/openzeppelin-subgraphs). Now, you'll have to compile those configurations by running:

```
yarn compile
```

This will generate the subgraphs manifests and schemas, which you can deploy as follows:

```
yarn deploy
```

Consider that you might be authenticated using TheGraph CLI before in order to perform the last step (`npx graph auth`)

### ⚠️⚠️⚠️ WARNING

Due to API restrictions, The Graph only allows to create the subgraphs via UI, so you're not able to do it through CLI, and you'll have to manually add all of them using [The Graph's dashboard](https://thegraph.com/hosted-service/dashboard)

## License

[MIT](https://choosealicense.com/licenses/mit/)
