"use client"

import GlobalLayout from "@/app/components/GlobalLayout";
import { Center, Divider, Title, Text, Anchor, Stack, Space, Button, List, ThemeIcon, rem } from "@mantine/core";
import { IconMessageShare, IconWorld } from "@tabler/icons-react";

import './page.css';
export default function Legal() {
    return (
        <GlobalLayout>
            <Center>
                <Stack>
                    <Title>
                        Legal Notice – Impressum
                        <Text c="dimmed" size="xs">
                            Terms of Service, Privacy Policy and Refund Policy can be found <Anchor href="https://portal.termshub.io/thedannicraft.de/">here</Anchor> <br />
                            Impressum / Legal notice below:
                        </Text>
                    </Title>

                    <Space />

                    <Title order={4}>
                        Daniel Trui | TheDanniCraft <br />
                        Frankenweg 12, 75438 Knittlingen GERMANY <br />
                        <Text c="dimmed" size="xs">
                            No acceptance of parcels or packages without prior notice! <br />
                            Keine Annahme von Paketen oder Päckchen ohne vorherige Ankündigung!
                        </Text>
                    </Title>

                    <Text>
                        Phone / Tel.: <Anchor href="tel:+4917666330972">+49 17666330972</Anchor> <br />
                        E-Mail: <Anchor href="mailto:mail@thedannicraft.de">mail@thedannicraft.de</Anchor>
                    </Text>
                    <Title order={4}>
                        Legal representatives / Gesetzliche Vertreter: Daniel Trui <br />
                        Responsible for Website Content / Inhaltlich Verantwortlicher (§ 55 Abs. 2 RStV): Daniel Trui <br />
                        <Text c="dimmed" size="xs">
                            Misuse of these information (address, name, etc.) will be prosecuted under criminal law. <br />
                            Die unzulässige Verwendung dieser Informationen (Adresse, Name usw.) wird strafrechtlich verfolgt.
                        </Text>
                    </Title>

                    <Button leftSection={<IconMessageShare />} size="lg" className="contact" onClick={() => {
                        window.$chatwoot.toggle();
                        plausible('chat-open', { props: { context: 'legal' } })
                    }}>Open Chat</Button>

                    <Space />

                    <Title order={2}>Online dispute resolution – Online-Streitbeilegung
                        <Text>
                            The European Comission provides a platform for online dispute resolution, available <Anchor href="https://ec.europa.eu/consumers/odr/">here</Anchor> <br />
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit, die Sie <Anchor href="https://ec.europa.eu/consumers/odr/">hier</Anchor> finden <br />
                        </Text>
                        <Text c="dimmed" size="xs">
                            I am neither willing nor obliged to participate in dispute resolution proceedings in front of a consumer arbitration board. <br />
                            Ich bin weder bereit noch verpflichtet, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </Text>
                    </Title>

                    <Space />

                    <Title order={2}>Validy of this imprint – Gültigkeit dieses Impressums
                        <Text c="dimmed" size="xs">
                            This imprint is valid for the following websites, social media accounts and other services, as long as they are listed here: <br />
                            Dieses Impressum gilt für folgende Webseiten, Social Media Accounts und andere Dienste, sofern sie hier aufgeführt sind:
                        </Text>
                    </Title>
                    <List size="ls" withPadding>
                        <List.Item><Anchor href="https://thedannicraft.de">TheDanniCraft.de</Anchor></List.Item>
                        <List.Item><Anchor href="https://github.com/TheDanniCraft">Github.com/TheDanniCraft</Anchor></List.Item>
                        <List.Item><Anchor href="https://Discord.gg/8CXEAFqhgE">Discord.gg/8CXEAFqhgE</Anchor></List.Item>
                        <List.Item><Anchor href="https://youtube.com/thedannicraft">Youtube.com/TheDanniCraft</Anchor></List.Item>
                        <List.Item><Anchor href="https://twitch.tv/TheDanniCraft">Twitch.tv/TheDanniCraft</Anchor></List.Item>
                        <List.Item><Anchor href="https://Instagram.com/TheDanniCraft">Instagram.com/TheDanniCraft</Anchor></List.Item>
                        <List.Item><Anchor href="https://Threads.net/TheDanniCraft">Threads.net/TheDanniCraft</Anchor></List.Item>
                    </List>
                </Stack>
            </Center>
            <Space h="xl" />
        </GlobalLayout>
    )
}