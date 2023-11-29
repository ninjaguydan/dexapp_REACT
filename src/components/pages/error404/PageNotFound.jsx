import { Link } from 'react-router-dom'

import Button from 'components/modules/Button'

import { ROOT_URL as ROOT } from 'api/urls'

import error_img from '../../../media/404.png'

const PageNotFound = () => {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="error404 flex w-4/5 flex-col items-center gap-3 text-center">
				<div className="flex w-4/5 max-w-md justify-center">
					<img src={error_img} />
					<span className="text-9xl">404</span>
				</div>
				<div>
					<h1>Oops! Page not found</h1>
					<p className="text-[#6c757d]">You shouldn't be here.</p>
				</div>
				<Link to={ROOT}>
					<Button.Primary>Go home now</Button.Primary>
				</Link>
			</div>
		</div>
	)
}

export default PageNotFound
