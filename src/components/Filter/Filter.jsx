import { useState } from "react";
import "./Filter.scss";
import filterIcon from "../../assets/images/Filter.svg";

function Filter({ tags, selectedTag, onFilterChange }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };

    const handleSelectChange = (tag) => {
        onFilterChange(tag === "all" ? null : tag);
        setIsDropdownOpen(false); // Close dropdown after selection
    };

    return (
        <section className="filter">
            <div className="filter__container">
                <button
                    className={`filter__button ${isDropdownOpen ? "filter__button--active" : ""}`}
                    onClick={toggleDropdown}
                >
                    Filters
                    <img src={filterIcon} alt="filter icon" className="filter__button-icon" />
                </button>

                {isDropdownOpen && (
                    <div className="filter__dropdown visible">
                        <button
                            className={`filter__dropdown-item ${!selectedTag ? "filter__dropdown-item--selected" : ""}`}
                            onClick={() => handleSelectChange("all")}
                        >
                            All Categories
                        </button>
                        {tags.map((tag) => (
                            <button
                                key={tag.id || tag.name}
                                className={`filter__dropdown-item ${selectedTag === tag.name ? "filter__dropdown-item--selected" : ""}`}
                                onClick={() => handleSelectChange(tag.name)}
                            >
                                {tag.name}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}

export default Filter;