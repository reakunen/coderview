'use server'

import { currentUser } from '@clerk/nextjs'
import { StreamClient } from '@stream-io/node-sdk'

// code will only be run on the server

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY
const apiSecret = process.env.STREAM_SECRET_KEY

export const tokenProvider = async () => {
	const user = await currentUser()

	if (!user) throw new Error('User is not authenticated.')
	if (!apiKey) throw new Error('No API Key provided.')
	if (!apiSecret) throw new Error('No API Secret provided.')

	const client = new StreamClient(apiKey, apiSecret, { timeout: 3000 })

	// expiration date, token valid for one hour.
	const exp = Math.round(new Date().getTime() / 1000) + 60 * 60

	const issued = Math.floor(Date.now() / 1000) - 60

	const token = client.createToken(user.id, exp, issued)

	return token
}
