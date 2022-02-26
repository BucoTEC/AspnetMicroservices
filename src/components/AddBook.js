import React, { useState } from 'react'
import {getAuthors, addBookMutation} from '../queries/queries'
import {
    useQuery,
    useMutation
} from "@apollo/client";



export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthors);
    const [addBook, {lodaing : bookLoading, error : bookError, data: bookData}] = useMutation(addBookMutation);
    const [name, setName]=useState('')
    const [genre, setGenre]=useState('')
    const [authorId, setAuthorId]=useState('')

   
    const formHandler = (e)=>{
        e.preventDefault()
        addBook({variables:{name, genre, authorId}})
    }
    // bookError && console.log(JSON.stringify(bookError, null, 2));; GOOD FOR ERROR HANDLING
  return (
      <>
        {bookLoading && <h1>loading</h1>}
        {bookError && <h1>{bookError.message}</h1>}
        {bookData && <h1>Success</h1>}

      <form id="add-book" onSubmit={formHandler} >
    <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} />
    </div>
    <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} />
    </div>
    <div className="field">
        <label>Author:</label>
        <select onChange={e=> setAuthorId(e.target.value)}>
            <option>Select author</option>
            { loading && <option>Loading ...</option> }
            { error && <option>Ups there was a problem</option> }
            { data &&  data.authors.map(author => <option key={author.id} value={author.id}>{author.name}</option> )  }

        </select>
    </div>
    <button>+</button>
</form>
      </>
  )
}
