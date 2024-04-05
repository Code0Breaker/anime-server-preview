import { Injectable } from '@nestjs/common';
import { CreateUpdatesCronDto } from './dto/create-updates-cron.dto';
import { UpdateUpdatesCronDto } from './dto/update-updates-cron.dto';

@Injectable()
export class UpdatesCronService {
  create(createUpdatesCronDto: CreateUpdatesCronDto) {
    return 'This action adds a new updatesCron';
  }

  findAll() {
    return `This action returns all updatesCron`;
  }

  findOne(id: number) {
    return `This action returns a #${id} updatesCron`;
  }

  update(id: number, updateUpdatesCronDto: UpdateUpdatesCronDto) {
    return `This action updates a #${id} updatesCron`;
  }

  remove(id: number) {
    return `This action removes a #${id} updatesCron`;
  }
}
