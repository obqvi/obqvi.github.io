import React, { useState } from 'react'
import { NavLink } from 'react-router-dom';

export const CreateButtonFixed = () => {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(!isOpen)} className="box" style={{
                position: 'fixed',
                width: '60px',
                height: '60px',
                right: '60px',
                bottom: '60px',
                fontSize: '27px',
                borderRadius: '100%',
                boxShadow: '2px 2px 10px #2222',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <i className="fas fa-plus"></i>
            </div>
            {isOpen ? <div className="box text-center" style={{
                position: 'fixed',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                padding: '20px',
                boxShadow: '2px 2px 10px #0007',
            }}>
                <h4>Създаване</h4>
                <div>
                    <NavLink onClick={() => setIsOpen(false)} to="/create">Продавам продукт</NavLink>
                </div>
                <div>
                    <NavLink onClick={() => setIsOpen(false)} to="/event/create">Ново събитие</NavLink>
                </div>
            </div> : ''}
        </>
    )
}
