import {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.div`
    width: 70vw;
    box-sizing: border-box;
    
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10vh 0 0 0;
`

const Menu = styled.div`
    width: 40vw;
    border: rgba(224, 222, 233, 1) solid 5px;
    display: flex;
    flex-direction: column;
`

const Title = styled.div`
    color: rgba(36, 34, 44, 1);
    background-color: rgba(224, 222, 233, 1);
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
    cursor: default;
`

const Option = styled(Link)`
    color: rgba(224, 222, 233, 0.7);
    text-decoration: none;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 0.5rem;
    
    &:hover{
        color: rgba(224, 222, 233, 1);
    }
`

const ToolFor = ({ updateHeaderInfo }) => {

    useEffect(() => {
        updateHeaderInfo("")
    }, [updateHeaderInfo]);

    return(
        <Main>
            <Menu>
                <Title>생성기</Title>
                <Option to="./fantasyNameGenerator">판타지 이름 생성기</Option>
            </Menu>
        </Main>
    )
}

ToolFor.propTypes = {
    updateHeaderInfo: PropTypes.func.isRequired, // 함수 타입이며 필수 속성
};

export default ToolFor
