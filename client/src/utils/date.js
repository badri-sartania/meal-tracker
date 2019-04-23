const representationOfTime = timeString =>
  Date.parse(`01/01/2019 ${timeString}`);

export const isGEDate = (dateString1, dateString2) =>
  Date.parse(dateString1) >= Date.parse(dateString2);

export const isLEDate = (dateString1, dateString2) =>
  Date.parse(dateString1) <= Date.parse(dateString2);

export const isGETime = (timeString1, timeString2) =>
  representationOfTime(timeString1) >= representationOfTime(timeString2);

export const isLETime = (timeString1, timeString2) =>
  representationOfTime(timeString1) <= representationOfTime(timeString2);
