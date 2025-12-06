import {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Main = styled.div`
    width: 70vw;
    box-sizing: border-box;
    height: calc(100vh - 8vh - 40px);
    background-color: rgba(30, 30, 40, 1);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center
`;

const Menu = styled.div`
    width: 40vw;
    min-width: 400px;
    background-color: #2a2a3a;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
    padding: 20px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    color: #dcdce6;
    border-radius: 4px;
    font-size: 1.5rem;
    font-weight: bold;
    padding: 0.5rem;
    margin-bottom: 15px;
    cursor: default;
`;

const Option = styled(Link)`
    color: rgba(220, 220, 230, 0.8);
    text-decoration: none;
    font-size: 1.2rem;
    font-weight: 500;
    padding: 10px 15px;
    margin: 5px 0;
    border-radius: 4px;
    transition: background-color 0.2s, color 0.2s;

    &:hover{
        color: #dcdce6;
        background-color: #444455;
    }
`;

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
    updateHeaderInfo: PropTypes.func.isRequired,
};

export default ToolFor
