import styled from 'styled-components'

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    text-align: center;
    gap: 13px;
    width: 100%;

    input, button {
        height: 65px;
        border-radius: 6px;
        font-family: var(--custom-font);
        font-size: 27px;
        font-weight: 700;
        padding: 0 17px;
        border: none;
        ::placeholder {
            color: #9F9F9F;
        }
    }

    button {
        background-color: #1877F2;
        color: white
    }

    a {
        margin-top: 5px;
        font-size: 20px;
        color: white
    }
`