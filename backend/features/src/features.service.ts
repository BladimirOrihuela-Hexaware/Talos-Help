import { IntegrationsSchema } from "./models/integrations.entity";
import { Injectable } from "@nestjs/common";
import { IntegrationBase } from "./models/integrationBase.entity";
import * as data from "./data";

const integrations: IntegrationsSchema = {
    genrocket: data.GenRocketData,
};

@Injectable()
export class FeaturesService {
    getIntegration(id: string): { [id: string]: IntegrationsSchema } {
        return { id: integrations[id] };
    }
    getIntegrations(): IntegrationBase[] {
        return Object.values(integrations).map((i) => {
            return { title: i.title, description: i.description, logo: i.logo };
        });
    }
}
