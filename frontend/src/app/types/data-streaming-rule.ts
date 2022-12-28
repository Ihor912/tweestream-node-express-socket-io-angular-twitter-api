export interface Rule {
  value: string;
}

export interface SetRulesRequest {
  rules: Rule[];
}

export interface RulesStatusResponse {
  status: string;
}
