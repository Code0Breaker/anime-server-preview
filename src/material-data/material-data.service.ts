import { Injectable } from '@nestjs/common';
import { CreateMaterialDatumDto } from './dto/create-material-datum.dto';
import { UpdateMaterialDatumDto } from './dto/update-material-datum.dto';

@Injectable()
export class MaterialDataService {
  create(createMaterialDatumDto: CreateMaterialDatumDto) {
    return 'This action adds a new materialDatum';
  }

  findAll() {
    return `This action returns all materialData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materialDatum`;
  }

  update(id: number, updateMaterialDatumDto: UpdateMaterialDatumDto) {
    return `This action updates a #${id} materialDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} materialDatum`;
  }
}
