import { Exhibition } from './entities/exhibition.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateExhibitionDto } from './dto/create-exhibition.dto';
import { UpdateExhibitionDto } from './dto/update-exhibition.dto';
import { Repository } from 'typeorm';

@Injectable()
export class ExhibitionService {
  constructor(
    @InjectRepository(Exhibition)
    private readonly exhibitionRepository: Repository<Exhibition>,
  ) {}

  async create(data: CreateExhibitionDto) {
    const exhibition = this.exhibitionRepository.create(data);

    const exhibitionExists = await this.exhibitionRepository.findOne({
      description: data.description,
    });

    if (exhibitionExists) {
      throw new NotFoundException();
    }

    return await this.exhibitionRepository.save(exhibition);
  }

  async findAll() {
    return await this.exhibitionRepository.find();
  }

  async findOne(id: string) {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: id },
    });

    if (!exhibition) {
      throw new NotFoundException();
    }

    return exhibition;
  }

  async update(id: string, data: UpdateExhibitionDto) {
    const exhibition = await this.exhibitionRepository.preload({ id, ...data });

    if (!exhibition) {
      throw new NotFoundException();
    }

    return await this.exhibitionRepository.save(exhibition);
  }

  async remove(id: string) {
    const exhibition = await this.exhibitionRepository.findOne({
      where: { id: id },
    });

    if (!exhibition) {
      throw new NotFoundException();
    }

    return await this.exhibitionRepository.remove(exhibition);
  }
}
