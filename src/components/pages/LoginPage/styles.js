import styled from 'styled-components';

export const SignupContainer = styled.div`
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
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
    padding: 0 144px;

    @media screen and (max-width: 1150px) {
        font-size: 32px;
        
        h1 {
            font-size: 85px;
        }
    }

    @media screen and (max-width: 1000px) {
        align-items: center;
        flex-grow: 0;
        width: 100%;
        height: 175px;
        font-size: 23px;

        padding: 0px;

        h1 {
            font-size: 76px;
            line-height: 60px;
        }

        p {
            max-width: 240px;
            text-align: center;
        }
    }

`

export const FormContainer = styled.div`
    height: 100%;
    max-width: 535px;
    width: 100%;
    padding: 0 50px;
    display: flex;
    align-items: center;

    padding-top: 40px;

    @media screen and (max-width: 1000px) {
        flex-direction: column;
        flex-grow: 1;
        height: auto;
        padding: 22px;
    }
`