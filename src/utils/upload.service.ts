import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join } from "path";


@Injectable()
export class UploadService {
    private basePath = './uploads'

    saveImage(
        file: Express.Multer.File,
        entity: 'user' | 'item',
        entityId: number,
    ): string {
        try {
            const folder = entity === 'user' ? 'profile-img' : 'item-img'
            const uploadDir = join(this.basePath, folder)

            if(!existsSync(uploadDir)){
                mkdirSync(uploadDir, {recursive: true})
            }

            const timestamp = Date.now()
            const extension = file.originalname.split('.').pop()
            const filename = `${timestamp}_${entity}${entityId}.${extension}`
            const filePath = join(uploadDir, filename)

            writeFileSync(filePath, file.buffer)
            return `/uploads/${folder}/${filename}`

        } catch (err) {
            throw new InternalServerErrorException(`Error saving ${entity}`, err)
        }
    }
}