import React, { useEffect, useState } from 'react';
import AdminHeader from './components/Header';
import { useLocation, useNavigate } from 'react-router-dom';
import Modal from './components/Modal';

function ScheduleMovie() {
    const location = useLocation();
    const { state } = location || {};
    const { movie_title, movie_id } = state || {};
    const [auditoriums, setAuditoriums] = useState([]);
    const [selectedAuditorium, setSelectedAuditorium] = useState('');
    const [noOfSeats, setNoOfSeats] = useState('');
    const [showTime, setShowTime] = useState('');
    const [showDate, setShowDate] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [redirectUrl, setRedirectUrl] = useState('/manage-movies');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAuditoriums = async () => {
            try {
                const response = await fetch('http://localhost:3001/auditoriums/get');
                if (!response.ok) {
                    setErrorMessage('Failed to fetch auditoriums');
                    return;
                }
                const data = await response.json();
                setAuditoriums(data);
            } catch (err) {
                setErrorMessage('Failed to fetch data');
            }
        };

        fetchAuditoriums();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        if (!showTime || !showDate) {
            alert('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }

        const showStartTime = showDate + ' ' + showTime + ":00";
        const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");

        // Check if the showStartTime is in the past
        if (new Date(showStartTime) < new Date(currentTime)) {
            setErrorMessage('The showtime cannot be in the past.');
            setIsSubmitting(false);
            return;
        }

        // Check if a show already exists within 1 hour of the new showStartTime
        try {
            // console.log('about to call movieshow/check: ', showStartTime, selectedAuditorium);
            const response = await fetch('http://localhost:3001/movieshow/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ showstarttime: showStartTime, aud_id: selectedAuditorium })
            });
            const data = await response.json();

            if (data.exists) {
                setErrorMessage('A show with the same start time (within an hour) already exists in this auditorium.');
                setIsSubmitting(false);
                return;
            }

            // Set the noOfSeats based on the selected auditorium at the time of submission
            const selectedAuditoriumData = auditoriums.find(
                (auditorium) => auditorium.aud_id === parseInt(selectedAuditorium)
            );
            // console.log('Selected Auditorium Data: ', selectedAuditoriumData);
            if (selectedAuditoriumData) {
                setNoOfSeats(selectedAuditoriumData.numseats);  // Update noOfSeats to the selected auditorium's numseats
            }

            // If no conflict, proceed with submission
            const dataToSubmit = {
                aud_id: selectedAuditorium,
                movie_id,
                showstarttime: showStartTime,
                noofseats: noOfSeats
            };

            const postResponse = await fetch('http://localhost:3001/movieshow/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dataToSubmit)
            });

            if (!postResponse.ok) {
                setErrorMessage('Failed to submit the movie show.');
            } else {
                setSuccessMessage('Showtime Created Successfully!');
                setRedirectUrl('/manage-movies');
                setShowModal(true);
            }
        } catch (err) {
            setErrorMessage('Failed to send request');
        }
        setIsSubmitting(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSuccessMessage('Showtime Created. Please create another.');
        setErrorMessage('');
    }

    return (
        <div className="schedule-movie">
            <AdminHeader />
            <form className="schedule-form" onSubmit={handleSubmit}>
                <h3>Schedule Movie: {movie_title}</h3>
                <div className="form-group">
                    <label>Choose a Date: </label>
                    <input type="date" id="date" name="date" value={showDate} onChange={(e) => setShowDate(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Choose a time: </label>
                    <input type="time" id="time" name="time" value={showTime} onChange={(e) => setShowTime(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Choose an auditorium: </label>
                    <select
                        id="auditorium"
                        name="auditorium"
                        value={selectedAuditorium}
                        onChange={(e) => setSelectedAuditorium(e.target.value)}>
                        <option value="">Select an Auditorium</option>
                        {auditoriums.map((auditorium) => (
                            <option key={auditorium.aud_id} value={auditorium.aud_id}>
                                {auditorium.audname}
                            </option>
                        ))}
                    </select>
                </div>

                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}

                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting ...' : 'Submit'}
                </button>
            </form>

            {showModal && <Modal message={successMessage} onClose={handleCloseModal} redirectUrl={redirectUrl} />}
        </div>
    );
}

export default ScheduleMovie;