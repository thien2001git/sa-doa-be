interface User {
  bio?: string;
  _id: string;
  address: string;
  email?: string;
  role_level: number;
  deleted_by?: string;
  avatar?: string;
  display_name: string;
  created_by?: string;
  deleted_at?: Date;
  password: string;
  is_deleted: number;
  updated_at?: Date;
  phone: string;
  status?: string;
  username: string;
  updated_by: string;
}

export type { User };