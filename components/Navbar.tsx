import React from 'react'
import Link from 'next/link'
import { Videotape } from 'lucide-react'
import MobileNav from './MobileNav'
import { SignedIn, UserButton } from '@clerk/nextjs'
import Image from 'next/image'

export default function Navbar() {
	return (
		<nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
			<Link href="/" className="flex gap-2">
				<Image
					src="/images/coderviewlogo.png"
					height={30}
					width={148}
					alt="Coderview Logo"
					className="max-md:hidden"
				/>
				{/* <Videotape />
				<p className="text-xl text-white font-extrabold max-md:hidden">
					CoderView
				</p> */}
			</Link>
			<div className="flex-between gap-5">
				<SignedIn>
					<UserButton />
				</SignedIn>
				<MobileNav />
			</div>
		</nav>
	)
}
