import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

import { loginSchema } from "../../schemas/authSchemas";

const LoginPage = () => {
    const state = useState({})
    const navigate = useNavigate()

    const onSubmit = () => {
        const validation = loginSchema.validate(state[0])
        if(validation.error)
            return alert(validation.error.message)
        console.log(state[0])
        navigate('/timeline')
    }

    const inputs = [
        {key: 'email', text: 'e-mail'},
        {key: 'password', text: 'password'},
    ]

    return <SignupContainer>
        <AsideContainer>
            <h1>linkr</h1>
            <p>save, share and discover the best links on the web</p>
        </AsideContainer>
        <FormContainer>
            <AuthForm  
                state={state}
                options={{
                    inputs: inputs,
                    submitButtonText: 'Log In',
                    auxPageLink: '/sign-up',
                    auxPageLinkText: 'First time? Create an account!'
                }}
                onSubmit={onSubmit}
            />
        </FormContainer>
    </SignupContainer>
}

export default LoginPage