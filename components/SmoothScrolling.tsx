'use client';

import { ReactLenis } from 'lenis/react';

export function SmoothScrolling({ children }: { children: React.ReactNode }) {
    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    );
}
