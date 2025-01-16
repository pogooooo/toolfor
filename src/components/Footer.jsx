import styled from "styled-components";

const FooterDiv = styled.div`
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #dcdce6;
    
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
`

const Footer = () => {

    return(
        <FooterDiv>
            Contact Us : nowu3384@gmail.com
        </FooterDiv>
    )
}

export default Footer
