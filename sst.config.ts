import { SSTConfig } from "sst";
import { API } from "./stacks/Api";
import { Secret } from "./stacks/Secrets";
export default {
  config(_input) {
    return {
      name: "auth-test",
      region: "ap-south-1",
    };
  },
  stacks(app) {
    app.stack(Secret).stack(API);
  },
} satisfies SSTConfig;
