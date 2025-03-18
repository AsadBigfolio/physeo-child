export interface Plan {
  _id: string;
  title: string;
  course?: string;
  price?: string;
  cardTitle: string;
  discount: string;
  isSubscription: boolean;
  isFree: boolean;
  plan: string;
  createdAt: string;
  updatedAt: string;
  planFeatures: string[];
  linkText: string;
}

export interface Course {
  _id: string;
  label: string;
  value: string;
}
