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
