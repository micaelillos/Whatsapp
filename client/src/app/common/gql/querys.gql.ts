import { gql } from "apollo-angular";

export const getConnectionStatusQuery = gql`
    query {
      getStatus
    }
`

export const getScheduledMessagesQuery = gql`
    query {
      getScheduledMessages{
        chatId
        time
        message
      }
    }
`
export const getAllChatsQuery = gql`
    query {
      getAllChats{
        id{
          _serialized
        }
        isGroup
        contact {
          formattedName
          id{
            _serialized
          }
        }
      }
      }
`