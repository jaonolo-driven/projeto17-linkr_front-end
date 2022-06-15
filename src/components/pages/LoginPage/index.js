import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../contexts/UserContext";
import AuthForm from "../../AuthForm";
import { SignupContainer, AsideContainer, FormContainer } from "./styles";

import { loginSchema } from "../../../schemas/authSchemas";

const LoginPage = () => {
    const state = useState({})
    const [user, setUser] = useContext(UserContext)
    const navigate = useNavigate()

    const onSubmit = async () => {
        const validation = loginSchema.validate(state[0])
        if(validation.error)
            return alert(validation.error.message)
        
        try {
            const response = await axios.post(process.env.REACT_APP_API_URL + '/login', state[0])
            localStorage.setItem('user', JSON.stringify(response.data))
            setUser(response.data)
            navigate('/timeline')
        } catch (error) {
            const {response} = error
            if(response.status === 401) alert(`ERRO: email não cadastrado ou senha incorreta`)
            else alert(error)
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