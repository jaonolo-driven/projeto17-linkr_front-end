import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

const SignupPage = () => {
    const state = useState(null)
    const navigate = useNavigate()

    const onSubmit = () => {
        console.log(state[0])
        navigate('/')
    }

    const inputs = [
        {key: 'email', text: 'e-mail'},
        {key: 'password', text: 'password'},
        {key: 'username', text: 'username'},
        {key: 'pictureUrl', text: 'picture url'}
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
                    submitButtonText: 'Sign Up',
                    auxPageLink: '/',
                    auxPageLinkText: 'Switch back to log in'
                }}
                onSubmit={onSubmit}
            />
        </FormContainer>
    </SignupContainer>
}

export default SignupPage