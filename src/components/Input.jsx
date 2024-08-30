const Input = (props) => {
    const {type, name, label, col, onChange, value} = props

    return(
        <div className={`col-md-${col}`}>
            <div className={`form-floating`}>
                <input type={type} name={name} id={name} value={value} className="form-control" placeholder="" onChange={onChange}/>
                <label htmlFor={name}> {label} </label>
            </div>
        </div>
        
    )
}
export default Input