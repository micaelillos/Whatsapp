import { gql } from "apollo-angular";

export const connectionStatusSub = gql`
    subscription{
      connectionStatus
    }
`
export const getOnlineSub = gql`
    subscription {
        getOnline{
          contact{
            name
            id{
              _serialized      
            }
            profilePicThumbObj{
              imgFull
            }
          }
        }
      }
`

export const getQrCodeSub = gql`
  subscription {
    getQrCode
  }
`