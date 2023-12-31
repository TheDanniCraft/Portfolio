/* eslint-disable react/no-children-prop */
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, MantineProvider, createTheme } from '@mantine/core';
import Theme from './Theme';

export const metadata = {
  title: 'TheDanniCraft.de',
  description: 'Potfolio for TheDanniCraft',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Theme children={children} />
      </body>
    </html>
  )
}
