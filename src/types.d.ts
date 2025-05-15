declare interface APIResponse {
  success: boolean;
  data: {
    version: number;
    sessions: SessionItem[];
    tags: TagItem[];
    sessionLevels: LevelItem[];
    ticketTypes: TicketTypeItem[];
    sessionTypes: SessionTypeItem[];
    dates: DateItem[];
    dateIndex: number;
    liveUpdateDelay: number;
  };
}

declare interface SessionItem {
  // Old fields - maintain compatibility with existing UI
  _id?: string;
  _updatedAt?: string;
  access?: string;
  active?: string; 
  talkTitle?: string;
  subtrack?: string;
  speakerName?: string;
  speakerTitle?: string;
  speakerCompany?: string;

  // New fields from the API
  uniqueId: string;
  key: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  milliseconds: number;
  startTime: string;
  timeZone: string;
  duration: number;
  utcStartTimeMilliseconds: number;
  utcEndTimeMilliseconds: number;
  displayStartTime: string;
  displayEndTime: string;
  location: string;
  sessionLevel: string;
  sessionType: string;
  ticketTypes: string[];
  company: string;
  speakers: SpeakerItem[];
  isHighlighted: boolean;
  isNetworking: boolean;
  isFavorite: boolean;
  
  // Keep backward compatibility for these links
  detailLink?: string;
  webinarLink?: string;
  replayLink?: string;
  slackUrl?: string;
  prerequisite?: string;
  unlockable?: boolean;
  
  // Fields for backward compatibility computation
  timerStartTime?: string; // for sorting
  topicTag1?: string;
  topicTag2?: string;
  topicTag3?: string;
  topicTag4?: string;
  difficulty?: string;
}

declare interface SpeakerItem {
  key: string;
  name: string;
  linkedin: string;
  jobTitle: string;
  company: string;
  avatar: {
    backgroundColor: string;
    source: string;
  };
}

declare interface TagItem {
  key: string;
  value: string;
  isSelected: boolean;
}

declare interface LevelItem {
  key: string;
  value: string;
  isSelected: boolean;
}

declare interface TicketTypeItem {
  key: string;
  value: string;
  isSelected: boolean;
}

declare interface SessionTypeItem {
  key: string;
  value: string;
  isSelected: boolean;
}

declare interface DateItem {
  key: string;
  milliseconds: number;
  month: string;
  date: number;
  day: string;
}

declare type TicketType = "All" | "Platinum" | "Gold" | "Silver" | "VIP" | "Bootcamp" | "Expo" | "2-Day Business" | "3-Day Business" | "Invited Attendees Only" | "Speakers";