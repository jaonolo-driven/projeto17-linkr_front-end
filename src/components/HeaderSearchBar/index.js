import styled from 'styled-components'
import { FaSearch } from 'react-icons/fa'
import { IconContext } from 'react-icons'
import { useState, useContext } from 'react'
import debounce from '../../utils/debounce'
import axios from 'axios'
import UserContext from '../../contexts/UserContext'
import { ProfilePic } from '../../styles/ProfilePic'

const HeaderSearchBar = () => {
    const [searchResults, setSearchResults] = useState(null)
    const [token, setToken] = useContext(UserContext)

    const onSubmit = async value => {
        const config = {headers: { authorization: `Bearer ${token}`}}
        const results = await axios.post(process.env.REACT_APP_API_URL + '/users', { searchString: value }, config)
        console.log(results)
        setSearchResults(results.data.rows)
    }

    const submitHandler = event => {
        event.preventDefault()
        onSubmit()
    }
    
    const onChange = ({target}) => {
        if(target.value.length < 3) return setSearchResults(null)
        if(searchResults !== 'loading') setSearchResults('loading')
        onSubmit(target.value)
    }

    const changeHandler = debounce(onChange)

    const RenderResults = ({resultsList}) => {
        if(resultsList === 'loading')
            return <Loading/>
        
        if(resultsList.length === 0)
            return 'Usuário não encontrado :('

        else return resultsList.map(({profilePicture}) => <SearchBarButtonResult>
                <ProfilePic alt='profile-picture' src={profilePicture} radius={39} />
            </SearchBarButtonResult>    
        )    
    }

    return <SBWithDropdown>
        <SearchBarContainer onSubmit={submitHandler}>
            <SearchBarInput
                placeholder='teste'
                onChange={changeHandler}
            />
            <SearchBarButton type='submit'>
                <SearchBarIcon/>
            </SearchBarButton>
        </SearchBarContainer>
        <SearchBarDropdown state={searchResults}>
            {searchResults ? <RenderResults resultsList={searchResults}/> : <></> }
        </SearchBarDropdown>
    </SBWithDropdown>
}

const SBWithDropdown = styled.section`
    position: relative;
`

const SearchBarIcon = () => {
    const styledIcon = {
        color: '#C6C6C6',
        size: '1.575em'
    }

    return <IconContext.Provider value={styledIcon}>
        <FaSearch />
    </IconContext.Provider>
}

const SearchBarContainer = styled.form`
    height: 45px;
    width: 563px;
    border-radius: 8px;
    display: flex;
`

const SearchBarInput = styled.input`
    border: none;
    height: 100%;
    flex-grow: 1;
    border-radius: 8px 0 0 8px;
    padding-left: 14px;
    font-size: 19px;

    ::placeholder {
        color: #C6C6C6;
    }
`
const SearchBarButton = styled.button`
    border-radius: 0 8px 8px 0;
    border: none;
    background-color: white;
    padding: 12px;
`

const SearchBarDropdown = styled.div`
    width: 100%;
    background-color: aqua;
    position: absolute;
    top: 8px;
    transform: translateY(${props => props.state ? '29px' : '0'});
    z-index: -1;
    padding-top: 8px;
`

const Loading = styled.span`
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: block;
    margin:15px auto;
    position: relative;
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
    box-sizing: border-box;
    animation: shadowPulse 2s linear infinite;

    @keyframes shadowPulse {
        33% {
            background: #FFF;
            box-shadow: -24px 0 #FF3D00, 24px 0 #FFF;
        }
        66% {
            background: #FF3D00;
            box-shadow: -24px 0 #FFF, 24px 0 #FFF;
        }
        100% {
            background: #FFF;
            box-shadow: -24px 0 #FFF, 24px 0 #FF3D00;
        }
    }
`

const Button = styled.div`
    cursor: pointer;
`

const SearchBarButtonResult = styled(Button)`
    padding: 8px 17px;
    width: 100%;
    display: flex;
    gap: 12px
`

export default HeaderSearchBar