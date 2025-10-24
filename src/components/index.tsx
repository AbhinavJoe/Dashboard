"use client";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { AgeRange, Language, Tenant } from "@/types";
import { addUser } from "@/utils/apiCalls";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
    tenantId: Tenant;
}

const AddUserModal = ({ isOpen, onClose, tenantId }: AddUserModalProps) => {
    const dispatch = useAppDispatch();
    const currentTenant = useAppSelector((state) => state.tenant.tenantData);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        ageRange: "" as AgeRange,
        language: "" as Language,
        website: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const ageRanges: AgeRange[] = ["Below 30", "31-40", "41-50", "51-60", "Above 60"];
    const languages: Language[] = ["English", "Hindi", "Tamil", "Telugu", "Bengali", "Marathi", "Gujarati", "Kannada", "Malayalam", "Punjabi"];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const newUser = {
                ...formData,
                ageRange: formData.ageRange as AgeRange,
                language: formData.language as Language,
                tenant: tenantId,
                website: formData.website || undefined,
            };

            await addUser(newUser, tenantId, dispatch);
            setFormData({ name: "", email: "", phone: "", ageRange: "", language: "", website: "" });
            onClose();
        } catch (error) {
            console.error("Error creating user:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-black/40 bg-opacity-50" onClick={onClose} />

            <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="px-6 py-4 border-b flex items-center justify-between" style={{ backgroundColor: currentTenant?.primaryColor }}>
                    <h2 className="text-2xl font-bold text-white">Add New User</h2>

                    <button onClick={onClose} className="text-white cursor-pointer border border-white hover:border-gray-100 rounded-lg p-2">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400 text-black"
                                placeholder="Enter full name"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400 text-black"
                                placeholder="example@email.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400 text-black"
                                placeholder="+91-9876543210"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Age Range *</label>
                            <select
                                name="ageRange"
                                value={formData.ageRange}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-400"
                            >
                                <option value="">Select age range</option>
                                {ageRanges.map((range) => (
                                    <option key={range} value={range}>{range}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language *</label>
                            <select
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none text-gray-400"
                            >
                                <option value="">Select language</option>
                                {languages.map((lang) => (
                                    <option key={lang} value={lang}>{lang}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Website (Optional)</label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:outline-none placeholder:text-gray-400 text-black"
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 px-6 py-3 text-white font-semibold rounded-lg hover:opacity-90 disabled:opacity-50 cursor-pointer"
                            style={{ backgroundColor: currentTenant?.primaryColor }}
                        >
                            {isSubmitting ? "Creating..." : "Add User"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;