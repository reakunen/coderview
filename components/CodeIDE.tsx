'use client'

import React, { useState } from 'react'
import CodeEditor from '@uiw/react-textarea-code-editor'
import { Button } from './ui/button'
import { Clipboard } from 'lucide-react'
import { useToast } from './ui/use-toast'

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'

export default function CodePage() {
	const [code, setCode] = useState(`function add(a, b) {\n  return a + b;\n}`)
	const [language, setLanguage] = useState('javascript') // Set initial language to JavaScript
	const [fontSize, setFontSize] = useState(14) // Set initial font size

	const handleLanguageChange = (value: string) => {
		setLanguage(value)
	}

	const handleFontSizeChange = (value: string) => {
		setFontSize(parseInt(value, 10))
	}
	const { toast } = useToast()

	const handleClick = () => {
		const sessionLink = window.location.href
		navigator.clipboard.writeText(sessionLink).then(() => {
			// alert('Session link copied to clipboard!')
			toast({ title: 'Link copied successfully!' })
		})
	}

	return (
		<div className="p-4 min-h-screen text-white">
			<h1 className="text-2xl font-bold mb-6">Live Coding IDE</h1>
			<div className="flex justify-between">
				<div className="flex gap-6">
					<div className="mb-4 flex items-center">
						<label className="mr-2 text-md font-semibold text-gray-300">
							Select Language:{' '}
						</label>
						<Select onValueChange={handleLanguageChange}>
							<SelectTrigger className="w-[180px] bg-gray-800 text-gray-300">
								<SelectValue placeholder="Select a language" />
							</SelectTrigger>
							<SelectContent className="bg-gray-800 text-gray-300">
								<SelectGroup>
									<SelectLabel className="text-gray-400">Languages</SelectLabel>
									<SelectItem value="javascript">JavaScript</SelectItem>
									<SelectItem value="python">Python</SelectItem>
									<SelectItem value="java">Java</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>

					<div className="mb-4 flex items-center">
						<label className="mr-2 text-md font-semibold text-gray-300">
							Select Font Size:{' '}
						</label>
						<Select onValueChange={handleFontSizeChange}>
							<SelectTrigger className="w-[180px] bg-gray-800 text-gray-300">
								<SelectValue placeholder={`${fontSize}px`} />
							</SelectTrigger>
							<SelectContent className="bg-gray-800 text-gray-300">
								<SelectGroup>
									<SelectLabel className="text-gray-400">Font Size</SelectLabel>
									<SelectItem value="12">12px</SelectItem>
									<SelectItem value="14">14px</SelectItem>
									<SelectItem value="16">16px</SelectItem>
									<SelectItem value="18">18px</SelectItem>
									<SelectItem value="20">20px</SelectItem>
									<SelectItem value="24">24px</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					</div>
				</div>
				<Button className="bg-blue-500 flex gap-2" onClick={handleClick}>
					Copy Session Link <Clipboard />
				</Button>
			</div>

			{/* Code Editor */}
			<CodeEditor
				value={code}
				language={language}
				placeholder={`Please enter ${language} code.`}
				onChange={(evn) => setCode(evn.target.value)}
				padding={16}
				className="min-h-[520px]"
				style={{
					fontSize: fontSize,
					backgroundColor: '#1e1e1e', // Corrected background color
					color: '#d4d4d4', // Code text color
					fontFamily:
						'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace',
				}}
			/>
		</div>
	)
}
