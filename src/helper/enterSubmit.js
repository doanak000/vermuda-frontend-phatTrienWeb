export const handleKeyPress = (e, callback) => {
  if (e.keyCode === 13) {
    callback()
  }
}
