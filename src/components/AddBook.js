import React from 'react'
import {getAuthors} from '../queries/queries'
import {
    useQuery
} from "@apollo/client";



export default function AddBook() {
    const { loading, error, data } = useQuery(getAuthors);
    console.log(data);
  return (
    <form id="add-book"  >
    <div className="field">
        <label>Book name:</label>
        <input type="text"  />
    </div>
    <div className="field">
        <label>Genre:</label>
        <input type="text"  />
    </div>
    <div className="field">
        <label>Author:</label>
        <select  >
            <option>Select author</option>
            { loading && <option>Loading ...</option> }
            { error && <option>Ups there was a problem</option> }
            { data &&  data.authors.map(author => <option key={author.id}>{author.name}</option> )  }

        </select>
    </div>
    <button>+</button>
</form>
  )
}
