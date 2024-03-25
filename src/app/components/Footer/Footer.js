import Link from 'next/link';
import './Footer.css';
import { Flex, Stack, Title, Anchor, Space } from "@mantine/core";

export default function Footer() {
    return (
        <Flex
            mih={50}
            gap="xl"
            align="flex-start"
            direction="row"
            className='footer-container'
            wrap="wrap"
        >
            <Stack>
                <Title order={3} c="var(--mantine-primary-color-5)">
                    Company
                </Title>

                <Anchor href="/" c="var(--mantine-color-primary)" underline='never'>
                    Home
                </Anchor>
                <Anchor href="/legal" c="var(--mantine-color-primary)" underline='never'>
                    Legal / Impressum
                </Anchor>
            </Stack>
            <Stack>
                <Title order={3} c="var(--mantine-primary-color-5)">
                    Socials
                </Title>

                <Anchor href="https://github.com/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                    Github
                </Anchor>
                <Anchor href="https://discord.gg/8CXEAFqhgE" c="var(--mantine-color-text)" underline='never'>
                    Discord
                </Anchor>
                <Anchor href="https://youtube.com/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                    YouTube
                </Anchor>
                <Anchor href="https://twitch.tv/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                    Twitch
                </Anchor>
                <Anchor href="https://instagram.com/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                    Instagram
                </Anchor>
                <Anchor href="https://threads.net/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                    Threads
                </Anchor>
            </Stack>
            <Space className='seperator' />
        </Flex>
    )
}