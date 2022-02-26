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
export const getBookQuery = gql`
    query GetBook($id: ID){
        book(id: $id) {
            id
            name
            genre
            author {
                id
                name
                age
                books {
                    name
                    id
                }
            }
        }
    }
`;