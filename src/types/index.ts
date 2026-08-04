export interface Job {
  id: number;
  name: string;
  company_name: string;
  salary?: string;
  experience?: string;
  city?: string;
  format?: 'remote' | 'office' | 'hybrid';
  skills?: string[];
}

export interface JobsResponse {
  jobs: Job[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  success: boolean;
}