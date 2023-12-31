"use client"

import { MantineProvider, createTheme } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function useTheme() {
    return useContext(ThemeContext);
}

export default function Theme(props) {
    const children = props.children
    const [theme, setTheme] = useLocalStorage({
        key: 'theme',
        defaultValue: createTheme({
            primaryColor: 'blue',
            fontFamily: 'Poppins'
        }),
    })

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            <MantineProvider theme={theme} defaultColorScheme="dark">
                {children}
            </MantineProvider>
        </ThemeContext.Provider>
    )
}