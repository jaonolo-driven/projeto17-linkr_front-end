import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import AuthForm from "../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

import { loginSchema } from "../../schemas/authSchemas";

const LoginPage = () => {
    const state = useState({})
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const onSubmit = async () => {
        const validation = loginSchema.validate(state[0])
        if(validation.error)
            return alert(validation.error.message)
        
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL, state[0])
            setUser(response.data.token)
            localStorage.setItem('user', JSON.stringify(response.data.token))
            navigate('/timeline')
        } catch (error) {
            alert(error)
        }
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