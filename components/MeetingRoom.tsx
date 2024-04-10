'use client'
import {
	CallControls,
	CallParticipantsList,
	CallStatsButton,
	PaginatedGridLayout,
	SpeakerLayout,
} from '@stream-io/video-react-sdk'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LayoutList, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

type CallLayoutType = 'grid' | 'speaker-right' | 'speaker-left'
// const { useCallCallingState } = useCallStateHooks()

const CallLayouts = ['Grid', 'Speaker-Right', 'Speaker-Left']

export default function MeetingRoom() {
	const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
	const [showParticipants, setShowParticipants] = useState(true)

	const CallLayout = () => {
		switch (layout) {
			case 'grid':
				return <PaginatedGridLayout />
			case 'speaker-right':
				return <SpeakerLayout participantsBarPosition={'left'} />
			default:
				return <SpeakerLayout participantsBarPosition={'right'} />
		}
	}
	const router = useRouter()
	return (
		<section className="relative h-screen w-full overflow-hidden pt-4 text-white">
			<div className="relative flex size-full items-center justify-center">
				<div className="flex size-full max-w-[1024px] items-center">
					<CallLayout />
				</div>
				<div
					className={cn(
						'h-[calc(100vh-86px)] w-[250px] hidden ml-4 bg-dark-3 p-6 rounded-lg',
						{
							block: showParticipants,
						}
					)}
				>
					<CallParticipantsList onClose={() => setShowParticipants(false)} />
				</div>
			</div>
			<div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
				<CallControls onLeave={() => router.push('/')} />
				<DropdownMenu>
					<DropdownMenuTrigger className="cursor-pointer p-2 rounded-full bg-[#19232d] hover:bg-[#4c535b]">
						<LayoutList size={20} className="text-white" />
					</DropdownMenuTrigger>
					<DropdownMenuContent className="border-dark-1 bg-dark-2 text-white">
						{CallLayouts.map((type) => (
							<div key={type}>
								<DropdownMenuItem
									className="cursor-pointer py-2"
									onClick={() =>
										setLayout(type.toLowerCase() as CallLayoutType)
									}
								>
									{type}
								</DropdownMenuItem>
								{/* <DropdownMenuSeparator className="border-dark-1 text-dark-1" /> */}
							</div>
						))}
					</DropdownMenuContent>
				</DropdownMenu>
				<CallStatsButton />
				<button
					className="cursor-pointer p-2 rounded-full bg-[#19232d] hover:bg-[#4c535b]"
					onClick={() => setShowParticipants((prev) => !prev)}
				>
					<Users size={20} />
				</button>
			</div>
		</section>
	)
}
