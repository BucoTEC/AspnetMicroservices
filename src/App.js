import BookList from "./components/BookList";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import BookDetails from "./components/BookDetails";
import { useState } from "react";

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache()
});



function App() {
  const [id, setId] = useState(null);
  const selectHandler  = (e)=>{
  setId(e)
  }
  return (
    <ApolloProvider client={client}>

    <div >
      <BookList onSelect={ e => selectHandler(e)}/>
      <BookDetails bookId = {id}/>
    </div>
    </ApolloProvider>
  );
}

export default App;
