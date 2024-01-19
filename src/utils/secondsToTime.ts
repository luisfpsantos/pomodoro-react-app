export default (seconds: number): string => {
  const hour = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const sec = (seconds % 60).toString().padStart(2, '0');

  return `${hour}:${minutes}:${sec}`
}