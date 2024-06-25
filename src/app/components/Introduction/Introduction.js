/* eslint-disable react/no-unescaped-entities */
import { Anchor, Button, Center, Grid, Group, Image, Stack, Text } from "@mantine/core";
import Portait from "../../static/img/Portrait.png";
import './Introduction.css';
import { IconBrandDiscord, IconBrandGithub, IconBrandInstagram, IconBrandThreads, IconBrandTwitch, IconBrandYoutube, IconCalendarMonth, IconBrandLinkedin } from "@tabler/icons-react";
import { usePlausible } from "next-plausible";
import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function Introduction() {
    const plausible = usePlausible()
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])

    return (
        <Center>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 7 }}>
                    <Text className="big">Hi,</Text>
                    <Text className="big">I am <Text span c="var(--mantine-primary-color-5)" className="big">TheDanniCraft</Text></Text>
                    <div className="animated-text big" >
                        a <span className="typing" />
                    </div>
                    <Text>
                        for over 5 years now. I started my journey on a discord server selling simple discord bots. Later, I moved to Fiverr and added website development to my portfolio.
                    </Text>
                    <Stack justify="space-between" align="flex-start">
                        <Group className="socials">
                            <Anchor c="var(--mantine-color-text)" href="https://github.com/thedannicraft">
                                <IconBrandGithub />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://linkedin.com/in/thedannicraft/">
                                <IconBrandLinkedin />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://discord.gg/f3VTeE3kaP">
                                <IconBrandDiscord />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://youtube.com/thedannicraft">
                                <IconBrandYoutube />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://twitch.tv/thedannicraft">
                                <IconBrandTwitch />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://instagram.com/thedannicraft">
                                <IconBrandInstagram />
                            </Anchor>
                            <Anchor c="var(--mantine-color-text)" href="https://threads.net/thedannicraft">
                                <IconBrandThreads />
                            </Anchor>

                        </Group>
                        <Button leftSection={<IconCalendarMonth />} size="lg" className="contact" data-cal-namespace="" data-cal-link="thedannicraft/30min" data-cal-config='{"layout":"month_view"}' onClick={() => {
                            plausible('chat-open', { props: { context: 'introduction' } })
                        }}>Get in Touch</Button>
                    </Stack>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 5 }} >
                    <div className="portrait-wrapper">
                        <svg width="100%" height="100%" viewBox="0 0 200 200" className="svg-overlay">
                            <g transform="matrix(1.2109,0,0,1.15743,104.699,101.333)">
                                <path d="M35.2,-62.3C47.1,-54 59.4,-47.7 67.5,-37.7C75.5,-27.6 79.4,-13.8 78.6,-0.4C77.9,13 72.7,25.9 65.2,37C57.8,48.2 48.1,57.4 36.9,65.4C25.6,73.5 12.8,80.4 -1.8,83.5C-16.4,86.6 -32.8,86 -44.6,78.2C-56.4,70.5 -63.5,55.6 -70.5,41.4C-77.6,27.2 -84.5,13.6 -86.1,-0.9C-87.7,-15.4 -83.9,-30.8 -77,-45.2C-70,-59.6 -59.9,-72.9 -46.5,-80.4C-33.2,-87.9 -16.6,-89.5 -2.5,-85.2C11.6,-80.9 23.2,-70.6 35.2,-62.3Z" style={{ fill: 'var(--mantine-primary-color-5)', fillRule: 'nonzero' }} />
                            </g>
                        </svg>
                        <Image src={Portait.src} className="portrait-image" alt="" />
                    </div>
                </Grid.Col>
            </Grid >
        </Center>
    )
}
