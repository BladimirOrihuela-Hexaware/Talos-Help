import { GenRocket } from "./genrocket.entity";
import { QTest } from "./qtest.entity";

export type Integration = GenRocket | QTest;

export interface Integrations {
    [id: string]: Integration;
}
