import React from 'react';

interface LoaderProps {
    isLoading?: boolean;
};

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
    return (

        <div className={`absolute backdrop-blur h-full z-50 flex-col gap-4 w-full flex items-center justify-center ${!isLoading ? 'hidden' : ''}`} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div
                className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-white rounded-full"
            >
                <div
                    className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-white rounded-full"
                ></div>
            </div>
        </div>

    )
}

export default Loader