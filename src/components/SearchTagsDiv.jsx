import { useState, useRef } from "react";

export const SearchTagsDiv = ({ suggestions, onSelect }) => {
    const [input, setInput] = useState("");
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [highlightIndex, setHighlightIndex] = useState(-1);
    const listRef = useRef([]);

    const handleChange = e => {
        const value = e.target.value;
        setInput(value);
        setHighlightIndex(-1);
        
        if(value)
        {
            //More specific search
            //If you don't type the tag correctly, it won't appear
            //"ple" won't display "Apple"

            /*
            setFilteredSuggestions(suggestions.filter(item => 
                item.toLowerCase().startsWith(value.toLowerCase())
            ));
            */

            //More open search
            //If there is a tag that contains any of the letters you are typing, it will appear
            //"ple" will display "Apple"

            setFilteredSuggestions(suggestions
                .filter(item => item.toLowerCase().includes(value.toLowerCase()))
                .sort((a, b) => a.indexOf(value) - b.indexOf(value))
            );
        }
        else
        {
            setFilteredSuggestions([]);
        }
    };

    const handleSelect = suggestion => {
        onSelect(suggestion);
        setInput("");
        setFilteredSuggestions([]);
        setHighlightIndex(-1);
    };

    const handleKeyDown = e => {
        if(e.key === "ArrowDown")
        {
            if(filteredSuggestions.length > 0)
            {
                setHighlightIndex(prevIndex => {
                    const newIndex = prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0;
                    listRef.current[newIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                    return newIndex;
                });
            }
            e.preventDefault();
        }
        else if(e.key === "ArrowUp")
        {
            if(filteredSuggestions.length > 0)
            {
                setHighlightIndex(prevIndex => {
                    const newIndex = prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1;
                    listRef.current[newIndex]?.scrollIntoView({ block: "nearest", behavior: "smooth" });
                    return newIndex;
                });
            }
            e.preventDefault();
        }
        else if(e.key === "Enter")
        {
            if(highlightIndex !== -1)
            {
                handleSelect(filteredSuggestions[highlightIndex]);
            }
            else if (filteredSuggestions.length > 0)
            {
                handleSelect(filteredSuggestions[0]);
            }
            e.preventDefault();
        }
        else if (e.key === "Escape")
        {
            setInput("");
            setFilteredSuggestions([]);
            setHighlightIndex(-1);
            e.preventDefault();
        }
        else if(e.key === " " && suggestions.some(suggestion => suggestion.toLowerCase() === input.toLowerCase()) && filteredSuggestions.length > 0)
        {
            handleSelect(filteredSuggestions[0]);
            e.preventDefault();
        }
    };

    return (
        <>
        <div className="search-tags">
        <input type="text" value={input} onChange={handleChange} onKeyDown={handleKeyDown} placeholder="Type to search..."></input>
        {
            <ul onMouseLeave={() => setHighlightIndex(-1)} className={input.length > 0 ? "visible" : ""}>
            {
                filteredSuggestions.length > 0 ? (
                    filteredSuggestions.map((suggestion, index) => ( <li key={index} ref={el => listRef.current[index] = el} onClick={() => handleSelect(suggestion)} onMouseMove={() => setHighlightIndex(index)} className={highlightIndex === index ? "highlighted" : ""}> {suggestion} </li> ))
                ) : (
                    <li className="no-results">❌ No results found</li>
                )
            }
            </ul>
        }
        </div>
        </>
    )
}