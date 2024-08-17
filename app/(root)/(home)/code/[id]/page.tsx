import React from 'react'
import CodePage from '@/components/CodeIDE'
export default function Code({ params: { id } }: { params: { id: string } }) {
	return (
		<div>
			<CodePage />
		</div>
	)
}
