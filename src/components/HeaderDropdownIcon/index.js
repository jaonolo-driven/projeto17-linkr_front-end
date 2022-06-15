import { FaChevronDown } from "react-icons/fa";
import { IconContext } from "react-icons"
import styled from "styled-components"

const HeaderDropdownIcon = ({dropDownState}) => {
    const styledIcon = {
        color: 'white',
        size: '1.35em'
    }

    return <IconContext.Provider value={styledIcon}>
        <AnimatedIcon state={dropDownState}>
            <FaChevronDown></FaChevronDown>
        </AnimatedIcon>
    </IconContext.Provider>
}

export default HeaderDropdownIcon

const AnimatedIcon = styled.div`
    transform: rotateZ(${props => props.state ? '180deg' : '0'});
    transition: transform 250ms;
    height: fit-content;
`