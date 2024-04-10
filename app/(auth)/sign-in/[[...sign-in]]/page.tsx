import React from 'react'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'

export default function SignInPage() {
	// const About = [
	// 	{ header: 'Get Started Quickly', desc: 'Quick and easy scheduling ' },
	// 	{ header: },
	// ]
	return (
		<main className="flex justify-around h-screen w-full items-center max-md:flex-col">
			<div className="flex justify-col gap-2 bg-gradient-to-r from-indigo-500 bg-blue-1 w-full h-full max-md:hidden items-center pb-32">
				<div className="m-12">
					<Image
						src="/images/coderviewlogo.png"
						height={200}
						width={200}
						alt="Coderview Logo"
						className="max-md:hidden"
					/>{' '}
					<div className="flex flex-col gap-12">
						<h1 className="text-5xl font-bold">
							Interview Process all in One.{' '}
						</h1>
						<p className="text-sky-1">
							Interview with ease knowing that you have all the tools you need
							here, not spread out for your candidates, or for you.
						</p>
						{/* <div className="flex gap-5">
							<p className="text-sky-1">
								Secure, Organized, Fast, and of course - Free.
							</p>
							<Image
								src={'/images/coder.svg'}
								height={300}
								width={300}
								alt="Video Call"
							/>
						</div> */}
					</div>
				</div>
			</div>
			<div className="flex w-[1024px] justify-center">
				<SignIn />
			</div>
		</main>
	)
}
