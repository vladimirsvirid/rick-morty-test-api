import { Body, Controller, Post } from '@nestjs/common';
import { RickMortyApiService } from '../characters/rick-morty-api.service';

interface GraphQLRequest {
  query: string;
  variables?: Record<string, unknown>;
}

interface GraphQLResponse {
  data?: unknown;
  errors?: Array<{ message: string }>;
}

@Controller('graphql')
export class GraphQLController {
  constructor(private readonly rickMortyApiService: RickMortyApiService) {}

  @Post()
  async proxyGraphQL(@Body() body: GraphQLRequest): Promise<GraphQLResponse> {
    try {
      const { query, variables } = body;

      if (!query) {
        return {
          errors: [{ message: 'Query is required' }],
        };
      }

      const result: unknown = await this.rickMortyApiService.executeGraphQL(
        query,
        variables
      );

      return {
        data: result,
      };
    } catch (error) {
      return {
        errors: [
          {
            message:
              error instanceof Error
                ? error.message
                : 'GraphQL execution failed',
          },
        ],
      };
    }
  }
}
