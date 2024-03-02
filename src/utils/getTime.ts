export const getTime = () => {
  const hours = new Date().getHours()
  if (hours > 12) {
    return '下午好'
  }
  return '上午好'
}
