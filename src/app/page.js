"use client"

import { Divider, Space } from '@mantine/core';

import GlobalLayout from '@/app/components/GlobalLayout';
import Introduction from '@/app/components/Introduction/Introduction';
import Stats from '@/app/components/Stats/Stats';
import Skills from '@/app/components/Skills/Skills';
import Portfolio from '@/app/components/Portfolio/Portfilio';
import Reviews from '@/app/components/Reviews/Reviews';


export default function Home() {
  return (
    <GlobalLayout>
      <Introduction />
      <Space className='seperator' />
      <Stats />
      <Space className='seperator' id='skills' />
      <Skills />
      <Space className='seperator' id='portfolio' />
      <Portfolio />
      <Space className='seperator' id='testimonials' />
      <Reviews />
      <Space className='seperator' />
    </GlobalLayout>
  )
}
