import Head from 'next/head'
import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner'
import { Page, Text, Card, Note, Code, Spacer, Button ,Input} from '@geist-ui/react'
import useSocket from '../hooks/useSocket'
export default function Home() {
  const [showQR, setQR] = useState(false)
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState(false)
  const [text,setText] = useState('')
  const [trigger,setTrigger] = useState('')
  const [io, setIo] = useState(null)

  const update = () =>{
    io.emit("newData",{text,trigger})
  }
  const start = () => {
    useSocket().then(io => {
      setIo(io)
      io.on("start", () => {
        io.emit('client', { data: "start" })
        setLoading(true)
      })
      io.on("image", info => {
        if (info.image) {
         
          var myimg = document.getElementById('code');

          var img = new Image();

          img.src = 'data:image/jpeg;base64,' + info.buffer;
          setQR(true)
          myimg.src = img.src
          setLoading(false)
        }
      })

      io.on("ans", info => {
        console.log(info)
        setLoading(false)
        if (info === 'isLogged' || info === 'qrReadSuccess')
          setMsg(true)
      })
    })
  }

  return (
    <div className="container">
      <Head>
        <title>WhatsApp Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {!msg ?
        <main>
          <img style={{ visibility: !showQR ? "hidden" : "visible" }} id="code" alt="code" />
          <h1 className="title">
            Welcome to <a href="https://nextjs.org">WhatsApp Bot!</a>
          </h1>
          {loading ? <Spinner /> : <div>

            {showQR ?
              <p className="description">
                To continue Scan QR code with WhatsApp Web
          </p> :
              <Text size={22} className="description">
                Get started by connecting <Button shadow type="secondary" onClick={() => start()}>Click Here</Button>
              </Text>
            }
          </div>
          }
        </main>
        :

        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignContent: "center", alignSelf: "center", alignItems: "center" }}>
          <Text h1 style={{ textAlign: "center" }} >
Whatsapper Bot
</Text>

<Input
placeholder='Trigger'
value={trigger}
onChange={(e) => setTrigger(e.target.value)}
/>
          <Input
            placeholder='Text'
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Input  size="large" type="date" 
          />

          
<br/>
<Button shadow type="secondary" onClick={() => update()}>
            Submit
</Button>

        </div>



      }


      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>

  )
}
