import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from "@mantine/carousel";
import { Card, Center, Image, NavLink, Pill, Space, Stack, Text, Title } from "@mantine/core";
import './Portfolio.css';
import { IconScreenShare } from '@tabler/icons-react';
import { usePlausible } from 'next-plausible';
import { base, useCMSData } from '@/app/CMS'

export default function Portfolio() {
    const plausible = usePlausible()
    const autoplay = useRef(Autoplay({ delay: 2000 }));
    const projects = useCMSData('projects');

    return (
        <>
            <Stack>
                <Title >Some Of My <Text span inherit c="var(--mantine-primary-color-5)">Work</Text></Title>
                <Title order={5}>These are some of my works.<Text inline inherit>Some of them are made just for fun, others were made for customers.</Text></Title>
            </Stack>
            <Space h="xl" />
            <Carousel slideSize="var(--slider-size)"
                slideGap="md"
                draggable={false}
                loop
                plugins={[autoplay.current]}
                onMouseEnter={autoplay.current.stop}
                onMouseLeave={autoplay.current.reset}
            >
                {
                    projects.map((project, index) => (
                        <Carousel.Slide key={index}>
                            <Card className="project">
                                <Stack justify="space-between" h="100%">
                                    <div>
                                        <Center>
                                            <Image src={`${base}/api/files/${project.collectionId}/${project.id}/${project.thumbnail}`} alt='' radius="md" className='portfolio-image' />
                                        </Center>
                                        <Space h="xs" />
                                        {
                                            project?.tags?.map((tag, index) => (
                                                <Pill key={index} c="var(--mantine-primary-color-5)" className='tag'>{tag}</Pill>
                                            ))
                                        }
                                        <Space h="xs" />
                                        <Title className='project-title'>{project.name}</Title>
                                        <div className='project-description'>{project.description}</div>
                                    </div>
                                    <NavLink disabled={project.link ? false : true} href={project.link ? project.link : '#portfolio'} leftSection={<IconScreenShare />} label="Open Project" onClick={() => plausible('open-project', { props: { project: project.name } })} />
                                </Stack>
                            </Card>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </>
    )
}