import {
    gql
} from "@apollo/client";

export const getBooksQuery = gql`
    {
        books{
            id
            name
            
        }
    }
`


 export const getAuthors = gql`
    {
        authors{
            id
            name
            
        }
    }
`

export const addBookMutation = gql`
    mutation AddBook($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
        }
    }
    
`
