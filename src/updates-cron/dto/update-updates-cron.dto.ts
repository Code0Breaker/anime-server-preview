import { PartialType } from '@nestjs/swagger';
import { CreateUpdatesCronDto } from './create-updates-cron.dto';

export class UpdateUpdatesCronDto extends PartialType(CreateUpdatesCronDto) {}
