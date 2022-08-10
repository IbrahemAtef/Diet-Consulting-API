import { SetMetadata } from "@nestjs/common";
import { CONFIG } from "../constants";

export const Public = () => SetMetadata(CONFIG.PUBLIC, true);
