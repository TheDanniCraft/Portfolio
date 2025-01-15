import { Button, Grid, Group, NumberFormatter, Progress, Space, Text, Title } from "@mantine/core";
import './Skills.css';
import { IconHeartHandshake } from "@tabler/icons-react";
import { usePlausible } from "next-plausible";
import { useCMSData } from '@/app/CMS'
import useCal from "@/app/Cal";
export default function Skills() {
    const plausible = usePlausible();
    const skills = useCMSData('skills');

    useCal();

    return (
        <>
            <Grid>
                <Grid.Col span={{ base: 12, sm: 7 }}>
                    <Text size="xl" c="var(--mantine-primary-color-5)">My Skills</Text>
                    <Title>Why Hire Me For Your Next <Text span inherit c="var(--mantine-primary-color-5)">Project</Text>?</Title>
                    <Text>
                        I am a skilled developer with expertise in web, software, Minecraft plugin, and game development.
                        With a solid background and extensive experience in these areas, I offer a unique combination of technical proficiency and creative problem-solving skills to every project.
                        My commitment to staying current with the latest technologies ensures that I deliver high-quality, innovative solutions that meet and exceed expectations.
                        Hiring me means bringing on board a proactive and adaptable professional committed to delivering exceptional results in software and game development.
                    </Text>
                    <Space h="xs" />
                    <Button size="md" className="hire" leftSection={<IconHeartHandshake />} data-cal-namespace="" data-cal-link="thedannicraft/free" data-cal-config='{"layout":"month_view"}' onClick={() => {
                        plausible('cal-open', { props: { context: 'skills' } })
                    }}>Discuss my project</Button>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 5 }}>
                    {
                        skills.map((skill, index) => (
                            <div key={index} className="skill">
                                <Group justify="space-between">
                                    <Text>{skill.name}</Text>
                                    <NumberFormatter suffix="%" value={skill.percentage} />
                                </Group>
                                <Progress color={skill.color} value={skill.percentage} />
                            </div>
                        ))
                    }
                </Grid.Col>
            </Grid>
        </>
    )
}