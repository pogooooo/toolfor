import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styled from "styled-components";
import name from '../../../assets/fantasyName.json'

const Generator = styled.div`
    width: 80vw;
    min-width: 300px;
    min-height: 150px;
    box-sizing: border-box;

    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10vh 0 0 0;
`

const GeneratorFrame = styled.div`
    background-color: rgba(220, 220, 230, 1);
    padding: 1rem;
    border-radius: 10px;
    height: 60vh;
`

const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    flex-wrap: wrap;
    padding-left: 3vw;
    width: 600px;
`

const TopDiv = styled.div`
    display: flex;
    margin-bottom: 10px;
`

const BottomDiv = styled.div`
    display: flex;
`

const InputTitle = styled.div`
    padding: 0.3rem;
    font-weight: bold;
    font-size: 1.2rem;
    cursor: default;
    user-select: none;
`

const StyledInputContainer = styled.div`
    position: relative;
    margin-right: 3vw;
    border: 2px solid rgba(30, 30, 40, 1);
    padding: 0 0.5vw 0 0.5vw;
    display: flex;
    cursor: pointer;
    user-select: none;
    font-size: 1.2rem;
    height: 32px;
    width: 62px;
`

const StyledInput = styled.input`
    background-color: rgba(220, 220, 230, 1);
    border: none;
    text-align: center;
    width: 20px;
    font-size: 1rem;
    height: 90%;

    &:hover + .tooltip {
        display: block;
    }

    &:focus{
        outline: none;
    }
`

const Tooltip = styled.div`
    display: none;
    position: absolute;
    top: -2.5rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: rgba(30, 30, 40, 0.8);
    color: white;
    padding: 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    z-index: 10;
`

const DropDownWrapper = styled.div`
    position: relative;
    display: inline-block;
    margin-right: 3rem;
    user-select: none;
`

const DropDownButton = styled.div`
    border: 2px solid rgba(30, 30, 40, 1);
    padding: 0.3rem;
    cursor: pointer;
    width: 60px;
    height: 22px;
    font-weight: bold;

    &:hover {
        background-color: rgb(190, 190, 200);
    }
`

const DropDownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 15%;
    z-index: 10;
`

const DropDownItem = styled.div`
    cursor: pointer;
    background-color: rgba(220, 220, 230, 1);
    border: 1px solid rgba(30, 30, 40, 1);
    padding: 0.3rem;
    width: 100%;

    &:hover {
        background-color: rgb(190, 190, 200);
    }
`

const SubmitButton = styled.button`
    background-color: rgba(220, 220, 230, 1);
    border: 2px solid #1e1e28;
    cursor: pointer;
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 2vw;
    height: 36px;
    width: 62px;

    &:hover {
        background-color: rgb(190, 190, 200);
    }

    &:active {
        background-color: rgb(140, 140, 150);
    }
`

const Output = styled.div`
    width: 100%;
    background-color: #1e1e28;
    color: rgba(220, 220, 230, 1);
    margin-top: 10px;

    max-height: 80%;
    overflow-y: auto;
    
    @media (max-height: 700px) {
        max-height: 75%;        
    }
    
    @media (max-height: 550px){
        max-height: 70%;
    }
    
    @media (max-height: 450px) {
        max-height: 65%;
        
    }
`

const NameFrame = styled.div`

`

const EngName = styled.div``

const KorName = styled.div``

const FantasyNameGenerator = ({ updateHeaderInfo }) => {

    const [frameHeight, setFrameHeight] = useState("");

    const [selectGender, setSelectGender] = useState(false) //modal open by whether
    const [gender, setGender] = useState("남녀") //gender option
    const [minSyllable, setMinSyllable] = useState(3)
    const [maxSyllable, setMaxSyllable] = useState(3)
    const [count, setCount] = useState(10)
    const [result, setResult] = useState([{"eng":"null"}])

    useEffect(() => {
        updateHeaderInfo("판타지 이름 생성기")

    }, [updateHeaderInfo]);

    const toggleDropdownGender = () => setSelectGender((prev) => !prev);

    const handleGender = (item) => {
        setSelectGender(false)
        setGender(item)
    }

    const handleMinSyllable = (e) => {
        const inputValue = e.target.value
        if (/^[\d\s]*$/.test(inputValue)){
            const numericValue = parseInt(inputValue.trim(), 10)
            setMinSyllable(numericValue)
            if(isNaN(numericValue)){
                setMinSyllable("")
            }
            if(numericValue > 20){
                setMinSyllable(20)
            }
            if(numericValue < 3) {
                setMinSyllable(3)
            }
        }
    }

    const handleMinSyllableUpdate = (value) => {
        if (value >= 3 && value <= 20) {
            setMinSyllable(value); // 1에서 8 사이 값만 허용
        } else if (value > 20) {
            setMinSyllable(20); // 최대값은 8
        } else {
            setMinSyllable(3); // 최소값은 1
        }
    };

    const handleMaxSyllable = (e) => {
        const inputValue = e.target.value
        if (/^[\d\s]*$/.test(inputValue)){
            const numericValue = parseInt(inputValue.trim(), 10)
            setMaxSyllable(numericValue)
            if(isNaN(numericValue)){
                setMaxSyllable("")
            }
            if(numericValue > 20){
                setMaxSyllable(20)
            }
            if(numericValue < 3) {
                setMaxSyllable(3)
            }
        }
    }

    const handleMaxSyllableUpdate = (value) => {
        if (value >= 3 && value <= 20) {
            setMaxSyllable(value); // 1에서 8 사이 값만 허용
        } else if (value > 20) {
            setMaxSyllable(20); // 최대값은 8
        } else {
            setMaxSyllable(3); // 최소값은 1
        }
    };

    const handleCount = (e) => {
        const inputValue = e.target.value;
        if (/^[\d\s]*$/.test(inputValue)) { // Allow only numeric values
            const numericValue = parseInt(inputValue.trim(), 10);
            if (isNaN(numericValue)) {
                setCount(""); // Clamp between 1 and 50
            } else if(numericValue > 50) {
                setCount(50);
            }
            else if(numericValue < 10){
                setCount(10)
            }
            else{
                setCount(numericValue)
            }
        }
    }

    const handleCountUpdate = (value) => {
        if (value >= 10 && value <= 50) {
            setCount(value); // 1에서 8 사이 값만 허용
        } else if (value > 50) {
            setCount(50); // 최대값은 8
        } else {
            setCount(10); // 최소값은 1
        }
    }

    const handleMinSyllableWheel = (e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setMinSyllable((prev) => {
            const newValue = Math.max(3, Math.min(20, prev + delta));
            return newValue;
        });
    };

    const handleMaxSyllableWheel = (e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setMaxSyllable((prev) => {
            const newValue = Math.max(3, Math.min(20, prev + delta));
            return newValue;
        });
    };

    const handleCountWheel = (e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setCount((prev) => {
            const newValue = Math.max(10, Math.min(50, prev + delta));
            return newValue;
        });
    };

    const getRandomNames = (array, count) => {
        const shuffled = [...array].sort(() => Math.random() - 0.5); // 배열을 섞음
        return shuffled.slice(0, count); // 상위 count개 반환
    };

    const handleGenerateName = () => {
        setFrameHeight("600px");

        if (minSyllable == ""){setMinSyllable(3)}
        if(maxSyllable == ""){setMaxSyllable(3)}
        if(count == ""){setCount(10)}

        if(minSyllable > maxSyllable){
            alert("최소 음절보다 최대 음절 수가 적을 수 없습니다.")
            return false;
        }

        let nameList = []
        for(let i = minSyllable; i <= maxSyllable; i++) {
            const syllable = i.toString()
            nameList = [...nameList, ...Object.values(name.female[syllable])]
        }

        const RandomNameList = getRandomNames(nameList, count)
        console.log("names: ", RandomNameList)
        setResult(RandomNameList)
        console.log("result:", result)
    }

    return(
        <Generator>
            <GeneratorFrame frameHeight={frameHeight}>
                <InputFrame>
                    <TopDiv>
                        <InputTitle>성별</InputTitle>
                        <DropDownWrapper>
                            <DropDownButton onClick={toggleDropdownGender}>▼ {gender || "남녀"}</DropDownButton>
                            {selectGender && (
                                <DropDownMenu>
                                    <DropDownItem onClick={() => handleGender("남녀")}>남녀</DropDownItem>
                                    <DropDownItem onClick={() => handleGender("남")}>남</DropDownItem>
                                    <DropDownItem onClick={() => handleGender("여")}>여</DropDownItem>
                                </DropDownMenu>
                            )}
                        </DropDownWrapper>

                        <InputTitle>생성 수</InputTitle>
                        <StyledInputContainer>
                            <div onClick={() => handleCountUpdate(count+1)}>▲</div>
                            <StyledInput
                                id="count-input"
                                type="text"
                                value={count}
                                onChange={handleCount}
                                onWheel={handleCountWheel}
                            />
                            <div onClick={() => handleCountUpdate(count-1)}>▼</div>
                            <Tooltip className="tooltip">1에서 50 사이의 숫자를 입력하세요. 마우스 휠로 숫자를 변경할 수 있습니다.</Tooltip>
                        </StyledInputContainer>

                        <SubmitButton onClick={handleGenerateName}>생성</SubmitButton>
                    </TopDiv>

                    <BottomDiv>
                        <InputTitle>최소 음절 수</InputTitle>
                        <StyledInputContainer>
                            <div onClick={() => handleMinSyllableUpdate(minSyllable+1)}>▲</div>
                            <StyledInput
                                id="number-input"
                                type="text"
                                value={minSyllable}
                                onChange={handleMinSyllable}
                                onWheel={handleMinSyllableWheel}
                            />
                            <div onClick={() => handleMinSyllableUpdate(minSyllable-1)}>▼</div>
                            <Tooltip className="tooltip">3에서 20 사이의 숫자를 입력하세요. 마우스 휠로 숫자를 변경할 수 있습니다.</Tooltip>
                        </StyledInputContainer>

                        <InputTitle>최대 음절 수</InputTitle>
                        <StyledInputContainer>
                            <div onClick={() => handleMaxSyllableUpdate(maxSyllable+1)}>▲</div>
                            <StyledInput
                                id="number-input"
                                type="text"
                                value={maxSyllable}
                                onChange={handleMaxSyllable}
                                onWheel={handleMaxSyllableWheel}
                            />
                            <div onClick={() => handleMaxSyllableUpdate(maxSyllable-1)}>▼</div>
                            <Tooltip className="tooltip">3에서 20 사이의 숫자를 입력하세요. 마우스 휠로 숫자를 변경할 수 있습니다.</Tooltip>
                        </StyledInputContainer>
                    </BottomDiv>

                </InputFrame>

                <Output>
                    {!(result[0]["eng"] === "null") &&
                        result.map((item, index) => (
                            <NameFrame key={index}>
                                <EngName>{item["eng"]}</EngName>
                                <KorName>{item["kor"]}</KorName>
                            </NameFrame>
                        ))
                    }
                </Output>
            </GeneratorFrame>
        </Generator>
    )
}

FantasyNameGenerator.propTypes = {
    updateHeaderInfo: PropTypes.func.isRequired, // 함수 타입이며 필수 속성
};

export default FantasyNameGenerator
