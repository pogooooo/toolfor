import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import styled from "styled-components";
import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateNamesWithGemini = async (gender, minLength, maxLength, count) => {

    const prompt = `
        Create ${count} unique fantasy names. 
        The name length must be between ${minLength} and ${maxLength} characters. 
        The names should be suitable for ${gender === '남녀' ? 'any gender' : gender === '남' ? 'male' : 'female'} characters in a high fantasy setting.
        
        Output the results strictly as a single JSON array, where each element is an object with two keys: 
        "eng" for the English name and "kor" for the estimated Korean pronunciation. 
        Do not include any extra text, comments, or markdown formatting outside the JSON array.
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        });

        const jsonString = response.text.trim();
        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini API 호출 오류:", error);
        return [];
    }
};

const FantasyNameGenerator = ({ updateHeaderInfo }) => {

    const [selectGender, setSelectGender] = useState(false) //modal open by whether
    const [gender, setGender] = useState("남녀") //gender option
    const [minSyllable, setMinSyllable] = useState(3)
    const [maxSyllable, setMaxSyllable] = useState(3)
    const [count, setCount] = useState(10)
    const [result, setResult] = useState([{"eng":"null"}])
    const [isLoading, setIsLoading] = useState(false);

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
                setMinSyllable(-1)
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
                setMaxSyllable(-1)
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
                setCount(-1); // Clamp between 1 and 50
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
            return Math.max(3, Math.min(20, prev + delta));
        });
    };

    const handleMaxSyllableWheel = (e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setMaxSyllable((prev) => {
            return Math.max(3, Math.min(20, prev + delta));
        });
    };

    const handleCountWheel = (e) => {
        const delta = e.deltaY < 0 ? 1 : -1;
        setCount((prev) => {
            return Math.max(10, Math.min(50, prev + delta));
        });
    };

    const handleGenerateName = async () => {
        if (isLoading) return;

        let finalMinSyllable = minSyllable === -1 ? 3 : minSyllable;
        let finalMaxSyllable = maxSyllable === -1 ? 3 : maxSyllable;
        let finalCount = count === -1 ? 10 : count;

        finalMinSyllable = finalMinSyllable < 3 ? 3 : finalMinSyllable > 20 ? 20 : finalMinSyllable;
        finalMaxSyllable = finalMaxSyllable < 3 ? 3 : finalMaxSyllable > 20 ? 20 : finalMaxSyllable;
        finalCount = finalCount < 10 ? 10 : finalCount > 50 ? 50 : finalCount;

        setMinSyllable(finalMinSyllable);
        setMaxSyllable(finalMaxSyllable);
        setCount(finalCount);

        if (finalMinSyllable > finalMaxSyllable){
            alert("최소 음절보다 최대 음절 수가 적을 수 없습니다.")
            return;
        }

        setIsLoading(true);
        setResult([{ "eng": "이름 생성 중...", "kor": "이름을 만드는 중입니다." }]);

        try {
            const generatedNames = await generateNamesWithGemini(
                gender,
                finalMinSyllable,
                finalMaxSyllable,
                finalCount
            );

            if (generatedNames && generatedNames.length > 0) {
                setResult(generatedNames);
            } else {
                setResult([{ "eng": "생성 실패", "kor": "API 오류 또는 빈 응답" }]);
            }
        } catch (error) {
            console.error("이름 생성 중 치명적인 오류 발생:", error);
            setResult([{ "eng": "오류 발생", "kor": "API 연결 또는 파싱 문제" }]);
        } finally {
            setIsLoading(false);
        }
    }

    return(
        <Generator>
            <GeneratorFrame>
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

const Generator = styled.div`
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

const GeneratorFrame = styled.div`
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

const InputFrame = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 650px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(220, 220, 230, 0.2);
`

const TopDiv = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 20px;
`

const BottomDiv = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`

const InputTitle = styled.div`
    padding: 0.3rem;
    font-weight: bold;
    font-size: 1.1rem;
    color: #dcdce6;
    cursor: default;
    user-select: none;
    white-space: nowrap;
`

const StyledInputContainer = styled.div`
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

const StyledInput = styled.input`
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

const Tooltip = styled.div`
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

const DropDownWrapper = styled.div`
    position: relative;
    display: inline-block;
    user-select: none;
`

const DropDownButton = styled.div`
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

const DropDownMenu = styled.div`
    position: absolute;
    top: 100%;
    left: 0;
    margin-top: 5px;
    z-index: 10;
    width: 100%;
    border-radius: 4px;
    overflow: hidden;
`

const DropDownItem = styled.div`
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

const SubmitButton = styled.button`
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

const Output = styled.div`
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

const NameFrame = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 8px 0;
    border-bottom: 1px dashed rgba(220, 220, 230, 0.2);

    &:last-child {
        border-bottom: none;
    }
`

const EngName = styled.div`
    font-weight: bold;
    font-size: 1.1rem;
    color: #90ee90;
`

const KorName = styled.div`
    font-size: 1rem;
    color: #add8e6;
`

FantasyNameGenerator.propTypes = {
    updateHeaderInfo: PropTypes.func.isRequired,
};

export default FantasyNameGenerator
