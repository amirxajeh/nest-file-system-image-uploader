import { SetMetadata } from "@nestjs/common";
import { DiskStorageOptions } from "multer";

export const Upload = (configs: DiskStorageOptions) => SetMetadata('upload', configs)
