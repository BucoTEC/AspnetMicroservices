import React, {useState} from 'react'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'
import {
    useQuery
} from "@apollo/client";



function BookList() {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [id, setId] = useState(null);
    
  return (
    <div>
        <ul id='book-list'>
            {loading && <div>Loading ...</div>}
            {error && <div>Error ...</div>}
            {data && data.books.map((book)=> (<li key={book.id}  onClick={() => setId(book.id)} >{book.name}</li>))}

        </ul>
        <BookDetails bookId={id}/>
    </div>
  )
}

export default BookList