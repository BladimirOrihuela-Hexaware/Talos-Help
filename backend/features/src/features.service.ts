import { Integration, Integrations } from "./entities/integrations";
import { Injectable } from "@nestjs/common";
import { IntegrationBase } from "./entities/integration_base";
import * as data from "./data";

const integrations: Integrations = {
    genrocket: data.GenRocketData,
};

@Injectable()
export class FeaturesService {
    getIntegration(id: string): Integration {
        return integrations[id];
    }
    getIntegrations(): IntegrationBase[] {
        return Object.values(integrations).map((i) => {
            return { title: i.title, description: i.description, logo: i.logo };
        });
    }
}
