import {useEffect} from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {Colors} from "../styles/Colors.jsx";

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


const Main = styled.div`
    height: 100%;
    background-color: ${Colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Menu = styled.div`
    display: flex;
    flex-direction: column;
    background-color: ${Colors.optionBG};
    width: 600px;
    padding: 50px;
    border-radius: 10px;
`;

const Title = styled.div`
    font-size: 24px;
    font-weight: bold;
    color: ${Colors.text};
    margin-bottom: 10px;
    padding-left: 5px;
`;

const Option = styled(Link)`
    display: block;
    padding: 18px 25px;
    background-color: ${Colors.background};
    color: ${Colors.text};
    text-decoration: none;
    border-radius: 8px;
    font-size: 18px;
    font-weight: 500;
    transition: all 0.5s ease-in-out;

    &:hover {
        box-shadow: 0 4px 10px ${Colors.accent};
    }
`;
