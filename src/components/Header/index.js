import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import UserContext from "../../contexts/UserContext"
import axios from "axios"
import HeaderDropdownIcon from "../HeaderDropdownIcon"
import HeaderSearchBar from "../HeaderSearchBar"
import { ProfilePic } from "../../styles/ProfilePic"

const Header = () => { 
    const [dropDownState, setDropDownState] = useState(false)
    const [user, setUser] = useContext(UserContext)
    const [avatar, setAvatar] = useState('')
    const navigate = useNavigate()  

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/user`,
        {
            headers: {
                Authorization: `Bearer ${user.token}`
            }
        }).then(({data}) => {
            const {profilePicture} = data
            setAvatar(profilePicture)
            setUser({...user, profilePicture})
        }).catch(e => console.log(e.data))
    },[])

    const logout = () => {
        localStorage.removeItem('user')
        setUser(null)
        navigate('/')
    }

    const DesktopHeader = ({children}) => <DesktopContainer>
        <Link to="/">
            <h1>linkr</h1>
        </Link>
        {children}
        <DropdownButton onClick={() => setDropDownState(!dropDownState)}  >
            <HeaderDropdownIcon dropDownState={dropDownState}/>
            <ProfilePic alt='profile-picture' src={avatar} radius={53} />
        </DropdownButton>
        <DropdownLogout state={dropDownState}><div onClick={logout}>logout</div></DropdownLogout>
    </DesktopContainer>

    const MobileHeader = ({children}) => <MobileHolder>
        <MobileContainer>
            <Link to="/">
                <h1>linkr</h1>
            </Link>
            <DropdownButton onClick={() => setDropDownState(!dropDownState)}  >
                <HeaderDropdownIcon dropDownState={dropDownState}/>
                <ProfilePic alt='profile-picture' src={avatar} radius={44} />
            </DropdownButton>
            <DropdownLogout state={dropDownState}><div onClick={logout}>logout</div></DropdownLogout>
        </MobileContainer>
        <MobileSearchBarHolder>
            {children}
        </MobileSearchBarHolder>
    </MobileHolder>

    return <>
        {/* queria dividir o estado da searchbar sem subir ele pra esse componente, n consegui ;--; */}
        <DesktopHeader><HeaderSearchBar/></DesktopHeader>
        <MobileHeader><HeaderSearchBar/></MobileHeader>
    </>
}

export default Header

const Container = styled.div`
    background-color: var(--darker-grey);
    position: sticky;
    top: 0;
    height: 72px;
    padding: 0 17px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 2;

    h1 {
        color: white;
        font-size: 49px;
        font-family: var(--title-font);
    }

    a {
        text-decoration: none;
        height: 100%;
        display: flex;
        align-items: center;
        padding-right: 17px;
    }

    @media screen and (max-width: 650px) {
        h1 {
            font-size: 45px;
        }
    }
`

const DesktopContainer = styled(Container)`
    @media screen and (max-width: 650px) {
        display: none
    }
`

const MobileHolder = styled.header`
    position: sticky;
    top: 0;
    background-color: var(--lighter-grey);

    @media screen and (min-width: 650px) {
        display: none
    }
`

const MobileSearchBarHolder = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MobileContainer = styled(Container)`
    position: relative;
`

const DropdownButton = styled.div`
    display: flex;
    align-items: center;
    gap: 16px;
    justify-content: flex-end;
    width: 150px;
    height: 100%;
    cursor: pointer;
    background-color: var(--darker-grey);

    @media screen and (max-width: 650px) {
        gap: 12px;
    }
`

const DropdownLogout = styled.div`
    position: absolute;
    background-color: var(--darker-grey);
    right: 0;
    top: 72px;
    z-index: -1;
    transform: translateY(${props => props.state ? '0%' : '-100%'});
    transition: transform 250ms;
    width: 150px;
    height: 47px;
    border-radius: 0 0 0 20px;

    div {
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 17px;

        :hover {
            cursor: pointer;
        }
    }
`