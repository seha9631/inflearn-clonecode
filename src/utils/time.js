export function getTotalLectureDuration(lectures) {
  return lectures.reduce((sum, lecture) => sum + (lecture.videoDuration || 0), 0);
}

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

export function formatSecondsToKorean(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts = [];

  if (hrs > 0) parts.push(`${hrs}시간`);
  if (mins > 0) parts.push(`${mins}분`);
  if (secs > 0 || parts.length === 0) parts.push(`${secs}초`);

  return parts.join(' ');
}