import styled from 'styled-components'

export const SquareImg = styled.div`
    padding-top: 100%;
    background-image: url(${props => props.src});
    background-size: auto 100%;
    background-position: center;
`