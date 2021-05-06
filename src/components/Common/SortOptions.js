import React from 'react'

export const SortOptions = ({ arr, setArr }) => {

    function handleSort(event) {
        const optionSort = event.target.value;
        if (optionSort === '') {
            setArr([...arr]);
        } else if (optionSort === 'Най нови') {
            arr.sort((a, b) => b.created - a.created);
            setArr([...arr]);
        } else if (optionSort === 'Най стари') {
            arr.sort((a, b) => a.created - b.created);
            setArr([...arr]);
        }
    }

    return (
        <select onChange={handleSort} className="form-control box" name="sort">
            <option value="">Сортиране по</option>
            <option value="Най нови">Най нови</option>
            <option value="Най стари">Най стари</option>
        </select>
    )
}
