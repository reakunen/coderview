import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
// import '@stream-io/video-react-sdk/dist/css/style.css'

const inter = Inter({ subsets: ['latin'] })

import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
import { Toaster } from '@/components/ui/toaster'

export const metadata: Metadata = {
	title: 'CoderView',
	description: 'Interviewing platform built all in one.',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<ClerkProvider
				appearance={{
					baseTheme: dark,
				}}
			>
				<body
					className={cn(inter.className, 'dot-background bg-dark-2 text-white')}
				>
					{children}
					<Toaster />
				</body>
			</ClerkProvider>
		</html>
	)
}
