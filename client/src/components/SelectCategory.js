import React from "react";

export default function SelectCategory({setCategory }) {
    const handleChangeSelect = (e) => {
        setCategory(e.target.value);
    };
    return (
        <select defaultValue={"DEFAULT"} onChange={handleChangeSelect}>
            <option value="DEFAULT" disabled>
        Choose a salutation ...
            </option>
            <option value="news-world">News world</option>
            <option value="business">Business</option>
            <option value="sports">Sports</option>
            <option value="health">Health</option>
            <option value="travel">Traveling</option>
            <option value="style">Style</option>
        </select>
    );
}
