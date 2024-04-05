import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UpdatesCronService } from './updates-cron.service';
import { CreateUpdatesCronDto } from './dto/create-updates-cron.dto';
import { UpdateUpdatesCronDto } from './dto/update-updates-cron.dto';

@Controller('updates-cron')
export class UpdatesCronController {
  constructor(private readonly updatesCronService: UpdatesCronService) {}

  @Post()
  create(@Body() createUpdatesCronDto: CreateUpdatesCronDto) {
    return this.updatesCronService.create(createUpdatesCronDto);
  }

  @Get()
  findAll() {
    return this.updatesCronService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.updatesCronService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUpdatesCronDto: UpdateUpdatesCronDto,
  ) {
    return this.updatesCronService.update(+id, updateUpdatesCronDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.updatesCronService.remove(+id);
  }
}
