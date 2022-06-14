import styled from 'styled-components';

export const SignupContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
`

export const AsideContainer = styled.aside`
    display: flex;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
    justify-content: center;

    font-family: var(--subtitle-font);
    font-weight: 700;
    font-size: 43px;
    color: white;

    h1 {
        font-family: var(--title-font);
        font-size: 106px;
    }

    p {
        max-width: 450px;
        word-break: break-word;
    }

    background-color: var(--darker-grey);
    padding: 0 144px
`

export const FormContainer = styled.div`
    height: 100%;
    width: 535px;
    padding: 0 50px;
    display: flex;
    align-items: center;
`