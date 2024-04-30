import { Avatar, Button, Card, Center, Divider, Grid, Group, Image, NumberFormatter, Paper, Progress, Rating, Space, Stack, Text, Title, UnstyledButton } from "@mantine/core";

import './Reviews.css'
import { IconStarFilled } from "@tabler/icons-react";
import { useState } from "react";
import { base, useCMSData } from '@/app/CMS'

export default function Reviews() {
    const [starFilter, setStarFilter] = useState(null);
    const reviews = useCMSData('reviews');

    function calculateAverageRating() {
        if (reviews.length === 0) {
            return 0;
        }

        const totalRating = reviews.reduce(function (acc, review) {
            return acc + review.stars;
        }, 0);
        return (totalRating / reviews.length).toFixed(1);
    }

    function reviewPercentage(value) {
        const matchingReviews = reviews.filter(review => review.stars === value);

        const percentage = (matchingReviews.length / reviews.length) * 100;
        return percentage;
    }

    function toggleFilter(stars) {
        if (starFilter == null || starFilter != stars) {
            setStarFilter(stars)
        }
        else {
            setStarFilter(null)
        }
    }

    return (
        <>
            <Text size="xl" c="var(--mantine-primary-color-5)">Testimonials</Text>
            <Title>What clients say about my <Text span inherit c="var(--mantine-primary-color-5)">work</Text>?</Title>
            <Space h="xl" />
            <Grid>
                <Grid.Col span={{ base: 12, sm: 3 }}>
                    <Card>
                        <Stack>
                            <Center>
                                <Group gap="5">
                                    <Rating value={calculateAverageRating()} fractions={40} readOnly size="lg" />
                                </Group>

                            </Center>
                            <Divider />
                            <Center>
                                <Group gap="5">
                                    <NumberFormatter value={calculateAverageRating()} decimalScale={1} />
                                    <IconStarFilled size="15" />
                                </Group>
                            </Center>
                            <Divider />
                            <Stack gap="0px">
                                {
                                    Array.from({ length: 5 }, (_, i) => (
                                        <UnstyledButton key={5 - i} onClick={() => toggleFilter(5 - i)}>
                                            <Group gap="xs" justify="space-between">
                                                <Text c={starFilter == (5 - i) ? "var(--mantine-color-yellow-7)" : "grey"}>{5 - i}</Text>
                                                <Progress className="reviewBar" value={reviewPercentage(5 - i)} color={starFilter == null || starFilter == (5 - i) ? "var(--mantine-color-yellow-7)" : "grey"} />
                                            </Group>
                                        </UnstyledButton>
                                    ))
                                }
                            </Stack>
                        </Stack>
                    </Card>
                </Grid.Col>
                <Grid.Col span={{ base: 12, sm: 9 }}>{
                    <Grid grow>
                        {
                            reviews.filter(review => starFilter === null || review.stars === starFilter).map((review, index) => (
                                <Grid.Col key={index}>
                                    <Card>
                                        <Group>
                                            <Avatar radius="xl" />
                                            {review.name}
                                            <Avatar src={`https://raw.githubusercontent.com/TheDanniCraft/FlagSVG/master/src/exported/${review.country}.svg`} radius="sm" size="sm" />
                                        </Group>
                                        <Divider my="sm" />
                                        <Rating value={review.stars} fractions={1} readOnly size="sm" />
                                        <Space h="xs" />
                                        {review.review}
                                        <Divider my="sm" />
                                        <Group>
                                            {review.product}
                                            <Divider orientation="vertical" />
                                            {Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short' }).format(new Date(Date.parse(review.date)))}
                                            <Divider orientation="vertical" />
                                            {review.source}
                                        </Group>
                                    </Card>
                                </Grid.Col>
                            ))
                        }
                    </Grid>
                }</Grid.Col>
            </Grid>
        </>
    )
}