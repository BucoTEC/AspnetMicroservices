import { useQuery } from '@apollo/client'
import React from 'react'
import { getBookQuery } from '../queries/queries'

export default function BookDetails({bookId}) {
    const oneBook =  useQuery(getBookQuery, {variables: {id : bookId}})

  return (
    <div id='book-details'>
        

            {oneBook.loading && <div>Loading ...</div>}
            {oneBook.error && <div>Ups there was a probem</div>}
            {oneBook?.data && <div>{oneBook?.data?.book?.name}</div>}
            
    

    </div>
  )
}
