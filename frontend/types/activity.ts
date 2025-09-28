export enum ActivityVariant {
  LIST = "list",
  TIMELINE = "timeline",
}

export interface ActivityItem {
  id: string;
  user?: string;
  avatar: any;
  title?: string;
  timestamp: string;
  description: string;
  highlight?: string;
}
