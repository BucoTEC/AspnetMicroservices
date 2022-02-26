import React from 'react'
import {
    useQuery,
    gql
} from "@apollo/client";


const getAuthors = gql`
    {
        books{
            id
            name
            
        }
    }
`

export default function AddBook() {
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
            {  }
        </select>
    </div>
    <button>+</button>
</form>
  )
}
