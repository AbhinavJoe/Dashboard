import { axisTenant } from "@/data/axis";
import { sbiTenant } from "@/data/sbi";
import { addAxisUser, addSbiUser, getAxisUsers, removeAxisUser, removeSbiUser, getSbiUsers } from "@/data/users";
import { AppDispatch } from "@/store";
import { setUsers } from "@/store/slices/usersSlice";
import { Tenant, User } from "@/types";

const listTenants = () => {
    return [axisTenant, sbiTenant]
}

const listUsers = (tenantId: Tenant, dispatch: AppDispatch) => {
    if (tenantId === 'axis') {
        dispatch(setUsers(getAxisUsers()))
    } else {
        dispatch(setUsers(getSbiUsers()))
    }
}

const addUser = (formData: Omit<User, "id" | "createdAt" | "updatedAt">, tenantId: Tenant, dispatch: AppDispatch) => {
    const now = new Date().toISOString();

    const newUser: User = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        ageRange: formData.ageRange,
        language: formData.language,
        website: formData.website || undefined,
        tenant: tenantId,
        createdAt: now,
        updatedAt: now,
    };

    if (tenantId === "axis") {
        addAxisUser(newUser);
    } else if (tenantId === "sbi") {
        addSbiUser(newUser);
    }

    listUsers(tenantId, dispatch);
}

const removeUser = (userId: string, tenantId: Tenant, dispatch: AppDispatch) => {
    if (tenantId === "axis") {
        removeAxisUser(userId);
        listUsers(tenantId, dispatch);
    } else if (tenantId === "sbi") {
        removeSbiUser(userId);
        listUsers(tenantId, dispatch);
    }
}

export { listTenants, listUsers, addUser, removeUser }