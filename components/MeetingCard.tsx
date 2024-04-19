import React from 'react'
import { LucideIcon } from 'lucide-react'
import { Button } from './ui/button'
import { Calendar, CopyIcon } from 'lucide-react'
import { avatarImages } from '@/constants'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useToast } from './ui/use-toast'

interface MeetingCardProps {
	title: string
	date: string
	Icon: React.ElementType
	isPreviousMeeting?: boolean
	ButtonIcon?: React.ElementType
	buttonText?: string
	handleClick: () => void
	link: string
}

export default function MeetingCard({
	Icon,
	title,
	date,
	isPreviousMeeting,
	ButtonIcon,
	handleClick,
	link,
	buttonText,
}: MeetingCardProps) {
	const { toast } = useToast()

	return (
		<section className="text-xl rounded-lg bg-dark-3 w-full">
			<div className="flex flex-col m-6 py-2 gap-2">
				<div className="pb-2">
					<Calendar size={32} />
				</div>
				<h1 className="text-2xl ">{title || 'Coding Interview, '}</h1>
				<p className="text-sky-1 font-light text-sm">{date}</p>
				<div className="flex justify-between">
					<div className="relative flex w-full max-sm:hidden">
						{avatarImages.map((img, index) => (
							<Image
								key={index}
								src={img}
								alt="attendees"
								width={40}
								height={40}
								className={cn('rounded-full shadow-2xl', {
									absolute: index > 0,
								})}
								style={{ top: 0, left: index * 28 }}
							/>
						))}
						{/* <div className="flex-center font-light text-base absolute left-[136px] size-10 rounded-full border-[5px] border-dark-1 bg-dark-1 shadow-lg">
							+4 
						</div> */}
					</div>
					{!isPreviousMeeting && (
						<div className="flex gap-2">
							<Button onClick={handleClick} className="rounded bg-blue-1 px-6">
								{ButtonIcon && <ButtonIcon size={16} />}
								&nbsp; {buttonText}
							</Button>
							<Button
								onClick={() => {
									navigator.clipboard.writeText(link)
									toast({
										title: 'Link Copied',
									})
								}}
								className="bg-dark-4 px-6"
							>
								{Icon && <Icon size={16} />}
								&nbsp; Copy Link
							</Button>
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
