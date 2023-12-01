import { createPortal } from 'react-dom'

import useDeviceWidth from 'hooks/useDeviceWidth'

interface Props {
	data: { action: () => void; isOpen: boolean; isVisible: boolean }
}

const MenuBtn = ({ data: { action, isOpen, isVisible } }: Props) => {
	const breakpoint = useDeviceWidth()
	if (!isVisible || breakpoint !== 'MOBILE') return <></>
	return createPortal(
		<>
			<button id="menu-btn" className={`menu-btn ${isOpen ? 'open' : ''}`} onClick={action}>
				<div className="menu-btn_burger"></div>
			</button>
		</>,
		document.body,
	)
}

export default MenuBtn
