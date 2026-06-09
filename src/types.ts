export interface KeyTerm {
  term: string;
  definition: string;
}

export interface Section {
  title: string;
  content: string[];
  keyTerms?: KeyTerm[];
  diagramType?: "topologies" | "bus" | "complement" | "boolean";
}

export interface Chapter {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  sections: Section[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}
