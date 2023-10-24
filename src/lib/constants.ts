export const MINUTES_IN_HOUR = 60; // 60 minutes
export const HOURS_IN_DAY = 24; // 24 hours
export const MINUTES_IN_DAY = MINUTES_IN_HOUR * HOURS_IN_DAY; // 1440 minutes
export const QUARTER_HOUR = MINUTES_IN_HOUR / 4; // 15 minutes
export const QUARTER_HOURS_IN_DAY = MINUTES_IN_DAY / QUARTER_HOUR; // 96 quarter hours
export const WORKDAY_START_HOUR = 9; // 9:00
export const WORKDAY_END_HOUR = 17; // 17:00
export const WORK_START = WORKDAY_START_HOUR * MINUTES_IN_HOUR; // 540 minutes
export const WORK_END = WORKDAY_END_HOUR * MINUTES_IN_HOUR; // 1020 minutes
