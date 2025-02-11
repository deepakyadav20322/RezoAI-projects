import React, { useEffect, useRef } from 'react'

const OutSideClick = (callbacks) => {
    const ref = useRef();
    const handleOutsideClick = (e) => {
        if (ref.current && !ref.current.contains(e.target)) {
            console.log("clicked outside");
            // Execute all callbacks if they're provided as an array
            if (Array.isArray(callbacks)) {
                callbacks.forEach(callback => {
                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else if (typeof callbacks === 'function') {
                // Maintain backward compatibility for single callback
                callbacks();
            }
        }
    }

    useEffect(() => {
        document.addEventListener("mouseup", handleOutsideClick);
        return () => {
            document.removeEventListener("mouseup", handleOutsideClick);
        }
    }, [callbacks])

    return ref;
}

export default OutSideClick