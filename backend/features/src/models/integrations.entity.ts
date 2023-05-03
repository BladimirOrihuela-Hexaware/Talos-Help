import { ApiProperty } from "@nestjs/swagger";
import { GenRocket } from "./genrocket.entity";

export class IntegrationsSchema {
    @ApiProperty({ required: false, description: "GenRocket schema" })
    genrocket?: GenRocket;
}
