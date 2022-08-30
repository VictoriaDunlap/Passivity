import { gql } from '@apollo/client'
// ADD PROFILE

// LOGIN
export const LOGIN = gql`
mutation Mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
        email
      }
    }
  }
`
// UPDATE USER INFO

// DELETE USER

// ADD STOCK

// UPDATE STOCK

// DELETE STOCK