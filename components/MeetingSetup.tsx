'use client'
import {
	DeviceSettings,
	VideoPreview,
	useCall,
	DeviceSelectorAudioInput,
	DeviceSelectorVideo,
} from '@stream-io/video-react-sdk'

import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from './ui/button'

const DisabledVideo = () => {
	return <h1>Please grant access to your microphone.</h1>
}

export default function MeetingSetup({
	setIsSetupComplete,
}: {
	setIsSetupComplete: (val: boolean) => void
}) {
	const [micCamOn, setMicCamOn] = useState(false)
	const [flipCamera, setFlipCamera] = useState(true)

	const call = useCall()

	if (!call) {
		throw new Error('call must be used within StreamCall component')
	}

	useEffect(() => {
		if (micCamOn) {
			call?.camera.disable()
			call?.microphone.disable()
		} else {
			call?.camera.enable()
			call?.microphone.enable()
		}
	}, [micCamOn, call?.camera, call?.microphone])
	return (
		<div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
			<h1 className="text-4xl font-bold">Meeting Setup</h1>
			<VideoPreview mirror={flipCamera} />
			<div className="flex h-16 items-center justify-center gap-3 ">
				<label className="flex items-center justify-center gap-2 font-medium ">
					<input
						type="checkbox"
						checked={micCamOn}
						onChange={(e) => setMicCamOn(e.target.checked)}
					/>
					Join with mic and camera off
				</label>
				<label className="flex items-center justify-center gap-2 font-medium ">
					<input
						type="checkbox"
						checked={flipCamera}
						onChange={(e) => setFlipCamera(e.target.checked)}
					/>
					Flip Camera
				</label>
				<DeviceSettings />
				{/* <DeviceSelectorVideo />
				<DeviceSelectorAudioInput /> */}
				<Button
					className="rounded-md bg-green-500 px-4 py-2.5"
					onClick={() => {
						call.join()
						setIsSetupComplete(true)
					}}
				>
					Join Meeting
				</Button>
			</div>
		</div>
	)
}
