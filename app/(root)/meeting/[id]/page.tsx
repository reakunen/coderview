'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import { useState } from 'react'
import MeetingSetup from '@/components/MeetingSetup'
import MeetingRoom from '@/components/MeetingRoom'
import Loader from '@/components/Loader'
import { useGetCallById } from '@/hooks/useGetCallById'

export default function Meeting({
	params: { id },
}: {
	params: { id: string }
}) {
	const { user, isLoaded } = useUser()

	const [isSetupComplete, setIsSetupComplete] = useState(false)
	const { call, callLoading } = useGetCallById(id)

	if (!isLoaded || callLoading) return <Loader />
	return (
		<main className="h-screen w-full">
			<StreamCall call={call}>
				<StreamTheme>
					{!isSetupComplete ? (
						<MeetingSetup setIsSetupComplete={setIsSetupComplete} />
					) : (
						<MeetingRoom />
					)}
				</StreamTheme>
			</StreamCall>
		</main>
	)
}
