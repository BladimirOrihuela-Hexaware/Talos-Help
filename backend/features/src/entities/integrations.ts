import { GenRocket } from "../models/genrocket.entity";
import { QTest } from "../models/qtest.entity";

export type Integration = GenRocket | QTest;

export interface Integrations {
    [id: string]: Integration;
}
