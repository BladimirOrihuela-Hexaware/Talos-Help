import axios from "axios";
import { Config } from "./types";

const BasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const Version = "latest";

export class Pipeline {
    dev: boolean;
    constructor() {
        this.dev = process.env.NODE_ENV === "development";
    }

    async request(config: Config) {
        try {
            const response = await axios({
                method: config.method,
                baseURL: this.dev ? `${BasePath}:${this.mapPort(config)}` : BasePath,
                url: this.buildURL(config),
                data: config.data,
                transformResponse: [
                    (data) => {
                        return data;
                    },
                ],
            });

            //TODO: Apply validation to response
            const formated = JSON.parse(response.data);

            return formated;
        } catch (error) {
            return undefined;
        }
    }

    private buildURL(config: Config): string {
        const { service, id, route } = config;
        let url = `${service}/${Version}/${route}`; // features/latest/integrations
        if (id) return `${url}/${id}`; // features/latest/integration/genrocket
        return url;
    }

    /**
     * Dev only
     */
    private mapPort({ service }: Config): number {
        switch (service) {
            case "actions":
                return 3000;
            case "features":
                return 3001;
            case "licensing":
                return 3000;
            default:
                return 3000;
        }
    }
}
