import { ImageStateType } from './interface';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../../config';
import { Image } from './interface';

const initialState: ImageStateType = {
  list: [],
  error: null,
  loading: {
    create: false,
    fetch: false,
  },
  page_info: {
    items_per_page: 0,
    total_results: 0,
  },
  searchTerm: '',
};

type FetchType = {
  skip?: number;
  limit?: number;
  searchTerm: string;
};

// type CreateType = {
//   url: string;
//   label: string;
//   cb: () => void;
// };

type CreateType = {
  data: FormData;
  cb: () => void;
};

export const getImages = createAsyncThunk(
  'images/fetch',
  async ({ skip, limit, searchTerm }: FetchType, { getState }) => {
    const res = await axios.get(
      `${backendUrl}/images?skip=${skip}&limit=${limit}&searchTerm=${searchTerm}`
    );
    return {
      data: res.data,
      searchTerm,
    };
  }
);

export const postImages = createAsyncThunk('images/create', async ({ data, cb }: CreateType) => {
  const res = await axios.post(`${backendUrl}/images`, data);
  cb();
  return res.data;
});

export const deleteImages = createAsyncThunk(
  'images/delete',
  async ({ _id, cb }: { _id: string; cb: () => void }) => {
    await axios.delete(`${backendUrl}/images/${_id}`);
    cb();
    return { _id };
  }
);

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers: {
    [getImages.pending.type]: (state) => {
      state.loading.fetch = true;
    },
    [getImages.fulfilled.type]: (
      state,
      {
        payload,
      }: PayloadAction<{
        data: {
          list: Image[];
          pageInfo: {
            items_per_page: number;
            total_results: number;
          };
        };
        searchTerm: string;
      }>
    ) => {
      state.list =
        payload.searchTerm === state.searchTerm
          ? [...state.list, ...payload.data.list]
          : payload.data.list;
      state.page_info = payload.data.pageInfo;
      state.searchTerm = payload.searchTerm;
      state.loading.fetch = false;
      state.error = null;
    },
    [getImages.rejected.type]: (state) => {
      state.loading.fetch = false;
      state.error = 'Fail to fetch!';
    },
    [postImages.pending.type]: (state) => {
      state.loading.create = true;
    },
    [postImages.fulfilled.type]: (state, { payload }: PayloadAction<Image>) => {
      if (payload.label.indexOf(state.searchTerm) !== -1) {
        state.list.unshift(payload);
        state.page_info.total_results = state.page_info.total_results + 1;
      }
      state.loading.create = false;
      state.error = null;
    },
    [postImages.rejected.type]: (state) => {
      state.loading.create = false;
      state.error = 'Can not post image!';
    },
    [deleteImages.pending.type]: (state) => {
      state.loading.create = true;
    },
    [deleteImages.fulfilled.type]: (state, { payload }: PayloadAction<{ _id: string }>) => {
      state.list = state.list.filter((i) => i._id !== payload._id);
      state.page_info.total_results = state.page_info.total_results - 1;
      state.loading.create = false;
      state.error = null;
    },
  },
});

export default imageSlice.reducer;
