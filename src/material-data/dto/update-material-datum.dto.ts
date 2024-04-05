import { PartialType } from '@nestjs/swagger';
import { CreateMaterialDatumDto } from './create-material-datum.dto';

export class UpdateMaterialDatumDto extends PartialType(
  CreateMaterialDatumDto,
) {}
