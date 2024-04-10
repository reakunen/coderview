import React, { ReactNode } from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import { Metadata } from 'next'
import { cn } from '@/lib/utils'
import './home.module.css'
export const metadata: Metadata = {
	title: 'CoderView',
	description:
		'Conduct your conding interviews with video share platform and an coding environment all in one!',
}

export default function HomeLayout({ children }: { children: ReactNode }) {
	return (
		<div className="relative">
			<Navbar />
			<div className="flex">
				<Sidebar />
				<section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
					<div className="w-full">{children}</div>
				</section>
			</div>
		</div>
	)
}
