import React from 'react'

export const UsernameEdit = () => {
    return (
        <form>
            <label>Потребителско име: </label>
            <input className="form-control border" type="text" />
            <button className="btn primary">Запази</button>
        </form>
    )
}
