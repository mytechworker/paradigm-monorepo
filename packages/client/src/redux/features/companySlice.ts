import { createSlice } from '@reduxjs/toolkit';

import type { Company } from '@client/types/company.types';

type CompanySliceTypes = {
  company: Company | null;
  companies: Company[] | [];
};

const initialState: CompanySliceTypes = {
  company: null,
  companies: [],
};

const CompanySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {
    setCompany: (state, action) => {
      state.company = action.payload;
    },

    setCompanies: (state, action) => {
      state.companies = action.payload;
    },

    resetCompanies: (state) => {
      return {
        ...state,
        companies: [],
      };
    },

    resetCompany: (state) => {
      return {
        ...state,
        company: null,
      };
    },
  },
});

export const { setCompanies, setCompany, resetCompany, resetCompanies } = CompanySlice.actions;

export default CompanySlice;
