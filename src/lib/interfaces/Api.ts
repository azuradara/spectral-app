export interface Model {
  id: number;
  created_at: Date;
  updated_at: Date;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
}
