import { useState } from "react";
import { BiRepost } from "react-icons/bi";
import styled from "styled-components";

export default function RepostButton(props){
    const{numberReposts} = props
    const [nReposts, setNReposts] = useState(numberReposts)
    return(
        <Section>
            <BiRepost size={25}/>
            <div>{nReposts} re-posts</div>
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 40px;
`
