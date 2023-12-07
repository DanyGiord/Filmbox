"use client"

import { ReactNode } from "react"
import { ConvexReactClient } from 'convex/react';
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
    children
}: {
    children: ReactNode
}) => {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
            appearance={{
                baseTheme: dark,
            }}
        >
            <ConvexProviderWithClerk
                useAuth={useAuth}
                client={convex}
            >
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    )
} 