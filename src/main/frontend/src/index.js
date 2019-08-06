import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';


// const httpLink = createHttpLink({
//   uri: 'https://k9dc.essential-dev.com/v1/graphql/'
// })
// const client = new ApolloClient({
//   // By default, this client will send queries to the
//   //  `/graphql` endpoint on the same host
//   // Pass the configuration option { uri: YOUR_GRAPHQL_API_URL } to the `HttpLink` to connect
//   // to a different host
//   link: httpLink,
//   cache: new InMemoryCache(),
// });
const client = new ApolloClient({
  uri: 'https://caninecommons-dev.cancer.gov/v1/graphql/'
});

ReactDOM.render(<ApolloProvider client={client}><App /></ApolloProvider>, document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
