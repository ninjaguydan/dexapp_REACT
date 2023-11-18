import dfault from '../media/0.png'
import f1 from '../media/1f.png'
import m1 from '../media/1m.png'
import f2 from '../media/2f.png'
import m2 from '../media/2m.png'
import f3 from '../media/3f.png'
import m3 from '../media/3m.png'
import f4 from '../media/4f.png'
import m4 from '../media/4m.png'

const images = {
	dfault,
	f1,
	f2,
	f3,
	f4,
	m1,
	m2,
	m3,
	m4,
}

function getImageByKey(keyname) {
	return images[keyname]
}
export default getImageByKey
