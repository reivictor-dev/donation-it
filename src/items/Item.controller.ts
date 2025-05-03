import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Request, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/jwt.authguard";
import { itemsService } from "./Item.service";
import { CreateItemDto } from "./dto/Create-Item.dto";

@UseGuards(JwtAuthGuard)
@Controller('items')
export class ItemController{

    constructor(private readonly itemsService: itemsService){}

    @Post()
    create(@Body() dto: CreateItemDto, @Request() req){
        return this.itemsService.createItem(dto, req.user)
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