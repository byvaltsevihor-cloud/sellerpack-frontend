import { GraphQLClient } from 'graphql-request'

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8080/graphql'

export const graphQLClient = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
})

/**
 * Fetch data from WordPress GraphQL API
 */
export async function fetchGraphQL<T = any>(query: string, variables?: Record<string, any>): Promise<T> {
  try {
    const data = await graphQLClient.request<T>(query, variables)
    return data
  } catch (error) {
    console.error('GraphQL Error:', error)
    throw error
  }
}
