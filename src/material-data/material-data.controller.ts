import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MaterialDataService } from './material-data.service';
import { CreateMaterialDatumDto } from './dto/create-material-datum.dto';
import { UpdateMaterialDatumDto } from './dto/update-material-datum.dto';

@Controller('material-data')
export class MaterialDataController {
  constructor(private readonly materialDataService: MaterialDataService) {}

  @Post()
  create(@Body() createMaterialDatumDto: CreateMaterialDatumDto) {
    return this.materialDataService.create(createMaterialDatumDto);
  }

  @Get()
  findAll() {
    return this.materialDataService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.materialDataService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMaterialDatumDto: UpdateMaterialDatumDto,
  ) {
    return this.materialDataService.update(+id, updateMaterialDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.materialDataService.remove(+id);
  }
}
