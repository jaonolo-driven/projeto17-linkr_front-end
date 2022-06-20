import styled from 'styled-components'

export const ProfilePic = styled.img`
    height: ${props => props.radius + 'px'};
    width: ${props => props.radius + 'px'};
    border-radius: 50%;
`