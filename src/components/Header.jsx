import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderDiv = styled.div`
    background-color: rgba(30, 30, 40, 1);
    color: #dcdce6;
    font-size: 1rem;
    font-weight: bold;

    box-sizing: border-box;

    display: flex;
    align-items: center;
    height: 8vh;
`

const TitleDiv = styled.div`
    display: flex;

    & > div {
        text-decoration: none;
        color: #dcdce6;
        margin-right: 1vw;
        font-size: 1.5rem;
    }
`

const Title = styled(Link)`
    text-decoration: none;
    color: #dcdce6;
    margin-right: 1vw;
    font-size: 1.5rem;
`

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
