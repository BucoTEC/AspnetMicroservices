import { useQuery } from '@apollo/client'
import React from 'react'
import { getBookQuery } from '../queries/queries'

export default function BookDetails({bookId}) {
    const oneBook =  useQuery(getBookQuery, {variables: {id : bookId}})

  return (
    <div id='book-details'>
        

            {oneBook.loading && <div>Loading ...</div>}
            {oneBook.error && <div>Ups there was a probem</div>}
            {oneBook?.data?.book && <div>
                
                <h1>{oneBook?.data?.book?.name}</h1>
                <p>{oneBook?.data?.book?.genre}</p>
                <p>Author: {oneBook?.data?.book?.author?.name}</p>

                </div>}
            
    

    </div>
  )
}
