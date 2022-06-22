import { UrlPostContainer, UrlPostText, UrlPostImgFrame } from "./styles"
import { SquareImg } from "../../styles/SquareImg";

const UrlPost = ({url}) => <UrlPostContainer href={url.link}>
    <UrlPostText>
        {url.title ? <h4>{url.title}</h4> : <></>}
        {url.description ? <p>{url.description}</p> : <></>}
        {url.link ? <small href={url.link}>{url.link}</small> : <></>}
    </UrlPostText>
    {url.image ? <UrlPostImgFrame>
        <SquareImg src={url.image}/>
    </UrlPostImgFrame> : <></>}
</UrlPostContainer>

export default UrlPost