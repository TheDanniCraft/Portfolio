import { useRef } from 'react';
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from "@mantine/carousel";
import { Card, Center, Image, NavLink, Pill, Space, Stack, Text, Title } from "@mantine/core";
import './Portfolio.css';
import { IconScreenShare } from '@tabler/icons-react';

const projects = [
    {
        name: "Terminal Website",
        description: "A terminal styled website, built with react and deployed to github pages.",
        thumbnail: "https://cdn.thedannicraft.de/Terminal.png",
        link: "https://github.com/TheDanniCraft/TerminalWebsite",
        tags: ["website"]
    },
    {
        name: "GamerForge System",
        description: "My first discord bot, and the first project ever released. Written in discord.js and frequently updated. It is the main bot on my server GamerForge.",
        thumbnail: "https://cdn.thedannicraft.de/Bot.png",
        link: "https://discord.gg/deutsch",
        tags: ["bot"]
    },
    {
        name: "MonsterBattle Cards",
        description: "My first time participating in a game jam. The game was made in 4 days using C# with Unity. - Choose your cards wisely and conquer your foes in Monster Battle Cards!",
        thumbnail: "https://img.itch.zone/aW1nLzExNzAzMjU2LnBuZw==/315x250%23c/cVQ5wZ.png",
        link: "https://thedannicraft.itch.io/monsterbattle-cards",
        tags: ["game-jam", "made in 4 days", "game"]
    },
    {
        name: "Time Kills You",
        description: "My second time participating in a game jam, this time with a friend. - Race Against Time, Solve Puzzles Divine; In 'Time Kills You,' Survival is the Line!",
        thumbnail: "https://img.itch.zone/aW1nLzEzMDEyNzkyLnBuZw==/315x250%23c/OxC7G9.png",
        link: "https://thedannicraft.itch.io/time-kills-you",
        tags: ["game-jam", "made in 4 days", "game"]
    },
    {
        name: "GlobalDiscord",
        description: "Global Discord is a bot that allows you to chat with users on other servers and make new friends. The chat is moderated around the clock by moderators to prevent spam, advertising and scamming.",
        thumbnail: "https://cdn.discordapp.com/avatars/832303489027276800/9d7703ea614eb749bb6261c0718c0d93.png",
        tags: ["bot"]
    }
]

export default function Portfolio() {
    const autoplay = useRef(Autoplay({ delay: 2000 }));

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
                                            <Image src={project.thumbnail} alt='' radius="md" className='portfolio-image' />
                                        </Center>
                                        {
                                            project?.tags?.map((tag, index) => (
                                                <Pill key={index} c="var(--mantine-primary-color-5)" className='tag'>{tag}</Pill>
                                            ))
                                        }
                                        <Space h="xs" />
                                        <Title className='project-title'>{project.name}</Title>
                                        <Text className='project-description'>{project.description}</Text>
                                    </div>
                                    <NavLink disabled={project.link ? false : true} href={project.link} leftSection={<IconScreenShare />} label="Open Project" />
                                </Stack>
                            </Card>
                        </Carousel.Slide>
                    ))
                }
            </Carousel>
        </>
    )
}