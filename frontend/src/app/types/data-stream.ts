export interface Tweet {
  id: string;
  text: string;
  authorName: string | null;
  location: string | null;
}

export interface TweetResponse {
  data: {
    author_id: string;
    edit_history_tweet_ids: string[];
    geo: any;
    id: string;
    public_metrics: {
      like_count: number;
      quote_count: number;
      reply_count: number;
      retweet_count: number;
    };
    text: string;
  };
  includes: {
    users: {
      id: string;
      name: string;
      username: string;
      location: string;
    }[];
  };
  matching_rules: {
    id: string;
    tag: string;
  }[];
}

export interface StreamStatusResponse {
  status: string;
}

export enum StreamConnectionStatusEnum {
  ON = 'ON',
  OFF = 'OFF',
  PROCESSING = 'PROCESSING',
}

export enum StreamConnectionIssueEnum {
  TOO_MANY_CONNECTIONS = 'TooManyConnections',
  NO_CONNECTION_WITH_SERVER = 'NoConnectionWithServer',
}

export interface StreamConnectionError {
  title: string;
  detail: string;
  connection_issue: StreamConnectionIssueEnum;
  type: string;
}
