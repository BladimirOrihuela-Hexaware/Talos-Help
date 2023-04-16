import axios from "axios";
import { Services } from "@common/constants/services";

const BasePath = "/api/";
const Version = "latest";

export class Pipeline {
  constructor() {}

  async get(service: Services) {
    const resp = await axios.get(`${BasePath}/${service}/${Version}`, {
      headers: {},
    });

    //TODO: Apply validation to request

    return resp.data;
  }
}
