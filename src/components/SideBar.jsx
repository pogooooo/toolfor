import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBarDiv = styled.div`
    width: 15vw;
    height: calc(100vh - 40px);
    
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Menu = styled.div`
    width: 10vw;
    margin: 1rem 0 1rem 0;
    padding-right: 15px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    color: #dcdce6;
    font-size: 1.2rem;
    font-weight: bold;
    cursor: default;
`

const Hr = styled.hr`
    background-color: rgba(220, 220, 230, 0.3);
    border: none;
    height: 2px;
    width: 100%;
`

const Options = styled.div`
    display: flex;
    flex-direction: column;
`

const Option = styled(Link)`
    text-decoration: none;
    color: rgba(220, 220, 230, 0.7);
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 1vh;
    
    &:hover{
        color: rgba(220, 220, 230, 1);
    }
`

const BorderDiv = styled.div`
    height: calc(100vh - 40px);
    width: 1px;
    border-right: rgba(220, 220, 230, 0.5) solid 0.2vw;
    box-sizing: border-box;
    
    position: absolute;
    left: 14vw;
`

const SideBar = () => {

    return(
        <SideBarDiv>
            <Menu>
                <Title>생성기</Title>
                <Hr/>
                <Options>
                    <Option to="./fantasyNameGenerator">판타지 이름 생성기</Option>
                </Options>
            </Menu>
            <BorderDiv></BorderDiv>
        </SideBarDiv>
    )
}

export default SideBar
