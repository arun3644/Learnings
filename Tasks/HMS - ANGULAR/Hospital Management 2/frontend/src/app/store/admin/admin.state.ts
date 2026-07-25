import { Admin } from '../../core/models/admin.model';

export interface AdminState {
  admins: Admin[];
  selectedAdmin: Admin | null;
  loading: boolean;
  error: string | null;
}

export const initialAdminState: AdminState = {
  admins: [],
  selectedAdmin: null,
  loading: false,
  error: null
};
