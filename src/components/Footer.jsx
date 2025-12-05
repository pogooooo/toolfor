import styled from "styled-components";

const FooterDiv = styled.div`
    height: 40px;
    background-color: #1e1e28;
    color: #dcdce6;

    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    border-top: 2px solid rgba(220, 220, 230, 0.1);
`;

const Footer = () => {

    return(
        <FooterDiv>
            Contact Us : nowu3384@gmail.com
        </FooterDiv>
    )
}

export default Footer
