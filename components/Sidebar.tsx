'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { SideBarLinks } from '@/constants'

export default function Sidebar() {
	const pathName = usePathname()
	return (
		<section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-dark-1 p-6 pt-28 text-white max-md:hidden lg:w-[264px]">
			<div className="flex flex-1 flex-col gap-6">
				{SideBarLinks.map((link) => {
					const isActive =
						pathName === link.route || pathName.startsWith(`${link.route}/`)
					return (
						<Link
							href={link.route}
							key={link.label}
							className={cn('flex gap-4 items-center p-4 rounded-xl', {
								'bg-blue-1': isActive,
							})}
						>
							<span>
								<link.icon />
							</span>
							{link.label}
						</Link>
					)
				})}
			</div>
		</section>
	)
}
