import { Button, Input, Text } from '@geist-ui/react'
import React, { useState } from 'react'
import useSocket from '../hooks/useSocket'
export default function Message(){
    const [text,setText] = useState('')
    const update = () => {
        useSocket().then(io => {
            io.emit('newData',text)
        })
    }
    return(
        <>
        <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignContent:"center",alignSelf:"center",alignItems:"center"}}>
        <Text h1 style={{textAlign:"center"}} >
            Hello you are connected
        </Text>
 <Input 
 value={text}
 onChange={(e) => setText(e.target.value)}
 />

 <Button onClick={() => update()}>
     Submit
 </Button>

 </div>
        </>
    )
}