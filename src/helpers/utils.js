export const chunk = (array, chunkSize) => {
  if (array.length > 0) {
    const chunkedArray = []
    for (let i = 0; i < array.length; i += chunkSize)
      chunkedArray.push(array.slice(i, i + chunkSize))
    return chunkedArray
  } else {
    return []
  }
}