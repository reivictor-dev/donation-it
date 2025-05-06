import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UploadedFile, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.authguard";
import { itemsService } from "./Item.service";
import { CreateItemDto } from "./dto/Create-Item.dto";
import { UploadService } from "src/utils/upload.service";

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemController{

    constructor(
        private readonly itemsService: itemsService,
        private readonly uploadService: UploadService,
    ){}

    @Post("create")
    async create(
        @Body() dto: CreateItemDto, 
        @Request() req,
        @UploadedFile() file: Express.Multer.File,){

        const item = await this.itemsService.createItem(dto, req.user.id)

        if(file){
            const path = this.uploadService.saveImage(file, 'item', req.user.id)
            dto.item_image = path
            await this.itemsService.createItem(dto, req.user.id)
        }
        return item
    }

    @Get()
    findAll(){
        return this.itemsService.findAll()
    }

    @Get(":id")
    findById(@Param("id", ParseIntPipe) id: number){
        return this.itemsService.findById(id)
    }

    @Delete(":id")
        remove(@Param("id", ParseIntPipe) id: number, @Request() req){
            return this.itemsService.deleteById(id, req.user.id)
        }
    
}