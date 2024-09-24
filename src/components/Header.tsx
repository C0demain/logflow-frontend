'use client';

import { Navbar } from "@/components/navbar";

interface HeaderProps {
    token: string | null; // Accepts string or null
}

export function Header({ token }: HeaderProps) {
    return (
        <>
            {token && <Navbar />} {/* Render Navbar if token exists */}
        </>
    );
}
