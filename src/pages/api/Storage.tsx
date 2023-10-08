import React, { ReactNode, useEffect } from 'react';
export interface Storage {
    set: (key: string, value: any) => void;
    get: (key: string, defaultValue?: any) => any;
    remove: (key: string) => void;
}

export const storage = {
    setItem: (key: string, value: any) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    getItem: (key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
};
