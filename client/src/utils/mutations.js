import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($userId: ID!, $bookId: String!) {
    addBook(userId:$userId, bookId:$bookId){
      authors
      description
      bookId
      image
      link
      title
    }
  }
  `;


export const DELETE_BOOK = gql `
mutation deleteBook($bookId: String!) {
  deleteBook(book: $bookId) {
    username
    email
    bookCount
    savedBooks {
      authors
      description
      bookId
      image
      link
      title
    }
    
  }
}
`;