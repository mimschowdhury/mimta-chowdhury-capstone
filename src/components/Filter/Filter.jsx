import "./Filter.scss";
import filterIcon from "../../assets/images/Filter.svg";

function Filter({ openDrawer, isDrawerOpen }) { 
    return (
        <section className="filter">
            <button 
                className={`filter__button ${isDrawerOpen ? "filter__button--active" : ""}`}
                onClick={openDrawer}
            >
                Filters
                <img src={filterIcon} alt="filter icon" className="filter__button-icon" />
            </button>
        </section>
    );
}

export default Filter;