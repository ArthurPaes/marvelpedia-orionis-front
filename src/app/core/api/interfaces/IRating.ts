export interface IResponseEligibility {
  date: string;
  status: boolean;
  data: {
    eligible: boolean;
  };
}

export interface IRequestRating {
  comment: string;
  grade: number;
}

export interface IResponseRating {
  date: string;
  status: true;
  data: {
    comment: string;
    grade: number;
    answered: boolean;
    id: number;
    createdAt: string;
    userId: number;
  };
}
