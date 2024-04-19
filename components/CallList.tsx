'use client'
import { useGetCalls } from '@/hooks/useGetCalls'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Call } from '@stream-io/video-react-sdk'
import { CallRecording } from '@stream-io/video-react-sdk'
import MeetingCard from './MeetingCard'
import { Button } from './ui/button'
import {
	ArrowLeftIcon,
	CalendarCheck2Icon,
	PlayIcon,
	VideoIcon,
} from 'lucide-react'
import { useToast } from './ui/use-toast'

export default function CallList({
	type,
}: {
	type: 'ended' | 'upcoming' | 'recordings'
}) {
	const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls()
	const router = useRouter()
	const [recordings, setRecordings] = useState<CallRecording[]>([])
	const getCalls = () => {
		switch (type) {
			case 'ended':
				return endedCalls
			case 'recordings':
				return callRecordings
			case 'upcoming':
				return upcomingCalls
			default:
				return []
		}
	}
	const {toast} = useToast() 
	const getNoCallsMessage = () => {
		switch (type) {
			case 'ended':
				return 'No Previous Calls'
			case 'recordings':
				return 'No Recordings'
			case 'upcoming':
				return 'No Upcoming Calls'
			default:
				return ''
		}
	}
	const calls = getCalls()
	const noCallsMessage = getNoCallsMessage()

	useEffect(() => {
		const fetchRecordings = async () => {
			try {

			
			const callData = await Promise.all(
				callRecordings.map((meeting) => meeting.queryRecordings())
			)

			const recordingsData = callData
				.filter(call => call.recordings.length > 0)
				.flatMap(call => call.recordings)

			setRecordings(recordingsData) 
		} catch (e) {
			toast({ title: 'Try Again Later', })
		}
		}
		if (type === 'recordings') fetchRecordings() 
	}, [type, callRecordings])
	return (
		<div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
			{calls && calls.length > 0 ? (
				calls.map((meeting: Call | CallRecording) => (
					<MeetingCard
						key={(meeting as Call).id}
						Icon={
							type === 'ended'
								? ArrowLeftIcon
								: type === 'upcoming'
								? CalendarCheck2Icon
								: VideoIcon
						}
						title={
							(meeting as Call).state?.custom?.description ||
							(meeting as CallRecording).filename?.substring(0, 20) ||
							'No Description'
						}
						date={
							(meeting as Call).state?.startsAt?.toLocaleString() ||
							(meeting as CallRecording).start_time?.toLocaleString()
						}
						isPreviousMeeting={type === 'ended'}
						link={
							type === 'recordings'
								? (meeting as CallRecording).url
								: `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
										(meeting as Call).id
								  }`
						}
						ButtonIcon={PlayIcon}
						buttonText={type === 'recordings' ? 'Play' : 'Start'}
						handleClick={
							type === 'recordings'
								? () => router.push(`${(meeting as CallRecording).url}`)
								: () => router.push(`/meeting/${(meeting as Call).id}`)
						}
					/>
				))
			) : (
				<h1 className="text-2xl font-bold text-white">{noCallsMessage}</h1>
			)}
		</div>
	)
}
