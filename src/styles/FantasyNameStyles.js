import styled from "styled-components";
import { Colors } from "./Colors"; // Colors 파일 경로에 맞게 수정 필요

export const Generator = styled.div`
    width: 100%;
    height: calc(100vh - 70px); /* 헤더 높이 제외 */
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding-top: 50px;
    background-color: ${Colors.background};
    color: ${Colors.text};
    overflow-y: auto;
`;

export const GeneratorFrame = styled.div`
    background-color: ${Colors.optionBG};
    padding: 40px;
    border-radius: 16px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    width: 90%;
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid rgba(255, 255, 255, 0.05);
`;

export const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    gap: 20px;
    padding-bottom: 30px;
    border-bottom: 2px dashed rgba(0, 0, 0, 0.2);
`;

export const TopDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

export const BottomDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    width: 100%;
`;

export const InputTitle = styled.div`
    font-weight: 600;
    font-size: 1rem;
    color: ${Colors.text};
    opacity: 0.8;
    margin-right: -10px; /* 라벨과 인풋 사이 간격 조절 */
    white-space: nowrap;
`;

export const StyledInputContainer = styled.div`
    position: relative;
    background-color: ${Colors.background};
    border: 1px solid transparent;
    color: ${Colors.text};
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 42px;
    width: 90px;
    border-radius: 8px;
    padding: 0 5px;
    transition: all 0.2s;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);

    &:hover {
        border-color: ${Colors.accent};
    }

    /* 화살표 버튼 스타일링 */
    & > div {
        cursor: pointer;
        font-size: 0.8rem;
        color: ${Colors.accent};
        padding: 5px;
        user-select: none;

        &:hover {
            color: #fff;
        }
    }
`;

export const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    text-align: center;
    width: 40px;
    font-size: 1.1rem;
    font-weight: bold;
    color: ${Colors.text};
    height: 100%;

    &:focus {
        outline: none;
    }
`;

export const Tooltip = styled.div`
    display: none;
    position: absolute;
    bottom: 110%; /* 위쪽으로 띄움 */
    left: 50%;
    transform: translateX(-50%);
    background-color: ${Colors.accent};
    color: #fff;
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 100;
    box-shadow: 0 4px 10px rgba(0,0,0,0.3);
    pointer-events: none;

    /* 말풍선 꼬리 */
    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 50%;
        margin-left: -5px;
        border-width: 5px;
        border-style: solid;
        border-color: ${Colors.accent} transparent transparent transparent;
    }

    ${StyledInputContainer}:hover & {
        display: block;
        animation: fadeIn 0.2s ease-in-out;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, 5px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
`;

export const DropDownWrapper = styled.div`
    position: relative;
    display: inline-block;
    user-select: none;
`;

export const DropDownButton = styled.div`
    background-color: ${Colors.background};
    color: ${Colors.text};
    padding: 0 15px;
    cursor: pointer;
    width: 90px;
    height: 42px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 8px;
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
    transition: all 0.2s;
    border: 1px solid transparent;

    &:hover {
        border-color: ${Colors.accent};
    }
`;

export const DropDownMenu = styled.div`
    position: absolute;
    top: calc(100% + 5px);
    left: 0;
    z-index: 50;
    width: 100%;
    background-color: ${Colors.optionBG};
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0,0,0,0.5);
    border: 1px solid ${Colors.accent};
`;

export const DropDownItem = styled.div`
    cursor: pointer;
    background-color: ${Colors.optionBG};
    color: ${Colors.text};
    padding: 10px 15px;
    font-size: 0.95rem;
    transition: background-color 0.2s;

    &:hover {
        background-color: ${Colors.accent};
        color: #fff;
    }
`;

export const SubmitButton = styled.button`
    background-color: ${Colors.accent};
    border: none;
    color: #ffffff;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    height: 42px;
    padding: 0 25px;
    border-radius: 8px;
    transition: all 0.2s;
    box-shadow: 0 4px 6px rgba(0,0,0,0.2);
    margin-left: 10px;

    &:hover {
        background-color: #8a6e6e; /* accent보다 약간 밝은 색 */
        transform: translateY(-2px);
    }

    &:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    }

    &:disabled {
        background-color: #555;
        cursor: not-allowed;
        transform: none;
    }
`;

export const Output = styled.div`
    width: 100%;
    max-width: 600px;
    background-color: ${Colors.background};
    margin-top: 30px;
    padding: 5px;
    border-radius: 12px;
    box-shadow: inset 0 2px 10px rgba(0,0,0,0.3);

    max-height: 400px;
    overflow-y: auto;

    /* 스크롤바 커스텀 */
    &::-webkit-scrollbar {
        width: 6px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${Colors.accent};
        border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
        background-color: transparent;
        margin: 10px 0;
    }
`;

export const NameFrame = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    transition: background-color 0.2s;

    &:last-child {
        border-bottom: none;
    }

    &:hover {
        background-color: rgba(255, 255, 255, 0.03);
    }
`;

export const EngName = styled.div`
    font-weight: 700;
    font-size: 1.15rem;
    color: #ffffff;
    letter-spacing: 0.5px;
`;

export const KorName = styled.div`
    font-size: 1rem;
    color: ${Colors.text}; /* 한글 이름에 accent 컬러 사용 */
    font-weight: 500;
`;
