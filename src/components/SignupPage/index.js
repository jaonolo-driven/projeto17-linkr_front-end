import { useState } from "react";
import AuthForm from "../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

const SignupPage = () => {
    const state = useState(null)

    const onSubmit = () => {
        console.log(state[0])
    }

    const inputs = [
        {key: 'oi', text: 'oi'},
        {key: 'oi2', text: 'oi'}
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
                    submitButtonText: 'oi',
                    auxPageLink: '/oi',
                    auxPageLinkText: 'tchau'
                }}
                onSubmit={onSubmit}
            />
        </FormContainer>
    </SignupContainer>
}

export default SignupPage