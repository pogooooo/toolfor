import styled from "styled-components";
import { Link } from "react-router-dom";

const SideBarDiv = styled.div`
    width: 15vw;
    height: calc(100vh - 8vh - 40px); /* Adjust height based on Header/Footer */
    background-color: rgba(30, 30, 40, 1); /* Dark Slate Gray */
    box-sizing: border-box;
    padding: 30px 0; /* Top/Bottom padding */

    display: flex;
    align-items: center;
    justify-content: flex-start; /* Align menu to the top */
    flex-direction: column;
    border-right: 1px solid rgba(220, 220, 230, 0.2); /* Clean vertical divider */
`;

const Menu = styled.div`
    width: 80%;
    margin-bottom: 2rem;
    padding: 0 10px;
`;

const Title = styled.div`
    color: #dcdce6;
    font-size: 1.4rem;
    font-weight: bold;
    cursor: default;
    padding-bottom: 5px;
`;

const Hr = styled.hr`
    background-color: rgba(220, 220, 230, 0.4);
    border: none;
    height: 1px;
    width: 100%;
    margin: 5px 0 15px 0;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
`;

const Option = styled(Link)`
    text-decoration: none;
    color: rgba(220, 220, 230, 0.8);
    font-size: 1.1rem;
    font-weight: 500;
    padding: 5px 0;
    margin-bottom: 5px;
    transition: color 0.2s, padding-left 0.2s;

    &:hover{
        color: #dcdce6;
        padding-left: 5px;
    }
`;

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
        </SideBarDiv>
    )
}

export default SideBar
