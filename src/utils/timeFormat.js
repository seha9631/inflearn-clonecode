export function formatSeconds(seconds, forceHour = false) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const HH = String(hrs).padStart(2, '0');
  const MM = String(mins).padStart(2, '0');
  const SS = String(secs).padStart(2, '0');

  if (hrs > 0 || forceHour) {
    return `${HH}:${MM}:${SS}`;
  }

  return `${MM}:${SS}`;
}