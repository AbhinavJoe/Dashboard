import { createSlice } from "@reduxjs/toolkit";
import { TenantState } from "@/types";

const getInitialTenant = (): TenantState => {
    if (typeof window !== 'undefined') {
        const savedTenant = localStorage.getItem('selectedTenant');
        if (savedTenant) {
            return { tenantData: JSON.parse(savedTenant) };
        }
    }
    return { tenantData: null };
};

const initialState: TenantState = getInitialTenant();

const tenantSlice = createSlice({
    name: "tenantSlice",
    initialState,
    reducers: {
        setTenant: (state, action) => {
            state.tenantData = action.payload;
            if (typeof window !== 'undefined') {
                localStorage.setItem('selectedTenant', JSON.stringify(action.payload));
            }
        },
        clearTenant: (state) => {
            state.tenantData = null;
            if (typeof window !== 'undefined') {
                localStorage.removeItem('selectedTenant');
            }
        }
    }
})

export const { setTenant, clearTenant } = tenantSlice.actions;
export default tenantSlice.reducer;