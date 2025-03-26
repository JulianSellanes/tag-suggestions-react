import { useState } from "react";
import { SearchTagsDiv } from "./components/SearchTagsDiv";

export const App = () => {
    const suggestions = ["Apple", "AppLe", "Aa a", "A c b", "Banana", "B", "Cherry", "Grape", "Orange", "Peach", "Pear", "Donald Trump", "Joe Biden", "Lol", "Test test", "Lorem ipsum dolor sit amet consectetur", "Lorem ipsum dolor sit amet consectetu dawd dwadwad dwada ece ewwedwedwd edfwewed ewdwedwed wdr"];
    const [tags, setTags] = useState([]);

    const handleSelect = suggestion => {
        setTags([...tags, suggestion]);
    };

    const removeTag = index => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return(
        <>
        <section>

        <h1>Search Tags</h1>

        <SearchTagsDiv suggestions={suggestions} onSelect={handleSelect}></SearchTagsDiv>

        <div className="container">
        {
            tags.map((tag, index) => (
                <label key={index} onClick={() => removeTag(index)} className="item">{tag}</label>
            ))
        }
        </div>

        </section>
        </>
    )
}