"use client"

import { Fragment, useEffect } from 'react';
import { ActionIcon, Affix, Anchor, AppShell, Burger, Button, Divider, Group, Space, Text, Transition, useMantineColorScheme, useMantineTheme, Popover, Switch, Center, Stack, ScrollArea, createTheme, mergeMantineTheme } from '@mantine/core';
import { useDisclosure, useForceUpdate, useWindowScroll } from '@mantine/hooks'
import { IconArrowUp, IconDownload, IconMoon, IconPaintFilled, IconSun } from "@tabler/icons-react";
import Link from 'next/link';

import ChatwootWidget from './components/ChatwootWidget';
import Introduction from '@/app/components/Introduction/Introduction';
import Stats from '@/app/components/Stats/Stats';
import Skills from '@/app/components/Skills/Skills';
import Portfolio from '@/app/components/Portfolio/Portfilio';
import Reviews from '@/app/components/Reviews/Reviews';
import { useTheme } from './Theme';
import PlausibleProvider, { usePlausible } from 'next-plausible'

const links = [
  {
    label: 'Home',
    href: '#home'
  },
  {
    label: 'Skills',
    href: '#skills'
  },
  {
    label: 'Portfolio',
    href: '#portfolio'
  },
  {
    label: 'Testimonials',
    href: '#testimonials',
    hidden: true
  },
]


export default function Home() {
  const plausible = usePlausible()
  const [opened, { toggle }] = useDisclosure();
  const [scroll, scrollTo] = useWindowScroll();
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const { setTheme } = useTheme();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <PlausibleProvider domain="thedannicraft.de" customDomain="https://analytics.thedannicraft.de" trackOutboundLinks trackFileDownloads trackLocalhost selfHosted enabled pageviewProps={{
        colorscheme: colorScheme,
        color: theme.primaryColor
      }} />
      <AppShell.Header withBorder={false}>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            <Text size="xl">TheDanniCraft</Text>
            <Group ml="xl" gap={25} visibleFrom="sm">
              {
                links.filter(link => !link.hidden).map((link) => (
                  <Anchor key={link.label} href={link.href} c="var(--mantine-color-text)" underline='never'>
                    {link.label}
                  </Anchor>
                ))
              }
            </Group>
            <Link href="https://cdn.thedannicraft.de/CV-TheDanniCraft.pdf" target='_blank' onClick={() => plausible('cv-download')} >
              <Button variant='outline' leftSection={<IconDownload />} visibleFrom="sm">
                Downlaod CV
              </Button>
            </Link>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        {
          links.filter(link => !link.hidden).map((link) => (
            <Anchor key={link.label} href={link.href} c="var(--mantine-primary-color-5)" underline='never' onClick={toggle}>
              {link.label}
            </Anchor>
          ))
        }
        <Divider my="md" />
        <Link href="https://cdn.thedannicraft.de/CV-TheDanniCraft.pdf" target='_blank' onClick={() => plausible('cv-download')} >
          <Button variant='outline' leftSection={<IconDownload />} fullWidth>
            Downlaod CV
          </Button>
        </Link>
      </AppShell.Navbar>

      <AppShell.Main id="home">
        <Introduction />
        <Space className='seperator' />
        <Stats />
        <Space className='seperator' id='skills' />
        <Skills />
        <Space className='seperator' id='portfolio' />
        <Portfolio />
        {
          /*  Add reviews once permission to publish a review
            <Space className='seperator' id='testimonials' />
            <Reviews />
          */
        }
        <Space className='seperator' />
        <Divider />

        <Fragment>
          <ChatwootWidget />
        </Fragment>
      </AppShell.Main>

      <Affix position={{ bottom: 20, left: 20 }}>

        <Popover width="5vh" trapFocus position="bottom" withArrow shadow="md">
          <Popover.Target>
            <ActionIcon
              size="xl"
            >
              <IconPaintFilled />
            </ActionIcon>
          </Popover.Target>
          <Popover.Dropdown>

            <Stack align="center">
              <ActionIcon
                size="3vh"
                onClick={() => {
                  setColorScheme(colorScheme === 'light' ? 'dark' : 'light')
                  plausible('colorScheme-change', { props: { colorscheme: `${colorScheme} ➜ ${colorScheme === 'light' ? 'dark' : 'light'}` } })
                }}
                variant="default"
              >
                <IconSun color='var(--mantine-color-yellow-4)' display={colorScheme == 'light' ? "none" : "block"} />
                <IconMoon color='var(--mantine-color-blue-6)' display={colorScheme == 'dark' ? "none" : "block"} />
              </ActionIcon>
              {
                Object.keys(theme.colors).map((color, index) => (
                  <ActionIcon size="3vh" key={index} color={color} variant="filled" onClick={() => {
                    const newTheme = createTheme({
                      primaryColor: color
                    })

                    setTheme(mergeMantineTheme(theme, newTheme))
                    plausible('color-change', { props: { color: `${theme.primaryColor} ➜ ${color}` } })
                  }} />
                ))
              }
            </Stack>
          </Popover.Dropdown>
        </Popover>
      </Affix>
      <Affix position={{ bottom: 20, right: 20 }}>
        <Transition transition="slide-up" mounted={scroll.y > 0}>
          {(transitionStyles) => (
            <ActionIcon
              style={transitionStyles}
              onClick={() => scrollTo({ y: 0 })}
              size="xl"
            >
              <IconArrowUp />
            </ActionIcon>
          )}
        </Transition>
      </Affix>
    </AppShell>
  )
}
