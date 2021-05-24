# Using Apollo Client & GQL to query api

## Create a client  
```
const client = new ApolloClient({
	uri, cache
}); 
```

## Add ApolloProvider for access in componenent tree 
```
<ApolloProvider client={client}> </ApolloProvider>
```

## To query, insert gql query inside useQuery (it'll return the result, loading and an error) 
```
const { loading, error, data } = useQuery(QUERY); 
```
