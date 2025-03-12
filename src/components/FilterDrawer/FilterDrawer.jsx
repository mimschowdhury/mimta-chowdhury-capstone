import "./FilterDrawer.scss";

function FilterDrawer({ tags, selectedTag, onFilterChange }) {
    return (
        <section className="filter-drawer">
            <h2 className="filter-drawer__title">Filters</h2>
            <div className="filter-drawer__buttons">
            {tags.map((tag) => (
                <button 
                    className={`filter-drawer__button ${selectedTag === tag ? "filter-drawer__button--selected" : ""}`}
                    key={tag}
                    onClick={() => onFilterChange(tag)}
                >
                    {tag}
                </button>
            ))}
            </div>
        </section>
    );
}

export default FilterDrawer;
