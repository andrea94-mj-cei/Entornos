export const Select = ({name, label, firstOptionLabel, value, onChange, lista=[{value:0, label:"no hay items"}], error, className, debug}) => {
    return (
        <div className={className}>
            {label && <label htmlFor={name}>{label}</label>}
            <select 
                className="Input-Label"
                name={name} 
                id={name}
                value={value}
                onChange={onChange}
                >
                    <option value="">{firstOptionLabel}</option>
                    {
                        lista.map( ({value, label}) => (
                            <option key={value} value={value}>{label}</option>
                        ))
                    }
            </select>
            {error &&  <p style={ {color:'red'} }>  {error}</p> }
            {debug && <span style={{color:'orange'}}>Has escrito: {JSON.stringify(value)}</span>}
        </div>
    )
}