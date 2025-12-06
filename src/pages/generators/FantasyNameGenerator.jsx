import PropTypes from "prop-types";
import {useEffect, useState} from "react";
import {
    Generator, GeneratorFrame, InputFrame, TopDiv, BottomDiv, InputTitle,
    StyledInputContainer, StyledInput, Tooltip, DropDownWrapper,
    DropDownButton, DropDownMenu, DropDownItem, SubmitButton,
    Output, NameFrame, EngName, KorName
} from "../../styles/FantasyNameStyles.js";
import { useInputHandlers } from "../../utils/NameGeneratorUtils";
import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateNamesWithGemini = async (gender, minLength, maxLength, count) => {

    const prompt = `
        You are an expert fantasy world builder. Your task is to generate ${count} unique fantasy names.
    
        # Constraints
        1.  **Length:** The final name length must be strictly between ${minLength} and ${maxLength} characters.
        2.  **Gender:** The names must be suitable for ${gender === '남녀' ? 'any gender or a mix of genders' : gender === '남' ? 'male' : 'female'} characters.
        3.  **Uniqueness & Diversity:** Ensure maximum creativity and variety. Avoid generating names with similar root words, common syllables, or simple suffixes/prefixes (e.g., avoid listing 'Aeridor', 'Baeldor', 'Caeldor'). Reflect a wide range of fantasy races and cultures (e.g., Elven, Dwarven, Draconic, Orcish, Human, Celestial).
        4.  **Novelty:** The generated list must not reuse any names from previous outputs or known common fantasy names (e.g., Gandalf, Aragorn). Each name must be original and distinct.
        
        # Output Format
        Output the results strictly as a single JSON array (no markdown, no extra text), where each element is an object with two keys: 
        "eng" for the unique English fantasy name and "kor" for the estimated Korean pronunciation.
        
        Example: [{"eng": "Aetherion", "kor": "아이서리언"}, {"eng": "Kaelen", "kor": "케일런"}]
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

    const minSyllableHandlers = useInputHandlers(setMinSyllable, 3, 20, 3);
    const maxSyllableHandlers = useInputHandlers(setMaxSyllable, 3, 20, 3);
    const countHandlers = useInputHandlers(setCount, 10, 50, 10);

    const toggleDropdownGender = () => setSelectGender((prev) => !prev);

    const handleGender = (item) => {
        setSelectGender(false)
        setGender(item)
    }

    const handleGenerateName = async () => {
        if (isLoading) return;

        const finalMinSyllable = minSyllableHandlers.handleUpdate(minSyllable);
        const finalMaxSyllable = maxSyllableHandlers.handleUpdate(maxSyllable);
        const finalCount = countHandlers.handleUpdate(count);

        setMinSyllable(finalMinSyllable);
        setMaxSyllable(finalMaxSyllable);
        setCount(finalCount);

        if (finalMinSyllable > finalMaxSyllable) {
            alert("최소 음절보다 최대 음절 수가 적을 수 없습니다.");
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
    };

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
                            <div onClick={() => countHandlers.handleUpdate(count + 1)}>▲</div>
                            <StyledInput
                                id="count-input"
                                type="text"
                                value={count}
                                onChange={countHandlers.handleInput}
                                onWheel={countHandlers.handleWheel}
                            />
                            <div onClick={() => countHandlers.handleUpdate(count - 1)}>▼</div>
                            <Tooltip className="tooltip">1에서 50 사이의 숫자를 입력하세요. 마우스 휠로 숫자를 변경할 수 있습니다.</Tooltip>
                        </StyledInputContainer>

                        <SubmitButton onClick={handleGenerateName} disabled={isLoading}>{isLoading ? "로딩" : "생성"}</SubmitButton>
                    </TopDiv>

                    <BottomDiv>
                        <InputTitle>최소 음절 수</InputTitle>
                        <StyledInputContainer>
                            <div onClick={() => countHandlers.handleUpdate(count + 1)}>▲</div>
                            <StyledInput
                                id="number-input"
                                type="text"
                                value={minSyllable}
                                onChange={countHandlers.handleInput}
                                onWheel={countHandlers.handleWheel}
                            />
                            <div onClick={() => countHandlers.handleUpdate(count - 1)}>▼</div>
                            <Tooltip className="tooltip">3에서 20 사이의 숫자를 입력하세요. 마우스 휠로 숫자를 변경할 수 있습니다.</Tooltip>
                        </StyledInputContainer>

                        <InputTitle>최대 음절 수</InputTitle>
                        <StyledInputContainer>
                            <div onClick={() => countHandlers.handleUpdate(count + 1)}>▲</div>
                            <StyledInput
                                id="number-input"
                                type="text"
                                value={maxSyllable}
                                onChange={countHandlers.handleInput}
                                onWheel={countHandlers.handleWheel}
                            />
                            <div onClick={() => countHandlers.handleUpdate(count - 1)}>▼</div>
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
    updateHeaderInfo: PropTypes.func.isRequired,
};

export default FantasyNameGenerator
