import React from 'react'
import CallList from '@/components/CallList'
export default function Previous() {
	return (
		<div className="flex size-full flex-col gap-10 text-white">
			<h1 className="text-3xl font-bold">Previous Meetings</h1>
			<CallList type="ended" />{' '}
		</div>
	)
}
