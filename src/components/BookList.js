import React from 'react'
import {getBooksQuery} from '../queries/queries'

import {
    useQuery
} from "@apollo/client";



function BookList({onSelect}) {
    const { loading, error, data } = useQuery(getBooksQuery);
    const selectHandler = (id)=>{
      onSelect(id)
    }
  return (
    <div>
        <h1>My reading list</h1>
        <ul id='book-list'>
            {loading && <div>Loading ...</div>}
            {error && <div>Error ...</div>}
            {data && data.books.map((book)=> (<li key={book.id}  onClick={e => selectHandler(book.id)} >{book.name}</li>))}

        </ul>
    </div>
  )
}

export default BookList