import React, { useState } from 'react'
import {getAuthors, addBookMutation, getBooksQuery} from '../queries/queries'
import {
    useQuery,
    useMutation
} from "@apollo/client";



export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthors);
    const [addBook, {erro : bookError}] = useMutation(addBookMutation , {
        refetchQueries: [{ query: getBooksQuery }],
      });
    const [name, setName]=useState('')
    const [genre, setGenre]=useState('')
    const [authorId, setAuthorId]=useState('')

   
    const formHandler = (e)=>{
        e.preventDefault()
        addBook({variables:{name, genre, authorId}})
        setAuthorId('')
        setName('')
        setGenre('')
    }
    //GREAT ERROR HANDLING TRICK
    bookError && console.log(JSON.stringify(bookError, null, 2));; 
  return (
      <>
        

      <form id="add-book" onSubmit={formHandler} >
    <div className="field">
        <label>Book name:</label>
        <input type="text" onChange={e => setName(e.target.value)} value={name} required/>
    </div>
    <div className="field">
        <label>Genre:</label>
        <input type="text" onChange={e => setGenre(e.target.value)} value={genre} required/>
    </div>
    <div className="field">
        <label>Author:</label>
        <select onChange={e=> setAuthorId(e.target.value)} value={authorId} required>
            <option></option>
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
