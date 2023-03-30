## jsFileRestrictions
Simple javascript class to perform client-side restrictions on the files.

### Example
HTML
``` html
<!-- import the library -->
<script src="js-file-inspector.js"></script>
```
Js
``` javascript
const file = new fileInspect('myfile') // Create instance and provide the input file name

file.required() // The input file is required
file.size_max(1293321) // restrict max size -- Note: size should be in bytes // (1293321 = 1.23 MiB)
file.size_min(123324) // restrict min size -- Note: size should be in bytes // (123324 = 120.43 KiB)
file.extension(['mp4', 'mp3']) // restrict file extension

// Display errors
console.log(file.errors())

// Check if success
if (file.success()) {
	// true (success)
} else {
	// false (failed)
}
```

### Get file information
JS
``` javascript
// Get file name
file.getName()

// Get file type
file.getType()

// Get file extension
file.getExtension()

// Get file size
file.getSize() // get the file size in bytes [23244]
file.getSizeUnit() // get the file unit [Mib - Kib - Gib]
file.getSizeFormated() // get the file size formated [12 Mib]
```