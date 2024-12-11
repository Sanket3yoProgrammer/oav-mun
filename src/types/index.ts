export interface Delegate {
  country: string;
  statement: string;
}

export interface Section {
  id: string;
  title: string;
  content: string;
  speaker?: string;
}

export interface Proposal {
  country: string;
  content: string;
  votes?: number;
}