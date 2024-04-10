'use client'

import { useEffect, useState } from 'react'
import {
	StreamCall,
	StreamVideo,
	StreamVideoClient,
	User,
} from '@stream-io/video-react-sdk'
import { ReactNode } from 'react'
import { useUser } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import { tokenProvider } from '@/actions/stream.actions'

export const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
	const [videoClient, setVideoClient] = useState<StreamVideoClient>()
	const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
	const { user, isLoaded } = useUser()
	useEffect(() => {
		if (!isLoaded || !user) return
		if (!apiKey) throw new Error('Stream API Key missing')
		// const token = tokenProvider()
		const client = new StreamVideoClient({
			apiKey,
			user: {
				id: user?.id,
				name: user?.username || user?.id,
				image: user?.imageUrl,
			},
			tokenProvider,
			// token: token,
		})

		setVideoClient(client)
	}, [user, isLoaded])

	if (!videoClient) return <Loader />
	return <StreamVideo client={videoClient}>{children}</StreamVideo>
}
