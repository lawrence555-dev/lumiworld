'use client';

import React from 'react';

export const AnimatedBackground = () => {
    return (
        <div className="fixed inset-0 overflow-hidden -z-10 bg-[#0F172A]">
            <div className="blob" />
            <div className="blob blob-secondary" />
            <div className="blob blob-accent" />
            {/* Mesh Grid Effect */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}
            />
        </div>
    );
};
