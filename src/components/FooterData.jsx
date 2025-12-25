import React from 'react'

export default function FooterData() {
    return (
        <div className="footer-data">
            <div style={{ width: '30%' }}>
                {/* Empty left spacer */}
            </div>

            <div className="glass-panel" style={{
                padding: '1rem 2.5rem',
                borderRadius: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '0.2rem' }}>Total Price</div>
                <div style={{ fontSize: '1.8rem', fontWeight: 700 }}>$249.00</div>
            </div>

            <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button className="glass-panel" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>-</button>

                <div className="glass-panel" style={{
                    height: '50px',
                    padding: '0 1.5rem',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    fontWeight: 600
                }}>1</div>

                <button className="glass-panel" style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    fontSize: '1.2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>+</button>

                <button style={{
                    background: 'white',
                    color: 'black',
                    padding: '0 2.5rem',
                    height: '50px',
                    borderRadius: '12px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    marginLeft: '1rem'
                }}>
                    Add to Cart
                </button>
            </div>
        </div>
    )
}
