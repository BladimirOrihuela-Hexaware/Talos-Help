import axios from "axios";
import { Config } from "./types";

const BasePath = process.env.NEXT_PUBLIC_BASE_PATH;
const Version = "latest";

export class Pipeline {
    dev: boolean;
    config: Config;
    constructor(config: Config) {
        this.dev = process.env.NODE_ENV === "development";
        this.config = config;
    }

    async request() {
        try {
            const response = await axios({
                method: this.config.method,
                baseURL: this.dev ? `${BasePath}:${this.mapPort(this.config)}` : BasePath,
                url: this.buildURL(),
                data: this.config.data,
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

    private buildURL(): string {
        const { service, id, route } = this.config;
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
