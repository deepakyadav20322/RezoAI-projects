import React from 'react'

const Coupan = () => {
    return (
        <div className="coupon-container">
            <input 
                type="text"
                placeholder="Enter coupon code"
                className="coupon-input"
            />
            <button className="apply-btn">
                Apply
            </button>
        </div>
    )
}

export default Coupan