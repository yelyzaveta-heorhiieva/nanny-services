export type Option = {
  value: string;
  label: string;
};

export const generateTimes = (stepMinutes: number, start = 0, end = 24) => {
  const result: Option[] = [];
  for (let h = start; h < end; h++) {
    for (let m = 0; m < 60; m += stepMinutes) {
      const hh = String(h).padStart(2, '0');
      const mm = String(m).padStart(2, '0');
      const t = `${hh}:${mm}`;
      result.push({ value: t, label: t });
    }
  }
  return result;
};
