'use client'

import React from 'react'
import ReactDatePicker from 'react-datepicker'
import HomeCard from './HomeCard'
import { useState } from 'react'
import {
	Plus,
	CalendarDays,
	Calendar,
	VideoIcon,
	UserRoundPlus,
	Clipboard,
	ClipboardList,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from './ui/use-toast'
import { Textarea } from '@/components/ui/textarea'
import 'react-datepicker/dist/react-datepicker.css'

export default function MeetingTypeList() {
	const [meetingState, setMeetingState] = useState<
		'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined
	>(undefined)
	const { user } = useUser()
	const client = useStreamVideoClient()
	const [values, setValues] = useState({
		dateTime: new Date(),
		description: '',
		link: '',
	})
	const { toast } = useToast()
	const router = useRouter()
	const [callDetails, setCallDetails] = useState<Call>()

	const createMeeting = async () => {
		if (!client || !user) return
		try {
			if (!values.dateTime) {
				toast({
					title: 'Please select a date and time.',
				})
				return
			}
			const id = crypto.randomUUID()
			const call = client.call('default', id)

			if (!call) throw new Error('Failed to create call')

			const startsAt =
				values.dateTime.toISOString() || new Date(Date.now()).toISOString()

			const description = values.description || 'Instant Meeting'

			await call.getOrCreate({
				data: {
					starts_at: startsAt,
					custom: {
						description,
					},
				},
			})

			setCallDetails(call)

			if (!values.description) {
				router.push(`/meeting/${call.id}`)
			}
			toast({
				title: 'Hooray! Your meeting has been created!',
			})
		} catch (error) {
			console.log(error)
			toast({
				title: 'Failed to Create Meeting',
				description: `Error: ${error}`,
			})
		}
	}
	const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
	return (
		<section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
			<HomeCard
				IconSus={Plus}
				title="New Meeting"
				description="Set up a new recording!"
				handleClick={() => setMeetingState('isInstantMeeting')}
				className={[
					'bg-gradient-to-r from-orange-500 to-red-500',
					'bg-orange-700',
				]}
			/>
			<HomeCard
				IconSus={UserRoundPlus}
				title="Join Meeting"
				description="via invitation link!"
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className={[
					'bg-gradient-to-r from-blue-500 to-violet-500',
					'bg-blue-700',
				]}
			/>
			<HomeCard
				IconSus={CalendarDays}
				title="Schedule Meeting"
				description="Plan your meeting"
				handleClick={() => setMeetingState('isScheduleMeeting')}
				className={[
					'bg-gradient-to-r from-purple-500 to-violet-500',
					'bg-purple-700',
				]}
			/>
			<HomeCard
				IconSus={VideoIcon}
				title="View Recordings"
				description="Meeting recordings"
				handleClick={() => setMeetingState('isJoiningMeeting')}
				className={[
					'bg-gradient-to-r from-yellow-500 to-amber-500',
					'bg-yellow-700',
				]}
			/>
			
			{!callDetails ? (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title="Create a new meeting"
					className="text-center"
					buttonText="Schedule Meeting"
					handleClick={createMeeting}
				>
					<div className="flex flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px] text-sky-1">
							Add a description
						</label>
						<Textarea
							className="border-none bg-dark-3 focus-visible:ring-0 focus-visible-ring-offset-0"
							placeholder="Type your message here."
							onChange={(e) =>
								setValues({ ...values, description: e.target.value })
							}
						/>
					</div>
					<div className="flex w-full flex-col gap-2.5">
						<label className="text-base text-normal leading-[22px] text-sky-1">
							Select date and time
						</label>
						<ReactDatePicker
							selected={values.dateTime}
							onChange={(date) => setValues({ ...values, dateTime: date! })}
							showTimeSelect
							timeFormat="HH:mm"
							timeIntervals={15}
							timeCaption="time"
							dateFormat="MMMM d, yyyy h:mm aa"
							className="w-full rounded bg-dark-3 p-2 focus:outline-none"
						/>
					</div>
				</MeetingModal>
			) : (
				<MeetingModal
					isOpen={meetingState === 'isScheduleMeeting'}
					onClose={() => setMeetingState(undefined)}
					title="Meeting Created"
					className="text-center"
					buttonText="Copy Meeting Link"
					ButtonIcon={ClipboardList}
					image="/images/kitty.png"
					handleClick={() => {
						navigator.clipboard.writeText(meetingLink)
						toast({ title: 'Link copied' })
					}}
				/>
			)}
			<MeetingModal
				isOpen={meetingState === 'isInstantMeeting'}
				onClose={() => setMeetingState(undefined)}
				title="Start an instant meeting"
				className="text-center"
				buttonText="Start Meeting"
				handleClick={createMeeting}
			/>
		</section>
	)
}
