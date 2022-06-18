function generateTimeline(posts = [], reviews = [], teams = []) {
	let timeline = [...posts, ...reviews, ...teams]
	return timeline.sort((a, b) => a.created - b.created).reverse()
}
export default generateTimeline
