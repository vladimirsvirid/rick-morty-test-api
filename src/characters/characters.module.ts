import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RickMortyApiService } from './rick-morty-api.service';
import { Character } from './entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  providers: [RickMortyApiService],
  exports: [RickMortyApiService],
})
export class CharactersModule {}
