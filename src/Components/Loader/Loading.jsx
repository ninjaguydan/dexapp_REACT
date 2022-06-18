import Spinner from "react-spinkit"

import React from "react"

const Loading = () => {
	return (
		<div className="loading">
			<Spinner name="circle" style={{ width: 50, height: 50 }} />
		</div>
	)
}

export default Loading
