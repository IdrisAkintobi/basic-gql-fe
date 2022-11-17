import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($input: registerInput) {
    register(input: $input) {
      id
      fullName
      email
      category
    }
  }
`;

export const LOGIN = gql`
  mutation Login($input: loginInput) {
    login(input: $input) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteAccount {
    deleteAccount {
      id
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: changePasswordInput) {
    changePassword(input: $input) {
      id
    }
  }
`;
