import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

import { signupSchema } from "../../../schemas/authSchemas";
const SignupPage = () => {
    const state = useState({})
    const navigate = useNavigate()

    const onSubmit = async () => {
        const validation = signupSchema.validate(state[0])
        if(validation.error)
            return alert(validation.error.message)
        
        try {
            await axios.post(process.env.REACT_APP_API_URL + '/signup', state[0])
            navigate('/')
        } catch (error) {
            const {response} = error
            const fieldNotFilled = response.data.constraint.split('_')[1]
            if(response.status === 409) alert(`ERRO: ${fieldNotFilled} já está em uso`)
            else alert(error)
        }
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