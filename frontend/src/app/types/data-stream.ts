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
