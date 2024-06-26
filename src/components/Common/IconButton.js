import React from 'react'
function IconButton({ text, onclick, children, disabled, outline = false, customClasses, type, }) {
    return (
        <button disabled={disabled}
            onClick={onclick}
            type={type}
        >
            {
                children ? (
                    <>
                        <span className='text-richblack-100'>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (text)
            }
        </button >
    )
}

export default IconButton