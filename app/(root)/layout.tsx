import { StreamVideoProvider } from '@/providers/StreamClientProvider'
import React, { ReactNode } from 'react'
import '@stream-io/video-react-sdk/dist/css/styles.css'

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<div className="">
			<StreamVideoProvider>{children}</StreamVideoProvider>
		</div>
	)
}
