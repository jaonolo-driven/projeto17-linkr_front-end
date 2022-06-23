import styled from 'styled-components'

export const Card = styled.div`
    display: flex;
    width: 600px;
    @media screen and (max-width: 600px) {
        width: 100%;
        border-radius: 0;
    }
    border-radius: 16px;

    //margin-bottom: 30px;
    padding: 17px;
    // margin-bottom: 5%;
`;