export interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  phone: string;
  gender: string;
  email: string | null;
  note: string | null;
  telegram: string | null;
  avatar: string | null;
  company: string | null;
  address: string | null;
  createdAt: number;
  updatedAt: number;
}
