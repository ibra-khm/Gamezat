import React from 'react'

export default function X({ styling }) {
    return (
        <>
            <span className={`bg-red-600 h-10 w-10 absolute ${styling}`} style={{ clipPath: ' polygon(20% 0%, 0% 20%, 30% 50%, 0% 80%, 20% 100%, 50% 70%, 80% 100%, 100% 80%, 70% 50%, 100% 20%, 80% 0%, 50% 30%)' }} ></span>

        </>

    )
}
