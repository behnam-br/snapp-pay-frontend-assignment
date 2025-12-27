export interface Passenger {
  id: number;
  first_name: string;
  last_name: string;
  email: string | null;
  gender: string;
  phone: string;
  note: string;
  telegram: string | null;
  avatar: string;
  company: string;
  address: string | null;
  createdAt: number;
  updatedAt: number;
}

export interface PaginationMeta {
  skipped: number;
  limit: number;
  total: number;
  criteria: Record<string, unknown>;
}

export interface PaginatedResponse<T> {
  meta: PaginationMeta;
  items: T[];
}

export type PassengerListResponse = PaginatedResponse<Passenger>;

export interface GetPassengersParams {
  limit?: number;
  skip?: number;
  sort?: string;
  where?: PassengerWhereFilter;
}

export interface PassengerWhereFilter {
  first_name?: StringFilter;
  last_name?: StringFilter;
  email?: StringFilter;
  gender?: StringFilter;
  phone?: StringFilter;
  company?: StringFilter;
  address?: StringFilter;
}

export interface StringFilter {
  contains?: string;
  equals?: string;
  startsWith?: string;
  endsWith?: string;
}
