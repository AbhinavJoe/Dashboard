'use client';
import { listTenants } from "@/utils/apiCalls";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setTenant } from "@/store/slices/tenantSlice";
import { setUsers } from "@/store/slices/usersSlice";
import { TenantProps } from "@/types";
import { axisUsers, sbiUsers } from "@/data/users";

const LoginPage = () => {
    const [tenants, setTenants] = useState<TenantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTenant, setSelectedTenantId] = useState<string | null>(null);
    const router = useRouter();
    const dispatch = useAppDispatch();

    const currentTenantId = useAppSelector(state => state.tenant.tenantData?.id);

    useEffect(() => {
        if (currentTenantId) {
            router.push(`/dashboard/${currentTenantId}`);
            return;
        }

        const fetchTenants = async () => {
            try {
                const data = await listTenants();
                setTenants(data);
            } catch (error) {
                console.error("Failed to fetch tenants:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTenants();
    }, [currentTenantId, router]);

    const handleTenantSelect = (tenant: TenantProps) => {
        setSelectedTenantId(tenant.id);

        dispatch(setTenant(tenant));
        dispatch(setUsers(tenant.id === "axis" ? axisUsers : sbiUsers));

        const selectTimeout = setTimeout(() => {
            router.push(`/dashboard/${tenant.id}`);
        }, 300);

        return () => clearTimeout(selectTimeout);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading tenants...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 p-4">
            <div className="w-full max-w-6xl">
                <div className="text-center mb-12">
                    <div className="mb-6">
                        <div className="inline-block p-4 bg-white rounded-2xl shadow-lg mb-4">
                            <svg
                                className="w-12 h-12 text-blue-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Welcome Back
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 font-light">
                        Select your tenant to get started
                    </p>
                </div>

                {tenants.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="text-6xl mb-4">🏢</div>
                        <p className="text-gray-600 text-lg">No tenants available</p>
                    </div>
                ) : (
                    <div className="w-full flex flex-wrap gap-8 justify-center">
                        {tenants.map((tenant) => (
                            <button
                                key={tenant.id}
                                onClick={() => handleTenantSelect(tenant)}
                                disabled={selectedTenant === tenant.id}
                                className={`w-80 group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 ${selectedTenant === tenant.id
                                    ? 'border-green-500 scale-95'
                                    : 'border-transparent'
                                    }`}
                                style={{
                                    borderColor: selectedTenant === tenant.id
                                        ? tenant.primaryColor
                                        : 'transparent'
                                }}
                            >
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${tenant.primaryColor} 0%, ${tenant.secondaryColor} 100%)`
                                    }}
                                />

                                <div className="relative flex flex-col items-center space-y-6">
                                    {/* Logo */}
                                    <div
                                        className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl font-bold text-white shadow-md group-hover:scale-110 transition-transform duration-300"
                                        style={{ backgroundColor: tenant.primaryColor }}
                                    >
                                        {tenant.logo}
                                    </div>

                                    {/* Tenant Name */}
                                    <div className="text-center">
                                        <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                            {tenant.name}
                                        </h2>
                                        <div
                                            className="h-1 w-16 mx-auto rounded-full transition-all duration-300 group-hover:w-24"
                                            style={{ backgroundColor: tenant.primaryColor }}
                                        />
                                    </div>

                                    <div className="mt-4 w-full">
                                        {selectedTenant === tenant.id ? (
                                            <div className="flex items-center justify-center space-x-2 text-white font-semibold py-3 px-6 rounded-xl"
                                                style={{ backgroundColor: tenant.primaryColor }}
                                            >
                                                <svg
                                                    className="animate-spin h-5 w-5"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                <span>Loading...</span>
                                            </div>
                                        ) : (
                                            <span
                                                className="inline-flex items-center justify-center w-full px-6 py-3 rounded-xl text-white font-semibold group-hover:shadow-lg transition-all duration-300 group-hover:scale-105"
                                                style={{
                                                    backgroundColor: tenant.primaryColor,
                                                }}
                                            >
                                                Continue
                                                <svg
                                                    className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </span>
                                        )}
                                    </div>

                                    <div className="flex gap-2 mt-2">
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: tenant.primaryColor }}
                                        />
                                        <div
                                            className="w-3 h-3 rounded-full"
                                            style={{ backgroundColor: tenant.secondaryColor }}
                                        />
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                )}

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Need help? Contact your administrator
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;