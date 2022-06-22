import styled from 'styled-components'

export const Card = styled.div`
    display: flex;
    width: 100%;
    max-width: 600px;
    @media screen and (max-width: 600px) {
        border-radius: 0;
    }
    border-radius: 16px;

    margin-bottom: 30px;
    // margin-bottom: 5%;
`;