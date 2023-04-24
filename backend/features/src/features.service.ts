import { Integration, Integrations } from "./entities/integrations";
import { Injectable } from "@nestjs/common";
import { GenRocket } from "./entities/genrocket.entity";
import { IntegrationBase } from "./entities/integration_base";

const GenRocketData: GenRocket = {
    title: "GenRocket",
    description: "gen desc",
    logo: "logo url",
    images: [],
};

const integrations: Integrations = {
    id_1: GenRocketData,
    id_2: {
        title: "QTest",
        logo: "url",
        description: "qtest desc",
    },
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
