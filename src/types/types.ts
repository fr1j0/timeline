export type TimelineItem = {
  id: number;
  start: string;
  end: string;
  name: string;
};

export type BarData = TimelineItem & {
  fromTimestamp: number;
  toTimestamp: number;
};
