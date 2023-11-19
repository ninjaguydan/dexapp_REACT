import { useEffect, useState } from 'react'

import debounce from '../utils/debounce'

const useDeviceWidth = () => {
	const [breakpoint, setBreakpoint] = useState<string>('MOBILE')

	const updateBreakpoint = debounce(() => {
		let deviceWidth = window.innerWidth
		if (deviceWidth < 550) {
			setBreakpoint('MOBILE')
		} else if (deviceWidth > 1080) {
			setBreakpoint('DESKTOP')
		} else {
			setBreakpoint('TABLET')
		}
	}, 10)

	useEffect(() => {
		updateBreakpoint()
		window.addEventListener('resize', updateBreakpoint)
		return () => window.removeEventListener('resize', updateBreakpoint)
	}, [breakpoint])

	return [breakpoint]
}
export default useDeviceWidth
