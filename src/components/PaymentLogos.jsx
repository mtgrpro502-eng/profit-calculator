import React from 'react';

export const MadaLogo = ({ className }) => (
    <svg viewBox="0 0 100 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="40" rx="4" fill="#fff" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="24" fill="#0055a5">mada</text>
        <path d="M10 10 Q 50 5 90 10" stroke="#00a79d" strokeWidth="2" fill="none" opacity="0.5" />
    </svg>
);

export const StcPayLogo = ({ className }) => (
    <svg viewBox="0 0 100 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="40" rx="4" fill="#4f008c" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="18" fill="#fff">stc pay</text>
    </svg>
);

export const TabbyLogo = ({ className }) => (
    <svg viewBox="0 0 100 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="40" rx="4" fill="#3EEDBF" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="22" fill="#000">tabby</text>
    </svg>
);

export const TamaraLogo = ({ className }) => (
    <svg viewBox="0 0 100 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="tamaraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E55C5C" />
                <stop offset="100%" stopColor="#F2A864" />
            </linearGradient>
        </defs>
        <rect width="100" height="40" rx="4" fill="url(#tamaraGrad)" />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="20" fill="#fff">tamara</text>
    </svg>
);

export const VisaLogo = ({ className }) => (
    <svg viewBox="0 0 100 32" className={className} xmlns="http://www.w3.org/2000/svg">
        <path fill="#1A1F71" d="M39.6 0l-4.2 26.3h-6.6l4.2-26.3h6.6zm11.4 0L43.8 26.3h-4.5l3.4-16.9c-1.7 0-5.8 0-7.5 3.9l-6.4 15.2h6.8l1-2.8h8.4l.8 3.8h6l-5.2-26.3h-6.6zm-7.3 17.9l2.4-6.6c.1-.3.5-1.5.5-1.5l.3 1.6 1.4 6.5h-4.6zM75.5 10.3c-1.6-.8-4.2-1.7-7.4-1.7-8.1 0-13.8 4.3-13.8 10.5 0 4.6 4.1 7.1 7.2 8.6 3.2 1.6 4.3 2.6 4.3 4 0 2.1-2.6 3.1-4.9 3.1-3.3 0-5-.5-7.7-1.7l-1.1-.5-1.1 7.1c1.9.9 5.5 1.7 9.1 1.7 8.6 0 14.2-4.2 14.2-10.8 0-3.6-2.1-6.4-6.8-8.6-2.9-1.4-4.6-2.4-4.6-3.9 0-1.3 1.5-2.7 4.7-2.7 2.7 0 4.6.5 6.1 1.2l.7.3 1.1-6.6zM95.2 17.1c.9-2.4 4.3-11.8 4.3-11.8l-3.6 17.3c-.1.5-.4 1.4-.4 1.4l-6.3-15.7-6.6 26.3h7l10.7-25.5 3.9 18.4h6.2L95.2 17.1z" />
    </svg>
);

export const MastercardLogo = ({ className }) => (
    <svg viewBox="0 0 100 60" className={className} xmlns="http://www.w3.org/2000/svg">
        <circle cx="35" cy="30" r="20" fill="#EB001B" fillOpacity="0.9" />
        <circle cx="65" cy="30" r="20" fill="#F79E1B" fillOpacity="0.9" />
        <path d="M50 13.5a20 20 0 0 1 0 33 20 20 0 0 1 0-33z" fill="#FF5F00" />
    </svg>
);

export const ApplePayLogo = ({ className }) => (
    <svg viewBox="0 0 100 40" className={className} xmlns="http://www.w3.org/2000/svg">
        <rect width="100" height="40" rx="4" fill="#000" />
        <path fill="#fff" d="M43.7 16.6c0-3.5 2.9-6.4 6.8-6.4 1.7 0 3.3.6 4.5 1.6l-.9 1.4c-1-.8-2.3-1.3-3.6-1.3-2.7 0-4.7 2-4.7 4.7 0 2.7 2 4.7 4.7 4.7 1.4 0 2.7-.5 3.7-1.4l.9 1.4c-1.2 1.1-2.9 1.8-4.6 1.8-3.9 0-6.8-2.9-6.8-6.5zm-12.4 6.3h-2.1v-8.6h-3.6v-1.8h9.3v1.8h-3.6v8.6zm18.9 0h-2.1v-10.4h2.1v10.4zm4.3 0h-2.1v-10.4h2.1v10.4zm6.5-10.4l-3.4 10.4h-2.2l3.4-10.4h2.2zm5.7 10.4h-2.3l-3.9-10.4h2.3l2.7 7.6 2.7-7.6h2.2l-3.7 10.4z" />
        <path fill="#fff" d="M28.5 15.2c0 2.3-1.9 3.8-4.3 3.8-1.2 0-2.3-.4-3.1-1v3.7h-2.1v-10.4h2.1v3.9c.8-.7 1.9-1.1 3.1-1.1 2.4 0 4.3 1.5 4.3 3.8zm-2.1 0c0-1.4-1.1-2.3-2.6-2.3-1.1 0-2.1.6-2.6 1.5v1.6c.5.9 1.5 1.5 2.6 1.5 1.5 0 2.6-.9 2.6-2.3z" />
    </svg>
);
