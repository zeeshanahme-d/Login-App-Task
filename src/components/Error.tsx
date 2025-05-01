import React from 'react';

interface ErrorProps {
    error?: string | null;
}

const Error: React.FC<ErrorProps> = (props) => {
    return (
        <>
            {props.error ?
                <p className="text-sm text-[#ed4337]">{props.error}</p>
                :
                <></>
            }
        </>
    )
}

export default Error;