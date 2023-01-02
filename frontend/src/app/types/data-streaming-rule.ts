export interface Rule {
  value: string;
  id?: string;
}

export interface SetRulesRequest {
  rules: Rule[];
}

export interface RulesStatusResponse {
  status: string;
}

export interface RulesResponse {
  rules: {
    data: Rule[];
  };
}

export interface RulesState {
  rules: Rule[];
}
