import React, { ReactNode } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { LucideIcon } from 'lucide-react'

interface MeetingModalProps {
	isOpen: boolean
	onClose: () => void
	title: string
	className?: string
	children?: ReactNode
	handleClick?: () => void
	buttonText?: string
	image?: string
	ButtonIcon?: LucideIcon
}

export default function MeetingModal({
	isOpen,
	onClose,
	title,
	className,
	children,
	handleClick,
	buttonText,
	image,
	ButtonIcon,
}: MeetingModalProps) {
	return (
		<div>
			<Dialog open={isOpen} onOpenChange={onClose}>
				<DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-gradient-to-r from-dark-2 to-dark-3 px-6 py-9 text-white">
					<div className="flex flex-col gap-6">
						{image && (
							<div className="flex justify-center">
								<Image
									src={image}
									alt="image"
									width={72}
									height={72}
									className="rounded-full"
								/>
							</div>
						)}
					</div>
					<h1 className={cn('text-3xl font-bold leading-[42px]', className)}>
						{title}
					</h1>
					{children}
					<Button className="bg-blue-1 flex gap-2" onClick={handleClick}>
						{ButtonIcon && <ButtonIcon size={20} />}{' '}
						{buttonText || 'Start A Meeting'}
					</Button>
				</DialogContent>
			</Dialog>
		</div>
	)
}
