import {
	Home,
	HomeIcon,
	CalendarClockIcon,
	CalendarCheck2Icon,
	VideoIcon,
	SquareUser,
	Code2Icon,
} from 'lucide-react'

const SideBarLinks = [
	{ label: 'Home', route: '/', icon: HomeIcon },
	{ label: 'Upcoming', route: '/upcoming', icon: CalendarClockIcon },
	{ label: 'Previous', route: '/previous', icon: CalendarCheck2Icon },
	{ label: 'Recordings', route: '/recordings', icon: VideoIcon },
	{ label: 'Personal Room', route: '/personal-room', icon: SquareUser },
	{ label: 'Code', route: '/code', icon: Code2Icon },
]

export default SideBarLinks
