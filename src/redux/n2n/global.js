import { createSlice } from '@reduxjs/toolkit';

export const global = createSlice({
  name: 'global',
  initialState: {
    pageTitle: "",  // current page title state management
    dimensionScreenW: 0,
    dimensionComponent: {
      width: 0,
      height: 0,
    },
    toggleSidebar: true,
    check: false, // untuk checklist drawer
    menu: [],
    toggleModal: {
      isOpen: false,
      modal: null,
    },
    toggleModalLog: false,
    akunakses: {},
    list_data_vendor: {},
    data_detail_project: {},
  },
  reducers: {
    setPageTitle: (state, action) => {
      state.pageTitle = action.payload.title
    },
    setDimensionScreenW: (state, action) => {
      state.dimensionScreenW = action.payload
    },
    setDimensionHeight: (state, action) => {
      state.dimensionComponent.height = action.payload
    },
    setDimensionWidth: (state, action) => {
      state.dimensionComponent.width = action.payload
    },
    setToggleSidebar: (state, action) => {
      state.toggleSidebar = action.payload
    },
    setCheck: (state, action) => {  // untuk checklist drawer
      state.check = action.payload
    },
    setMenu: (state, action) => {  // untuk checklist drawer
      state.menu = action.payload
    },
    setToggleModal: (state, action) => {
      state.toggleModal = action.payload
    },
    setToggleModalPO: (state, action) => {
      state.toggleModalPO = action.payload
    },
    setToggleModalLog: (state, action) => {
      state.toggleModalLog = action.payload
    },
    setAkunAkses: (state, action) => {  // untuk checklist drawer
      state.akunakses = action.payload
    },
    setListDataVendor: (state, action) => {
      state.list_data_vendor = action.payload;
    },
    setDataDetailProject: (state, action) => {
      state.data_detail_project = action.payload;
    },
  }
});

export const {
  setPageTitle,
  setDimensionScreenW,
  setDimensionHeight,
  setDimensionWidth,
  setToggleSidebar,
  setCheck,
  setMenu,
  setToggleModal,
  setToggleModalPO,
  setToggleModalLog,
  setAkunAkses,
  setListDataVendor,
  setDataDetailProject,
} = global.actions;

export default global.reducer;