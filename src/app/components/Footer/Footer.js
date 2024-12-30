import Link from 'next/link';
import './Footer.css';
import { Flex, Stack, Title, Anchor, Space, Image, rem, Center } from "@mantine/core";
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Footer() {
    const [statusColor, setStatusColor] = useState("#ffffff");
    const [statusText, setStatusText] = useState("Loading...");

    useEffect(() => {
        axios.get('https://n8n.thedannicraft.de/webhook/80d512f5-dbab-4939-81ad-85d5b04ee1a8', {

        })
            .then(response => {
                switch (response.data.status) {
                    case "DOWN":
                        setStatusColor('#dc3545');
                        setStatusText('Major outage');
                        break;
                    case "UP":
                        setStatusColor('#5cdd8b');
                        setStatusText('All systems operational');
                        break;
                    case "PARTIAL":
                        setStatusColor('#f8a306');
                        setStatusText('Partial outage');
                        break;
                    case "MAINTENANCE":
                        setStatusColor('#1747f5');
                        setStatusText('Under maintenance');
                        break;
                }
            })
            .catch(error => {
                setStatusColor('#ffffff');
                setStatusText('Service status unknown');
            });
    }, []);

    return (
        <>
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
                    <Anchor href="https://status.thedannicraft.de" c="var(--mantine-color-primary)" underline='never'>
                        Status
                    </Anchor>
                    <Anchor href="https://donation.thedannicraft.de" c="var(--mantine-color-primary)" underline='never'>
                        Donate
                    </Anchor>
                </Stack>
                <Stack>
                    <Title order={3} c="var(--mantine-primary-color-5)">
                        Socials
                    </Title>

                    <Anchor href="https://github.com/thedannicraft" c="var(--mantine-color-text)" underline='never'>
                        Github
                    </Anchor>
                    <Anchor href="https://discord.gg/f3VTeE3kaP" c="var(--mantine-color-text)" underline='never'>
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
            </Flex>
            <Space h="50" />
            <Flex justify="center" >
                <Anchor href="https://status.thedannicraft.de" underline='never' c="var(--mantine-color-text)">
                    <Flex align="center" className="statusBadge">
                        <svg width="25px" height="auto" viewBox="0 0 1080 1080" version="1.1" style={{ fill: `${statusColor}`, fillRule: 'evenodd', clipRule: 'evenodd', strokeLinejoin: 'round', strokeMiterlimit: 2 }}>
                            <g transform="matrix(0.925926,0,0,0.925926,40,40)">
                                <g transform="matrix(1.55975,0,0,1.55975,-52.0755,-337.358)">
                                    <circle cx="379.597" cy="562.5" r="346.21" style={{ fillOpacity: 0.75 }} />
                                </g>
                                <g transform="matrix(1.07955,0,0,1.07955,-66.856,-164.016)">
                                    <circle cx="562.137" cy="652.137" r="370.524" />
                                </g>
                            </g>
                        </svg>
                        <span style={{ marginLeft: '8px', marginRight: '2px' }}>{statusText}</span>
                    </Flex>
                </Anchor>
            </Flex>
        </>
    )
}