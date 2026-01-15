import { Module } from '@nestjs/common';
import { GraphQLController } from './graphql.controller';
import { CharactersModule } from '../characters/characters.module';

@Module({
  imports: [CharactersModule],
  controllers: [GraphQLController],
})
export class GraphQLModule {}
