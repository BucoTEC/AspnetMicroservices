import React from 'react'


import {
    useQuery,
    gql
} from "@apollo/client";

const getBooksQuery = gql`
    {
        books{
            id
            name
            
        }
    }
`

function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
  return (
    <div>
        <h1>My reading list</h1>
        <ul id='book-list'>
            {loading && <div>Loading ...</div>}
            {error && <div>Error ...</div>}
            {data && data.books.map((book)=> (<li key={book.id}>{book.name}</li>))}

        </ul>
        
    </div>
  )
}

export default BookList