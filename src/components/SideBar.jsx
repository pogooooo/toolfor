import styled from "styled-components";
import { Link } from "react-router-dom";
import {Colors} from "../styles/Colors.jsx";

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

const SideBarDiv = styled.div`
    width: 250px; /* 15vw보다 고정 px가 사이드바 레이아웃 유지에 유리합니다 */
    height: 100vh; /* 헤더 높이(70px)를 제외한 나머지 높이 */
    background-color: ${Colors.background};
    box-sizing: border-box;
    padding: 40px 0; 

    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-right: 1px solid ${Colors.optionBG};
`;

const Menu = styled.div`
    width: 85%;
    margin-bottom: 2rem;
    padding: 0 10px;
    box-sizing: border-box;
`;

const Title = styled.div`
    color: ${Colors.text};
    font-size: 1.1rem;
    font-weight: 700;
    cursor: default;
    padding-bottom: 8px;
    padding-left: 5px;
    opacity: 0.9;
`;

const Hr = styled.hr`
    background-color: ${Colors.optionBG};
    border: none;
    height: 2px;
    width: 100%;
    margin: 0 0 15px 0;
    border-radius: 1px;
`;

const Options = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px; /* 항목 사이 간격 */
`;

const Option = styled(Link)`
    text-decoration: none;
    color: ${Colors.text};
    font-size: 1rem;
    font-weight: 400;
    padding: 10px 15px;
    border-radius: 8px; /* 둥근 모서리 */
    transition: all 0.2s ease;
    opacity: 0.7;

    &:hover {
        opacity: 1;
        background-color: ${Colors.optionBG}; /* 호버 시 배경색 추가 */
        color: #ffffff;
        transform: translateX(3px); /* 살짝 오른쪽으로 이동 */
    }
`;
