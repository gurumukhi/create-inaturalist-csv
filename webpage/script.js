function convert () {
  const fileInput = document.getElementById('fileInput')
  const latitudeInput = document.getElementById('latitude')
  const longitudeInput = document.getElementById('longitude')
  const dateStringInput = document.getElementById('date')

  const file = fileInput.files[0]
  const latitude = latitudeInput.value.trim()
  const longitude = longitudeInput.value.trim()
  const dateString = dateStringInput.value.trim()

  if (!file) {
    alert('Please select a file.')
    return
  }

  if (!latitude || !longitude) {
    alert('Please enter latitude and longitude.')
    return
  }

  const reader = new FileReader()
  reader.onload = function (e) {
    const contents = e.target.result
    const convertedData = convertToINaturalist(
      contents,
      latitude,
      longitude,
      dateString
    )
    download(convertedData)
  }
  reader.readAsText(file)
}

function convertToINaturalist (contents, latitude, longitude, dateString) {
  const lines = contents.split('\n')
  let convertedData =
    'Taxon name,Date observed,Description,Place name,Latitude / y coord / northing,Longitude / x coord / easting,Tags,Geoprivacy\n'

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (line == '') {
      break
    }
    const columns = line.split(',')

    const species = columns[0].trim()
    const taxa = getTaxa(species)
    // if (columns[1] == null) {
    //   console.log(columns)
    // }
    const count = columns[1].trim()
    const date = `${columns[4].trim()}, ${columns[5].trim()}` // Observation date
    const time = columns[6].trim() // Start Time
    // const observationDate = formatDate(date, time) // Convert date and time format
    observationDate = `${dateString} ${time}`

    const iNaturalistFormat = `${taxa},${observationDate},${species},,${latitude},${longitude},,\n`

    convertedData += iNaturalistFormat
  }
  console.log(convertedData)
  return convertedData
}

function getTaxa (species) {
  const lastIndexOpenParentheses = species.lastIndexOf('(')
  const firstIndexCloseParentheses = species.indexOf(')')

  if (
    lastIndexOpenParentheses !== -1 &&
    firstIndexCloseParentheses !== -1 &&
    lastIndexOpenParentheses < firstIndexCloseParentheses
  ) {
    return species.substring(
      lastIndexOpenParentheses + 1,
      firstIndexCloseParentheses
    )
  } else {
    return '' // Return empty string if no valid parentheses found
  }
}

function formatDate (date, time) {
  // Split the date string by space to separate the date parts
  const dateParts = date.split(' ')

  // Extract the date part (e.g., "Apr 26, 2024")
  const dateString = dateParts[dateParts.length - 1]

  // Parse the date string using JavaScript Date object
  const parsedDate = new Date(dateString)

  // Extract day, month, and year from the parsed date
  const day = parsedDate.getDate().toString().padStart(2, '0') // Ensure two digits for day
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0') // Ensure two digits for month
  const year = parsedDate.getFullYear()

  return `${year}-${month}-${day} ${time}`
}

function download (data) {
  const downloadLink = document.getElementById('downloadLink')
  const blob = new Blob([data], { type: 'text/csv' })
  downloadLink.href = window.URL.createObjectURL(blob)
  downloadLink.style.display = 'block'
}
