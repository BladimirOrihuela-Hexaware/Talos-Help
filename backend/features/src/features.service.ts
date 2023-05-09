import { IntegrationsSchema } from "./models/integrations.entity";
import { Injectable } from "@nestjs/common";
import { IntegrationBase } from "./models/integrationBase.entity";
import * as data from "./data";

const integrations: IntegrationsSchema = {
    genrocket: data.GenRocketData,
} as const;

export type ITypes = keyof typeof integrations;

@Injectable()
export class FeaturesService {
    getIntegration(id: ITypes) {
        if (id in integrations) return integrations[id];
        else return undefined;
    }
    getIntegrations(): IntegrationBase[] {
        return Object.values(integrations).map((i) => {
            return { title: i.title, description: i.description, logo: i.logo };
        });
    }
}
