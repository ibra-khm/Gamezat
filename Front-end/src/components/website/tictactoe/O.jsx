import React from 'react'

export default function O({ styling, styling2 }) {
    return (
        <>


            <span className={`bg-green-600 h-10 w-10 absolute ${styling}`} style={{ clipPath: ' circle(50.0% at 50% 50%)' }} ></span>
            <span className={`bg-blue-400  h-10 w-10 absolute ${styling2}`} style={{ clipPath: ' circle(25.0% at 50% 50%)' }} ></span>



        </>
    )
}
