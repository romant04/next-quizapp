export enum Genre {
    Gaming = "Gaming",
    Coding = "Coding",
    Math = "Math",
    Other = "Other",
}

export interface IQuiz {
    _id: string;
    title: string;
    questions: {
      q: string;
      a1: string;
      a2: string | null;
      a3: string | null;
      a4: string | null;
      correctAnswers: number[];
    }[];
    genre: string | null;
    owner: string;
  }