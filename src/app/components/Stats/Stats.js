import { Center, Divider, Group, Stack, Text, NumberFormatter } from "@mantine/core";
import { useIntersection } from '@mantine/hooks';
import './Stats.css';
import { useEffect, useState } from "react";

function animateValue(setNumFunction, start, end, duration) {
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));
    var timer = setInterval(function () {
        current += increment;
        setNumFunction(current)
        if (current == end) {
            clearInterval(timer);
        }
    }, stepTime);

    return current;
}

export default function Stats() {
    var [clients, setClients] = useState(0)
    var [projects, setProjects] = useState(0)
    var [reviews, setReviews] = useState(0)

    const { ref, entry } = useIntersection({
        threshold: 0.3
    });

    useEffect(() => {
        if (entry?.isIntersecting) {
            animateValue(setClients, 0, 10, 500);
            animateValue(setProjects, 0, 25, 500);
            animateValue(setReviews, 0, 15, 500);
        }
        else {
            setClients(0);
            setProjects(0)
            setReviews(0)
        }
    }, [entry?.isIntersecting]);

    return (
        <Center>
            <Group ref={ref}>
                <Stack align="center" className="full">
                    <NumberFormatter suffix="+ " value={clients} thousandSeparator className="big-text-stats" id="clients" />
                    <Text className="small-text-stats">Clients satisfied</Text>
                </Stack>
                <Divider orientation="vertical" />
                <Stack align="center" className="full">
                    <NumberFormatter suffix="+ " value={projects} thousandSeparator className="big-text-stats" />
                    <Text className="small-text-stats">Projects completed</Text>
                </Stack>
                <Divider orientation="vertical" />
                <Stack align="center" className="full">
                    <NumberFormatter suffix="+ " value={reviews} thousandSeparator className="big-text-stats" />
                    <Text className="small-text-stats">Reviews given</Text>
                </Stack>
            </Group>
        </Center>
    )
}