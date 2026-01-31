import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import {
    Generator, GeneratorFrame, InputFrame, TopDiv, BottomDiv, InputTitle,
    StyledInputContainer, StyledInput, Tooltip, DropDownWrapper,
    DropDownButton, DropDownMenu, DropDownItem, SubmitButton,
    Output, NameFrame, EngName, KorName
} from "../../styles/FantasyNameStyles.js";
import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: API_KEY });

const generateNamesWithGemini = async (gender, minLength, maxLength, count) => {
    const prompt = `
        You are an expert fantasy world builder. Your task is to generate ${count} unique fantasy names.
    
        # Constraints
        1.  **Length:** The final name length must be strictly between ${minLength} and ${maxLength} characters.
        2.  **Gender:** The names must be suitable for ${gender === '남녀' ? 'any gender or a mix of genders' : gender === '남' ? 'male' : 'female'} characters.
        3.  **Uniqueness & Diversity:** Ensure maximum creativity and variety. Avoid generating names with similar root words, common syllables, or simple suffixes/prefixes. Reflect a wide range of fantasy races and cultures.
        4.  **Novelty:** The generated list must not reuse any names from previous outputs or known common fantasy names. Each name must be original and distinct.
        
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

    } catch (err) {
        return err;
    }
};

const FantasyNameGenerator = ({ updateHeaderInfo }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [gender, setGender] = useState("남녀");

    const [minLen, setMinLen] = useState(3);
    const [maxLen, setMaxLen] = useState(3);
    const [count, setCount] = useState(10);

    const [result, setResult] = useState([{ "eng": "null" }]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        updateHeaderInfo("판타지 이름 생성기");
    }, [updateHeaderInfo]);

    const handleGenderSelect = (selectedGender) => {
        setGender(selectedGender);
        setIsDropdownOpen(false);
    };

    const validateAndSet = (setter, value, min, max) => {
        let num = parseInt(value, 10);
        if (isNaN(num)) return;
        if (num < min) num = min;
        if (num > max) num = max;
        setter(num);
    };

    const handleWheel = (setter, value, min, max) => (e) => {
        e.target.blur();
        const delta = e.deltaY < 0 ? 1 : -1;
        validateAndSet(setter, value + delta, min, max);
    };

    const handleInputChange = (setter, min, max) => (e) => {
        const val = e.target.value;
        if (val === "") {
            setter("");
            return;
        }
        validateAndSet(setter, val, min, max);
    };

    const adjustValue = (setter, current, amount, min, max) => {
        validateAndSet(setter, current + amount, min, max);
    };

    const handleGenerateName = async () => {
        if (isLoading) return;

        if (minLen > maxLen) {
            alert("최소 글자 수가 최대 글자 수보다 클 수 없습니다.");
            return;
        }

        setIsLoading(true);
        setResult([{ "eng": "이름 생성 중...", "kor": "잠시만 기다려주세요." }]);

        try {
            const generatedNames = await generateNamesWithGemini(gender, minLen, maxLen, count);
            if (generatedNames && generatedNames.length > 0) {
                setResult(generatedNames);
            } else {
                setResult([{ "eng": "생성 실패", "kor": "다시 시도해주세요." }]);
            }
        } catch (error) {
            setResult([{ "eng": "오류 발생", "kor": "네트워크 상태를 확인해주세요." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderNumberInput = (value, setter, min, max, tooltipText) => (
        <StyledInputContainer>
            <div onClick={() => adjustValue(setter, value, 1, min, max)}>▲</div>
            <StyledInput
                type="text"
                value={value}
                onChange={handleInputChange(setter, min, max)}
                onWheel={handleWheel(setter, value, min, max)}
            />
            <div onClick={() => adjustValue(setter, value, -1, min, max)}>▼</div>
            <Tooltip className="tooltip">{tooltipText}</Tooltip>
        </StyledInputContainer>
    );

    return (
        <Generator>
            <GeneratorFrame>
                <InputFrame>
                    <TopDiv>
                        <InputTitle>성별</InputTitle>
                        <DropDownWrapper>
                            <DropDownButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                ▼ {gender}
                            </DropDownButton>
                            {isDropdownOpen && (
                                <DropDownMenu>
                                    {["남녀", "남", "여"].map((g) => (
                                        <DropDownItem key={g} onClick={() => handleGenderSelect(g)}>
                                            {g}
                                        </DropDownItem>
                                    ))}
                                </DropDownMenu>
                            )}
                        </DropDownWrapper>

                        <InputTitle>생성 수</InputTitle>
                        {renderNumberInput(count, setCount, 1, 50, "1~50 사이의 숫자")}

                        <SubmitButton onClick={handleGenerateName} disabled={isLoading}>
                            {isLoading ? "로딩" : "생성"}
                        </SubmitButton>
                    </TopDiv>

                    <BottomDiv>
                        <InputTitle>최소 글자 수</InputTitle>
                        {renderNumberInput(minLen, setMinLen, 3, 20, "3~20 사이의 숫자")}

                        <InputTitle>최대 글자 수</InputTitle>
                        {renderNumberInput(maxLen, setMaxLen, 3, 20, "3~20 사이의 숫자")}
                    </BottomDiv>
                </InputFrame>

                <Output>
                    {result[0].eng !== "null" && result.map((item, index) => (
                        <NameFrame key={index}>
                            <EngName>{item.eng}</EngName>
                            <KorName>{item.kor}</KorName>
                        </NameFrame>
                    ))}
                </Output>
            </GeneratorFrame>
        </Generator>
    );
};

FantasyNameGenerator.propTypes = {
    updateHeaderInfo: PropTypes.func.isRequired,
};

export default FantasyNameGenerator;
