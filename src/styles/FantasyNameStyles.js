import styled from "styled-components";

export const Generator = styled.div`
    width: 85vw;
    min-width: 300px;
    box-sizing: border-box;
    height: calc(100vh - 8vh - 40px);

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5vh 0;
    background-color: rgba(30, 30, 40, 1);
`

export const GeneratorFrame = styled.div`
    background-color: #2a2a3a;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    width: 90%;
    max-width: 800px;
    height: auto;
    min-height: 70vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 650px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(220, 220, 230, 0.2);
`

export const TopDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 20px;
`

export const BottomDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

export const InputTitle = styled.div`
    padding: 0.3rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: #dcdce6;
    cursor: default;
    user-select: none;
    white-space: nowrap;
`

export const StyledInputContainer = styled.div`
    position: relative;
    border: 2px solid #5a5a6a;
    background-color: #1e1e28;
    color: #dcdce6;
    padding: 0 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    font-size: 1rem;
    height: 36px;
    width: 70px;
    border-radius: 4px;
`

export const StyledInput = styled.input`
    background-color: transparent;
    border: none;
    text-align: center;
    width: 30px;
    font-size: 1.1rem;
    color: #dcdce6;
    height: 100%;
    box-sizing: border-box;

    &:focus{
        outline: none;
    }
`

export const Tooltip = styled.div`
    display: none;
    position: absolute;
    top: -3rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(0, 0, 0, 0.9);
    color: white;
    padding: 0.5rem 0.8rem;
    border-radius: 4px;
    font-size: 0.9rem;
    white-space: nowrap;
    z-index: 10;
    pointer-events: none;

    ${StyledInputContainer}:hover & {
        display: block;
    }
`

export const DropDownWrapper = styled.div`
    position: relative;
    display: inline-block;
    user-select: none;
`

export const DropDownButton = styled.div`
    border: 2px solid #5a5a6a;
    background-color: #1e1e28;
    color: #dcdce6;
    padding: 0.3rem 0.8rem;
    cursor: pointer;
    width: 80px;
    height: 36px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 4px;
    box-sizing: border-box;

    &:hover {
        background-color: #333344;
    }
`

export const DropDownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
    z-index: 10;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
`

export const DropDownItem = styled.div`
    cursor: pointer;
    background-color: #2a2a3a;
    color: #dcdce6;
    border: 1px solid #5a5a6a;
    border-top: none;
    padding: 0.5rem;
    width: 100%;
    box-sizing: border-box;

    &:first-child {
        border-top: 1px solid #5a5a6a;
    }

    &:hover {
        background-color: #333344;
    }
`

export const SubmitButton = styled.button`
    background-color: #5a5a6a;
    border: none;
    color: #dcdce6;
    cursor: pointer;
    font-size: 1.1rem;
    font-weight: bold;
    height: 36px;
    width: 80px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
        background-color: #6e6e80;
    }

    &:active {
        background-color: #4c4c5c;
    }
`

export const Output = styled.div`
    width: 100%;
    max-width: 650px;
    background-color: #1e1e28;
    color: #dcdce6;
    margin-top: 20px;
    padding: 15px;
    border-radius: 8px;
    border: 1px solid rgba(220, 220, 230, 0.2);

    max-height: 40vh;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
        width: 8px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #5a5a6a;
        border-radius: 4px;
    }
    &::-webkit-scrollbar-track {
        background: #1e1e28;
    }
`

export const NameFrame = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(220, 220, 230, 0.2);

    &:last-child {
        border-bottom: none;
    }
`

export const EngName = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    color: #90ee90;
`

export const KorName = styled.div`
    font-size: 1rem;
    color: #add8e6;
`
