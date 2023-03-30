class fileInspect 
{
	constructor (filename)
	{
		this.input = filename
		this.file  = document.getElementsByName(this.input)
		this.error = []
	}

	getSizeFormated (decimals = 2)
	{
		let formatedSize = null

		if (Array.isArray(this.getSize())) {

			let formatedSizeArray = []

			for (let fr of this.getSize()) {
				formatedSizeArray.push(this.sizeFormate(fr, decimals))
			}

			formatedSize = formatedSizeArray

		} else {
			formatedSize = this.sizeFormate(this.getSize(), decimals)
		}

		return formatedSize
	}

	getSizeNumber (decimals = 2)
	{
		let num = null

		if (Array.isArray(this.getSize())) {

			let numArray = []

			for (let u of this.getSize()) {

				let data = this.sizeFormate(u, decimals).split(' ')
				data = data.slice(0,1)[0]
				data = Number(data)

				numArray.push(data)
			}

			num = numArray

		} else {
			num = this.sizeFormate(this.getSize()).split(' ')
			num = num.slice(-1)[0]
			num = Number(num)
		}

		return num
	}

	getSizeUnit ()
	{
		let unit = null

		if (Array.isArray(this.getSize())) {

			let unitArray = []

			for (let u of this.getSize()) {
				unitArray.push(this.sizeFormate(u).split(' ').slice(-1)[0])
			}

			unit = unitArray

		} else {
			unit = this.sizeFormate(this.getSize()).split(' ')
			unit = unit.slice(-1)[0]
		}

		return unit
	}

	getSize ()
	{
		let _file = this.file[0].files
		let filesize  = null

		if (_file.length > 1) 
		{
			let sizeArray = []

			for (let fs of _file) {
				sizeArray.push(fs.size)
			}

			sizeArray.map((val) => {
				if(val === '') {
					sizeArray[sizeArray.indexOf(val)] = null
				}
			})

			filesize = sizeArray
		} 
		else 
		{
			filesize = this.file[0].files[0].size
		}

		return filesize
	}

	getName ()
	{
		let _file = this.file[0].files
		let filename  = null

		if (_file.length > 1) 
		{
			let nameArray = []

			for (let fs of _file) {
				nameArray.push(fs.name)
			}

			nameArray.map((val) => {
				if(val === '') {
					nameArray[nameArray.indexOf(val)] = null
				}
			})

			filename = nameArray
		} 
		else 
		{
			filename = this.file[0].files[0].name
		}

		return filename
	}

	getType ()
	{
		let _file = this.file[0].files
		let filetype  = null

		if (_file.length > 1) 
		{
			let typeArray = []

			for (let fs of _file) {
				typeArray.push(fs.type)
			}

			typeArray.map((val) => {
				if(val === '') {
					typeArray[typeArray.indexOf(val)] = null
				}
			})

			filetype = typeArray
		} 
		else 
		{
			filetype = this.file[0].files[0].type
		}

		return filetype
	}

	getExtension ()
	{
		let ext = null

		if (Array.isArray(this.getName())) {

			let extArray = []

			for (let e of this.getName()) {
				extArray.push(e.split('.').slice(-1)[0])
			}

			ext = extArray

		} else {
			ext = this.getName().split('.')
			ext = ext.slice(-1)[0]
		}

		return ext
	}

	sizeFormate (bytes, decimals = 2) 
	{
	    if (!+bytes) return '0 Bytes'

	    const k = 1024
	    const dm = decimals < 0 ? 0 : decimals
	    const sizes = ['Bytes', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']

	    const i = Math.floor(Math.log(bytes) / Math.log(k))

	    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`
	}

	required (msg = '')
	{
		let message = 'input required: please choose file to upload';

		if (msg !== '') {
			message = msg
		}

		if (this.file[0].files.length == 0) {
			this.error[0] = message
		} else if (this.file[0] == '' || typeof this.file[0] === 'undefined') {
			this.error[0] = message
		}
	}

	extension (ext, msg = '') 
	{
		let message = 'invalid type: the file type should be '+JSON.stringify(ext);

		if (msg !== '') {
			message = msg
		}

		if (!this.isEmptyInput()) 
		{
			if (typeof ext !== 'object' || !Array.isArray(ext)) {
				throw 'extension() method first parameter should be an array.'
			}

			if (!Array.isArray(this.getExtension())) {
				if (!ext.includes(this.getExtension())) {
					this.error[1] = message
				}
			} else {
				for (let ex of this.getExtension()) {
					if (!ext.includes(ex)) {
						this.error[1] = message
					}
				}
			}
		}
	}

	size_max (size, msg = '')
	{
		let message = 'invalid size: the file size should not exceed '+this.sizeFormate(size);

		if (msg !== '') {
			message = msg
		}

		if (!this.isEmptyInput()) 
		{
			if (typeof size !== 'number') {
				throw 'size_max() method first parameter should be a number.'
			}

			if (!Array.isArray(this.getSize())) {
				if (this.getSize() > size) {
					this.error[2] = message
				}
			} else {
				for (let ms of this.getSize()) {
					if (ms > size) {
						this.error[2] = message
					}
				}
			}
		}
	}

	size_min (size, msg = '')
	{
		let message = 'invalid size: the file size should be more than '+this.sizeFormate(size);

		if (msg !== '') {
			message = msg
		}

		if (!this.isEmptyInput()) 
		{
			if (typeof size !== 'number') {
				throw 'size_min() method first parameter should be a number.'
			}

			if (!Array.isArray(this.getSize())) {
				if (this.getSize() < size) {
					this.error[3] = message
				}
			} else {
				for (let ms of this.getSize()) {
					if (ms < size) {
						this.error[3] = message
					}
				}
			}
		}
	}

	isEmptyInput () 
	{
		if (this.file[0].files.length == 0) {
			return true
		} else if (this.file[0] == '' || typeof this.file[0] === 'undefined') {
			return true
		}

		return false
	}

	errors ()
	{
		// Conver array to json
		const err = Object.assign({}, this.error)

		return err
	}
	
	success ()
	{
		if(this.error.length == 0){
			return true
		}
	}
}