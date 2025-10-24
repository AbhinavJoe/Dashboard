"use client";
import AddUserModal from "@/components";
import { axisTenant } from "@/data/axis";
import { sbiTenant } from "@/data/sbi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTenant } from "@/store/slices/tenantSlice";
import { Tenant, TenantProps } from "@/types";
import { listUsers, listTenants, removeUser } from "@/utils/apiCalls";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
    const [tenants, setTenants] = useState<TenantProps[]>([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [currentTenant, setCurrentTenant] = useState<TenantProps | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const router = useRouter();
    const path = usePathname();
    const tenantId = path.split('/').pop() as Tenant;
    const dispatch = useAppDispatch();

    const users = useAppSelector((state) => state.users.users);

    useEffect(() => {
        dispatch(setTenant(tenantId === "axis" ? axisTenant : sbiTenant));
        listUsers(tenantId, dispatch);

        const fetchTenants = async () => {
            const data = await listTenants();
            setTenants(data);
            const tenant = data.find(tenant => tenant.id === tenantId);
            if (tenant) setCurrentTenant(tenant);
        };
        fetchTenants();
    }, [dispatch, tenantId]);

    const handleTenantSwitch = (newTenantId: Tenant) => {
        setIsDropdownOpen(false);
        dispatch(setTenant(newTenantId === "axis" ? axisTenant : sbiTenant))
        router.push(`/dashboard/${newTenantId}`);
    };

    const handleRemoveUser = async (userId: string) => {
        if (confirm("Are you sure you want to remove this user?")) {
            removeUser(userId, tenantId, dispatch);
        }
    };

    if (!currentTenant) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <header
                className="sticky top-0 z-50 shadow-md"
                style={{ backgroundColor: currentTenant.primaryColor }}
            >
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div
                                className="text-2xl font-bold px-3 py-1 rounded-lg bg-white"
                                style={{ color: currentTenant.primaryColor }}
                            >
                                {currentTenant.logo}
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold text-white">
                                {currentTenant.name}
                            </h1>
                        </div>

                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 transition-all px-4 py-2 rounded-lg text-black font-medium"
                            >
                                <span className="hidden sm:inline">Switch Tenant</span>
                                <svg
                                    className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""
                                        }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {isDropdownOpen && (
                                <>
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsDropdownOpen(false)}
                                    />
                                    <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl overflow-hidden z-50">
                                        <div className="p-2">
                                            {tenants.map((tenant) => (
                                                <button
                                                    key={tenant.id}
                                                    onClick={() => handleTenantSwitch(tenant.id)}
                                                    disabled={tenant.id === tenantId}
                                                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${tenant.id === tenantId
                                                        ? "bg-gray-100 cursor-default"
                                                        : "hover:bg-gray-100"
                                                        }`}
                                                >
                                                    <span
                                                        className="text-xl font-bold px-2 py-1 rounded text-white"
                                                        style={{ backgroundColor: tenant.primaryColor }}
                                                    >
                                                        {tenant.logo}
                                                    </span>
                                                    <div className="flex-1 text-left">
                                                        <p
                                                            className="font-semibold"
                                                            style={{ color: tenant.primaryColor }}
                                                        >
                                                            {tenant.name}
                                                        </p>
                                                        {tenant.id === tenantId && (
                                                            <p className="text-xs text-gray-500">
                                                                Current
                                                            </p>
                                                        )}
                                                    </div>
                                                    {tenant.id === tenantId && (
                                                        <svg
                                                            className="w-5 h-5 text-green-500"
                                                            fill="currentColor"
                                                            viewBox="0 0 20 20"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-6 flex justify-between">
                    <div className="">
                        <h2 className="text-3xl font-bold text-gray-800">Users</h2>
                        <p className="text-gray-600 mt-1">
                            Total: {users.length} user{users.length !== 1 ? "s" : ""}
                        </p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-6 py-3 rounded-lg text-white font-semibold"
                        style={{ backgroundColor: currentTenant.primaryColor }}
                    >
                        + Add User
                    </button>
                </div>

                {users.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-xl shadow-md">
                        <div className="text-6xl mb-4">👥</div>
                        <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                            No Users Found
                        </h3>
                        <p className="text-gray-500">
                            There are no users for this tenant yet.
                        </p>
                    </div>
                ) : (
                    <div className="flex flex-wrap gap-6">
                        {users.map((user) => (
                            <div
                                key={user.id}
                                className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 border-2 border-gray-100 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                            >
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800">
                                            {user.name}
                                        </h3>
                                        <div
                                            className="h-1 w-12 rounded-full mt-2"
                                            style={{
                                                backgroundColor: currentTenant.primaryColor,
                                            }}
                                        />
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <svg
                                            className="w-5 h-5 text-gray-400 mt-0.5 shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                        <span className="text-gray-600 text-sm break-all">
                                            {user.email}
                                        </span>
                                    </div>

                                    <div className="flex items-start space-x-2">
                                        <svg
                                            className="w-5 h-5 text-gray-400 mt-0.5 shrink-0"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                        <span className="text-gray-600 text-sm">
                                            {user.phone}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <span
                                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white"
                                            style={{
                                                backgroundColor: currentTenant.secondaryColor,
                                            }}
                                        >
                                            {user.ageRange}
                                        </span>
                                        {user.website && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                                                Website - {user.website}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => handleRemoveUser(user.id)}
                                        className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                                    >
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                            />
                                        </svg>
                                        <span>Remove</span>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {isModalOpen && (
                <AddUserModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    tenantId={tenantId}
                />
            )}
        </div>
    );
};

export default DashboardPage;