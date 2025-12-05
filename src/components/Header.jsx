import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderDiv = styled.div`
    background-color: #1e1e28;
    color: #dcdce6;
    font-weight: bold;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    height: 8vh;
    padding: 0 3vw;
    border-bottom: 2px solid rgba(220, 220, 230, 0.1);
`;

const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;

    & > div {
        color: #8c8c99;
        font-size: 1.2rem;
        font-weight: normal;
    }
`;

const Title = styled(Link)`
    text-decoration: none;
    color: #dcdce6;
    font-size: 1.8rem;
    font-weight: bold;
`;

const Header = ({ headerInfo="" }) => {

    return(
        <HeaderDiv>
            <TitleDiv>
                <Title to="./">TOOL FOR</Title>
                {headerInfo && (
                    <div>{headerInfo}</div>
                )}
            </TitleDiv>
            <div></div>
        </HeaderDiv>
    )
}

Header.propTypes = {
    headerInfo: PropTypes.string, // headerInfo는 문자열이어야 함
};

export default Header
