import React, { useState } from 'react'
import {getAuthors} from '../queries/queries'
import {
    useQuery
} from "@apollo/client";



export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthors);
    const [name, setName]=useState('')
    const [genre, setGenre]=useState('')
    const [authorId, setAuthorId]=useState('')
            console.log(authorId);
    const formHandler = (e)=>{
        e.preventDefault()
    }

  return (
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
  )
}
