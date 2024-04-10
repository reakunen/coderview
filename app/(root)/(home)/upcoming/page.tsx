import CallList from '@/components/CallList'
import React from 'react'

export default function Upcoming() {
	return (
		<div className="flex size-full flex-col gap-10 text-white">
			<h1 className="text-3xl font-bold">
				<CallList type="upcoming"/>{' '}
			</h1>
		</div>
	)
}
