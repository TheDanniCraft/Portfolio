/* eslint-disable react/no-children-prop */
import { Inter } from 'next/font/google'
import './globals.css'
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, useMantineTheme } from '@mantine/core';
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

        <meta name="title" content="TheDanniCraft - Offical Website" />
        <meta name="description" content="Learn more about TheDanniCraft. A passionate developer, creator and community owner. The right place to learn more about TheDanniCraft and his work." />
        <meta name="copyright" content="TheDanniCraft" />
        <meta name="keywords" content="website, portfolio, thedannicraft" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="thedannicraft.de" />
        <meta property="og:title" content="TheDanniCraft - Offical Website" />
        <meta property="og:description" content="Learn more about TheDanniCraft. A passionate developer, creator and community owner. The right place to learn more about TheDanniCraft and his work." />
        <meta property="og:image" content="https://cdn.thedannicraft.de/Portfolio.png" />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="thedannicraft.de" />
        <meta property="twitter:title" content="TheDanniCraft - Offical Website" />
        <meta property="twitter:description" content="Learn more about TheDanniCraft. A passionate developer, creator and community owner. The right place to learn more about TheDanniCraft and his work." />
        <meta property="twitter:image" content="https://cdn.thedannicraft.de/Portfolio.png" />
      </head>
      <body>
        <Theme children={children} />
      </body>
    </html>
  )
}
