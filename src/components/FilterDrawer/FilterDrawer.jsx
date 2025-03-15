import "./FilterDrawer.scss";

function FilterDrawer({ tags, selectedTag, onFilterChange }) {
    // Add error handling and logging
    if (!Array.isArray(tags) || tags.length === 0) {
        console.error("FilterDrawer: Invalid or empty tags array", tags);
        return <div>No filters available</div>;
    }

    return (
        <section className="filter-drawer">
            <h2 className="filter-drawer__title">Filters</h2>
            <div className="filter-drawer__buttons">
            {tags.map((tag) => (
                <button 
                    className={`filter-drawer__button ${selectedTag === tag.name ? "filter-drawer__button--selected" : ""}`}
                    key={tag.id || tag.name}
                    onClick={() => onFilterChange(tag.name)}
                >
                    {tag.name}
                </button>
            ))}
            </div>
        </section>
    );
}

export default FilterDrawer;
