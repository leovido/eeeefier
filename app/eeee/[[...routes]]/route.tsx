/** @jsxImportSource frog/jsx */

import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/next'
import { serveStatic } from 'frog/serve-static'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

const share = (text: string) => {
  const prefix = "https://warpcast.com/~/compose?text=";
  const encoded = encodeURIComponent(text);
  const urlEncoded = encodeURIComponent(
    `https://eeefier.leovido.xyz/eeee`
  );
  const suffix = `&embeds[]=${urlEncoded}`;
  const url = `${prefix}${encoded}${suffix}`;
  return url;
}

const app = new Frog({
  assetsPath: '/',
  basePath: '/eeee',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
  title: 'Eeefier',
  initialState: {
    translatedText: '',
  },
})

// Uncomment to use Edge Runtime
// export const runtime = 'edge'

const translatorMapping: { [key: string]: string } = {
  'a': 'Ee',
  'b': 'eEEE',
  'c': 'eEeE',
  'd': 'eEE',
  'e': 'E',
  'f': 'EEeE',
  'g': 'eeE',
  'h': 'EEEE',
  'i': 'EE',
  'j': 'Eeee',
  'k': 'eEe',
  'l': 'EeEE',
  'm': 'ee',
  'n': 'eE',
  'o': 'eee',
  'p': 'EeeE',
  'q': 'eeEe',
  'r': 'EeE',
  's': 'EEE',
  't': 'e',
  'u': 'EEe',
  'v': 'EEEe',
  'w': 'Eee',
  'x': 'eEEe',
  'y': 'eEee',
  'z': 'eeEE',
  '1': 'Eeeee',
  '2': 'EEeee',
  '3': 'EEEee',
  '4': 'EEEEe',
  '5': 'EEEEE',
  '6': 'eEEEE',
  '7': 'eeEEE',
  '8': 'eeeEE',
  '9': 'eeeeE',
  '0': 'eeeee',
  '-': 'eEEEEe',
  '+': 'EeEeE',
  '!': 'eEeEee',
  '?': 'EEeeEE',
  '=': '',
  ':': 'eeeEEE',
  ';': 'eEeEeE',
  '$': 'EEEeEEe',
  '@': 'EeeEeE',
  '&': 'EeEEE',
  '(': 'eEeeE',
  ')': 'eEeeEe',
  '_': 'EEeeEe',
  '\'': 'EeEeE',
  '/': 'EeeeeE',
  '.': 'EeEeEe',
};


app.frame('/', (c) => {
  const { buttonValue, inputText, status, deriveState, verified } = c

  const state = deriveState(previousState => {
    if (buttonValue === 'eeee') {
      // @ts-ignore
      previousState.translatedText = inputText?.split('').map((char) => {
        if (char === ' ') return 'EeEeEe';
        return translatorMapping[char] || char;
      }).join(' ');
    }
  })

  return c.res({
    image: (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #1E90FF, #20B2AA)',
          backgroundSize: '100% 100%',
          fontFamily: 'Inter',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'flex-start',
          textAlign: 'center',
          width: '100%',
          paddingTop: '20px',
        }}
      >
        <h1
          style={{
            color: 'white',
            fontFamily: 'Inter',
            background: '#222222',
            fontSize: '60',
            padding: '10px',
            paddingLeft: '20px',
            paddingRight: '20px',
            fontWeight: 'bold',
            margin: '0',
          }}
        >
          🐬 EEeefier 🐬
        </h1>
        <h2
          style={{
            color: 'white',
            fontFamily: 'Inter',
            fontSize: '40',
            margin: '0 0 30px',
          }}
        >
          Convert any text to EEee
        </h2>
        <div
          style={{
            color: '#FFD700',
            fontSize: status === 'response' ? 50 : 60,
            fontStyle: 'normal',
            letterSpacing: '-0.025em',
            lineHeight: 1.4,
            padding: '0 120px',
            whiteSpace: 'pre-wrap',
          }}
        >
          {status === 'response'
                // @ts-ignore
            ? `${state.translatedText}`
            : 'Welcome! Eeefy your text!'}
        </div>
      </div>
    ),
    intents: [
      <TextInput placeholder="Input your text to eeeefy!" />,
      <Button value="eeee">EEeefy!</Button>,
      // @ts-ignore
      <Button.Link href={share(state?.translatedText ?? "")}>Share</Button.Link>,
      <Button.Reset>Reset</Button.Reset>,
    ],
  })
})

devtools(app, { serveStatic })

export const GET = handle(app)
export const POST = handle(app)

// NOTE: That if you are using the devtools and enable Edge Runtime, you will need to copy the devtools
// static assets to the public folder. You can do this by adding a script to your package.json:
// ```json
// {
//   scripts: {
//     "copy-static": "cp -r ./node_modules/frog/_lib/ui/.frog ./public/.frog"
//   }
// }
// ```
// Next, you'll want to set up the devtools to use the correct assets path:
// ```ts
// devtools(app, { assetsPath: '/.frog' })
// ```
