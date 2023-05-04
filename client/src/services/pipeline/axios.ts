import axios from "axios";
import { Config } from "./types";

const BasePath = "https://taloshelp.dev";
const Version = "latest";

export class Pipeline {
    constructor() {}

    async request(config: Config) {
        const response = await axios({
            method: config.method,
            baseURL: BasePath,
            url: this.buildURL(config),
            data: config.data,
        });

        //TODO: Apply validation to request
        const { responseType } = config;
        type ResponseType = typeof responseType;
        console.log(response.data);

        return response.data;
    }

    private buildURL(config: Config): string {
        const { service, id, route } = config;
        if (id && route) return `${service}/${Version}/${route}/${id}`;
        return `${service}/${Version}`;
    }
}
