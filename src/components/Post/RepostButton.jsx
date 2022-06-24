import { useState } from "react";
import styled from "styled-components";
import RepostModal from "./RepostModal";

export default function RepostButton(props){
    const{ id, numberReposts, updateState} = props
    const [nReposts, setNReposts] = useState(numberReposts)
    return(
        <Section>
            <RepostModal id={id} updateState={updateState}/>
            <div>{nReposts} re-posts</div>
        </Section>
    )
}

const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 18px;
`
