/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState } from 'react';
import { translations, languages } from '../data/translations';
export { languages };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [currentLanguage, setCurrentLanguage] = useState('en');

    const t = (key) => {
        return translations[currentLanguage][key] || translations['en'][key] || key;
    };

    const value = {
        currentLanguage,
        setCurrentLanguage,
        t
    };

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
