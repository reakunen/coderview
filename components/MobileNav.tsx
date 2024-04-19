'use client'
import React from 'react'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/components/ui/sheet'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, Videotape } from 'lucide-react'
import { SideBarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
	const pathName = usePathname()
	return (
		<section className="w-full max-w-[265]">
			<Sheet>
				<SheetTrigger asChild>
					<Menu className="cursor-pointer md:hidden" />
				</SheetTrigger>
				<SheetContent side="right" className="border-none bg-dark-1">
					<Link href="/" className="flex gap-2">
						<Image
							src="/images/coderviewlogo.png"
							height={30}
							width={148}
							alt="Coderview Logo"
							className="mb-[-26px]"
						/>
					</Link>
					<div className="flex h-[calc(100vh -72px)] flex-col justify-between overflow-y-auto">
						<SheetClose asChild>
							<section className="flex h-full flex-col gap-6 pt-16 text-white">
								{SideBarLinks.map((link) => {
									const isActive =
										pathName === link.route ||
										pathName.startsWith(`${link.route}/`)
									return (
										<SheetClose asChild key={link.label}>
											<Link
												href={link.route}
												key={link.label}
												className={cn(
													'flex gap-4 items-center p-4 rounded-xl max-w-60 w-full',
													{
														'bg-blue-1': isActive,
													}
												)}
											>
												<span>
													<link.icon />
												</span>
												<span className="font-semibold"> {link.label}</span>
											</Link>
										</SheetClose>
									)
								})}
							</section>
						</SheetClose>
					</div>
				</SheetContent>
			</Sheet>
		</section>
	)
}
