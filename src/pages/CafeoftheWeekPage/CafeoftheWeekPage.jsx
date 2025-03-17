// pages/CafeWeekPage.jsx
import React from 'react';
import CafeOfTheWeek from '../../components/CafeoftheWeek/CafeoftheWeek';
import PhotoPageHeader from '../../components/PhotoPageHeader/PhotoPageHeader';
import './CafeoftheWeekPage.scss';
import Footer from '../../components/Footer/Footer';

function CafeWeekPage() {
    const currentYear = new Date().getFullYear();
    const getWeekNumber = () => {
        const now = new Date();
        const start = new Date(now.getFullYear(), 0, 1);
        const diff = now - start;
        const oneWeek = 1000 * 60 * 60 * 24 * 7;
        return Math.floor(diff / oneWeek) + 1;
    };

    return (
        <div className="cafe-week-page">
            <PhotoPageHeader />
            <div className="cafe-week-page-content">
                <header className="page-header">
                    <h1 className="cafe-week-page-header">Welcome to Cafe of the Week 🥐</h1>
                    <p>Week {getWeekNumber()} of {currentYear}</p>
                    <p>Discover our featured cafe every week!</p>
                </header>

                <main className="page-content">
                    <section className="cafe-feature">
                        <CafeOfTheWeek />
                    </section>
                </main>
            </div>
            <Footer />
        </div>
    );
}

export default CafeWeekPage;