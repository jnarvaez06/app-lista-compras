const Select = ({name, options, label, col, onChange}) => {

    const options2 = [
        { value: '', label: '-' },
        { value: '1', label: 'La Montaña' },
        { value: '2', label: 'La Gran Colombia' },
        { value: '3', label: 'D1' }
    ];

    return(
        <div className={`col-md-${col}`}>
            <div className="form-floating">
                <select className="form-select" name={name} onChange={onChange}>
                    {options2.map((option) =>{
                        return(
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ) 
                    })}
                </select>
                <label htmlFor={name}> {label} </label>
            </div>
        </div>
    )
}

export default Select