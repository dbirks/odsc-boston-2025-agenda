declare interface SessionItem {
  _id: string;
  _updatedAt: string;
  access: string; // "Premium", "General", "Platinum", etc.
  active: string;
  date: string;
  description: string;
  detailLink: string;
  difficulty: string;
  displayStartTime: string;
  duration: string;
  endTime: string;
  event: string;
  language: string;
  pictureUrl: string;
  preJoinTime: string;
  prerequisite: string;
  replayLink: string;
  slackUrl: string;
  speakerCompany: string;
  speakerName: string;
  speakerTitle: string;
  subtrack: string;
  talkTitle: string;
  target: string;
  timeZone: string;
  timerStartTime: string;
  topicTag1: string;
  topicTag2: string;
  topicTag3: string;
  topicTag4: string;
  track: string;
  uniqueId: string;
  webinarLink?: string;
  unlockable?: boolean;
}

declare type TicketType = "All" | "General" | "Premium" | "Platinum" | "Gold";