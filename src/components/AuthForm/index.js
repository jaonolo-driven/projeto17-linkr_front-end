import { useState } from "react"
import { Link } from "react-router-dom"
import { StyledForm } from "./styles"

const AuthForm = ({state, options, onSubmit}) => {
    const [data, setData] = state
    const [disabled, setDisabled] = useState(false)

    const submitHandler = event => {
        event.preventDefault()
        setDisabled(true)
        onSubmit()
        setDisabled(false)
    }

    const changeHandler = key => (({target}) => {
        const newData = {...data}
        newData[key] = target.value
        setData(newData)
    })

    return <StyledForm onSubmit={submitHandler}>
        {options.inputs.map(e => <input key={`${e.key}-input`}
            type='text'
            onChange={changeHandler(e.key)}
            placeholder={e.text}
        />)}
        <button disabled={disabled} type="submit">
            {options.submitButtonText}
        </button>
        <Link to={options.auxPageLink}>
            {options.auxPageLinkText}
        </Link>
    </StyledForm>
}

export default AuthForm