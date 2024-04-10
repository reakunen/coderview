import React from 'react'
import Image from 'next/image'
import MeetingTypeList from '@/components/MeetingTypeList'
export default function Home() {
	const now = new Date()
	const currentTime = new Date().toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
	})
	const currentDate = new Intl.DateTimeFormat('en-US', {
		dateStyle: 'full',
	}).format(now)
	return (
		<div className="flex size-full flex-col gap-10 text-white">
			<h1 className="text-3xl font-bold w-full rounded-lg">
				<Image
					className="bg-cover text-3xl font-bold h-[300px] w-full rounded-xl bg-blend-darken	brightness-50"
					// src="/images/taiwan.jpg"
					src="/images/beach.avif"
					width={500}
					height={500}
					alt="Picture of Chaewon"
				/>{' '}
				<div className="absolute top-32">
					<div className="flex flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
						<h2>Upcoming meeting at 12:30 PM </h2>
						<div className="flex flex-col gap-2">
							<h1 className="text-4xl font-extrabold md:text-6xl lg:text-7xl">
								{currentTime}
							</h1>
							<p className="text-lg font-semibold lg:text-2xl text-sky-1">
								{currentDate}
							</p>{' '}
						</div>
					</div>
				</div>
			</h1>
			<MeetingTypeList />
		</div>
	)
}
