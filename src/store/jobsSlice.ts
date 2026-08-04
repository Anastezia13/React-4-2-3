import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { Job } from '../types';
import type { RootState } from './index';

interface JobsState {
  items: Job[];
  loading: boolean;
  error: string | null;
  total: number;
  page: number;
  pages: number;
}

const initialState: JobsState = {
  items: [],
  loading: false,
  error: null,
  total: 0,
  page: 1,
  pages: 0,
};

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { search, city, skills, page } = state.filters;

    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (city && city !== 'Все') params.append('city', city);
    if (skills.length > 0) params.append('skills', skills.join(','));
    params.append('page', String(page));
    params.append('limit', '10');

    const response = await fetch(
      `https://kata-jobs.onrender.com/api/jobs?${params.toString()}`
    );

    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }

    const data = await response.json();

    return {
      items: data.jobs || [],
      total: data.pagination?.totalItems || 0,
      page: data.pagination?.currentPage || 1,
      pages: data.pagination?.totalPages || 0,
    };
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.total = action.payload.total || 0;
        state.page = action.payload.page || 1;
        state.pages = action.payload.pages || 0;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.error.message || 'Failed to load jobs') + ' ...Возможно, нужен VPN...';
        state.items = [];
      });
  },
});

export default jobsSlice.reducer;