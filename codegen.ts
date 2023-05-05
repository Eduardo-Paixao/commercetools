import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      "https://api.us-central1.gcp.commercetools.com/teste-dev/graphql": {
        headers: {
          Authorization: "Bearer aKKviCgYtaoNsnUEoStSFrl31cZZbA5s",
        },
      },
    },
  ],
  documents: ["./src/graphql/**/*.graphql"],
  generates: {
    "./src/graphql/generated.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-apollo",
      ],
      config: {
        reactApolloVersion: 3,
        withHooks: true,
        withHOC: false,
        withComponent: false,
      },
    },
  },
};
export default config;
