import { gql } from "apollo-angular"

export const sendConnectionMutation = gql`
    mutation {
      connect
    }
`
export const addTimedMessageMutation = gql`
mutation addTimedMessage($chatId: String!, $message: String!, $time: DateTime!){
    addTimedMesage(
      chatId: $chatId,
      message: $message,
      time: $time
    )
}
`