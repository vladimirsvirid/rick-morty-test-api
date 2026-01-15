import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type GraphQLClient = {
  request: <T = unknown>(
    query: string,
    variables?: Record<string, unknown>
  ) => Promise<T>;
};

@Injectable()
export class RickMortyApiService {
  private client: GraphQLClient | null = null;

  constructor(private readonly configService: ConfigService) {}

  private getRickMortyApiUrl(): string {
    return this.configService.get<string>('RICK_MORTY_API') || '';
  }

  private async getClient(): Promise<GraphQLClient> {
    if (!this.client) {
      const apiUrl = this.getRickMortyApiUrl();
      const { GraphQLClient } = await import('graphql-request');
      this.client = new GraphQLClient(apiUrl);
    }
    return this.client;
  }

  async executeGraphQL(
    query: string,
    variables?: Record<string, unknown>
  ): Promise<unknown> {
    const client = await this.getClient();
    return await client.request(query, variables);
  }
}
