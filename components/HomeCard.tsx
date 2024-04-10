'use client'
import React from 'react'
import { cn } from '@/lib/utils'
import { LucideIcon, icons } from 'lucide-react'

interface HomeCardProps {
	IconSus: LucideIcon
	title: string
	className: string[]
	description: string
	handleClick: () => void
}
export default function HomeCard({
	IconSus,
	title,
	className,
	description,
	handleClick,
}: HomeCardProps) {
	const bgColor = className[0]
	const bgColor2 = className[1]
	return (
		<div
			className={cn(
				'home-card  px-4 py-6 flex flex-col justify-between w-full xl:max-w-full min-h-[260px] rounded-xl cursor-pointer',
				bgColor
			)}
			onClick={handleClick}
		>
			<div
				className={cn(
					' rounded-xl w-[48px] h-[48px] flex justify-center items-center',
					bgColor2
				)}
			>
				<IconSus />
			</div>
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold">{title}</h1>
				<p className="text-base font-normal">{description}</p>
			</div>
		</div>
	)
}
