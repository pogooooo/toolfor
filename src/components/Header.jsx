import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Colors } from "../styles/Colors.jsx";

const HeaderDiv = styled.div`
    background-color: ${Colors.background};
    box-sizing: border-box;

    display: flex;
    align-items: center;
    justify-content: space-between;

    height: 70px; /* vh보다는 고정 픽셀이 더 깔끔한 라인을 만듭니다 */
    padding: 0 40px;

    border-bottom: 1px solid ${Colors.optionBG};
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2); /* 은은한 그림자 추가 */
    z-index: 100;
`;

const TitleDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px; /* 간격을 조금 더 넓게 */

    /* headerInfo (서브 텍스트) 스타일링 */
    & > div {
        color: ${Colors.text};
        font-size: 1rem;
        font-weight: 400;
        opacity: 0.6; /* 타이틀보다 흐리게 처리하여 계층 구분 */
        padding-left: 20px;
        border-left: 1px solid ${Colors.optionBG}; /* 구분선 효과 */
        line-height: 1;
    }
`;

const Title = styled(Link)`
    text-decoration: none;
    color: ${Colors.text};
    font-size: 1.5rem;
    font-weight: 800;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: ${Colors.accent};
    }
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
