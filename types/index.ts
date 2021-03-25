/* ---------------------------------
Types
--------------------------------- */

type Role = {
  id: string;
  name: string;
  description: string;
  type: string;
  permissions: string[];
  users: string[];
  created_by: string;
  updated_by: string;
};

type Note = {
  id: string;
  title: string;
  body: string;
  author: string;
  published_at: string;
  created_by: string;
  updated_by: string;
};

type User = {
  id: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  role: Role;
  notes: Note[];
};
