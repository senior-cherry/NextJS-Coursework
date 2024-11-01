"use client";

import {Image, Flex, Button, HStack, Box, Menu, MenuButton, IconButton, MenuList, MenuItem} from '@chakra-ui/react';
import Link from "next/link";
import {SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/nextjs";
import {
    CalendarIcon,
    HamburgerIcon,
    InfoIcon,
    SearchIcon, SettingsIcon
} from "@chakra-ui/icons";


const Header = () => {
    return (
        <Box className="header">
            <Flex
                w="100%"
                px="6"
                py="5"
                align="center"
                justify="space-between"
            >
                <Link href="/">
                    <Image src='/uploads/logo_w_bg-removebg-preview.png' alt='Paw in Paw' width="150" height="75" />
                </Link>
                <div className="mobile-menu">
                    <Menu>
                        <MenuButton
                            as={IconButton}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                        />
                        <MenuList>
                            <Link href="/about">
                                <MenuItem icon={<InfoIcon />} color={"black"}>
                                        Про нас
                                </MenuItem>
                            </Link>
                            <Link href="/pets">
                                <MenuItem icon={<SearchIcon />} color={"black"}>
                                        Улюбленці
                                </MenuItem>
                            </Link>
                            <Link href="/blog">
                                <MenuItem icon={<CalendarIcon />} color={"black"}>
                                        Блог
                                </MenuItem>
                            </Link>
                            <Link href="/dashboard">
                                <MenuItem icon={<SettingsIcon />} color={"black"}>
                                        Адміністративна панель
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Menu>
                </div>
                <HStack as="nav" spacing="5" fontSize={32} letterSpacing={2} className="menu">
                        <Link href="/about">
                            <Button variant="nav">Про нас</Button>
                        </Link>
                    <Link href="/pets">
                        <Button variant="nav">Улюбленці</Button>
                    </Link>
                    <Link href="/blog">
                        <Button variant="nav">Блог</Button>
                    </Link>
                    <Link href="/dashboard">
                        <Button variant="nav">Адміністративна панель</Button>
                    </Link>
                </HStack>
                <HStack>
                    <SignedOut>
                        <SignInButton />
                    </SignedOut>
                    <SignedIn>
                        <UserButton afterSignOutUrl="/" />
                    </SignedIn>
                </HStack>
            </Flex>
        </Box>
    );
}

export default Header;