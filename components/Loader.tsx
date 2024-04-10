import React from 'react'
import Image from 'next/image'

export default function Loader() {
	return (
		<div className="flex-center h-screen w-full flex-col gap-4">
			<Image
				src={'/images/kitty.png'}
				alt="Loading..."
				width={450}
				height={450}
				className="rounded-full animate-bounce"
			/>
			<h1 className="text-6xl font-bold animate-pulse">Loading...</h1>
		</div>
	)
}
