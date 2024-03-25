"use client"

import GlobalLayout from "@/app/components/GlobalLayout";
import { Center, Divider, Title, Text, Anchor, Stack, Space } from "@mantine/core";

export default function Legal() {
    return (
        <GlobalLayout>
            <Center>
                <Stack>
                    <Title>Legal Notice – Impressum</Title>
                    <Text c="dimmed" size="xs">Terms of Service, Privacy Policy and Refund Policy can be found <Anchor href="https://portal.termshub.io/thedannicraft.de/">here</Anchor> </Text>
                    <Text c="dimmed" size="xs" order={4}>Impressum / Legal notice below</Text>

                    <Space h="xs" />

                    <Text>Daniel Trui | TheDanniCraft</Text>
                    <Text>Frankenweg 12, 75438 Knittlingen GERMANY</Text>
                    <Text>Phone / Tel.: <Anchor href="tel:+4917666330972">+49 17666330972</Anchor></Text>
                    <Text>E-Mail: <Anchor href="mailto:mail@thedannicraft.de">mail@thedannicraft.de</Anchor></Text>
                    <Text>Legal representatives / Gesetzliche Vertreter: Daniel Trui</Text>
                    <Text>Responsible for Website Content / Inhaltlich Verantwortlicher (§ 55 Abs. 2 RStV): Daniel Trui</Text>
                </Stack>
            </Center>
            <Space h="md" />
        </GlobalLayout>
    )
}