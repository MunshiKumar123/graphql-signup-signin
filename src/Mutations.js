import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation (
    $signupUserName: String
    $signupEmail: String
    $signupPassword: String
    $signupRole: String
  ) {
    Signup(
      UserName: $signupUserName
      Password: $signupPassword
      Email: $signupEmail
      Role: $signupRole
    ) {
      UserName
      Email
      Password
      Role
    }
  }
`;

// export const LOGIN_USER = gql`
//   mutation Login($email: String, $password: String) {
//     login(Email: $email, Password: $password) {
//       Email
//       Password
//     }
//   }
// `;
