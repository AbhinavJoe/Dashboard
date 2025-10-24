import { User } from "@/types";

const loadUserFromLocalStorage = (key: string, defaultValue: User[]): User[] => {
    try {
        const stored = localStorage.getItem(key);
        if (stored) {
            return JSON.parse(stored);
        } else {
            localStorage.setItem(key, JSON.stringify(defaultValue));
            return defaultValue;
        }
    } catch (error) {
        console.error(`Error loading ${key} from localStorage:`, error);
        return defaultValue;
    }
};

const saveUserToLocalStorage = (key: string, users: User[]): void => {
    try {
        localStorage.setItem(key, JSON.stringify(users));
    } catch (error) {
        console.error(`Error saving ${key} to localStorage:`, error);
    }
};

export { loadUserFromLocalStorage, saveUserToLocalStorage }