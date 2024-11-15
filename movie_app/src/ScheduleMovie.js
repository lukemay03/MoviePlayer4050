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
        if (!showTime || !showDate || !selectedAuditorium) {
            alert('Please fill in all fields');
            setIsSubmitting(false);
            return;
        }
    
        const showstarttime = showDate + ' ' + showTime + ":00";
        const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");
    
        //check if the showstarttime is in the past
        if (new Date(showstarttime) < new Date(currentTime)) {
            setErrorMessage('The showtime cannot be in the past.');
            setIsSubmitting(false);
            return;
        }
    
        try {
            // Step 1: Check if the showtime already exists in the `showtimes` table
            let showtimesId;
            const checkShowtimeResponse = await fetch('http://localhost:3001/showtimes/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ timestamp: showstarttime })
            });
            
            const checkShowtimeData = await checkShowtimeResponse.json();
    
            if (checkShowtimeData.exists) {
                showtimesId = checkShowtimeData.showtimes_id; // Get existing showtimes_id
            } else {
                // Step 2: If showtime doesn't exist, add it to the `showtimes` table
                const addShowtimeResponse = await fetch('http://localhost:3001/showtimes/add', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ timestamp: showstarttime })
                });
                
                const addShowtimeData = await addShowtimeResponse.json();
                showtimesId = addShowtimeData.showtimes_id; // Get the new showtimes_id
            }
    
            // Step 3: Check if a show already exists within 1 hour in the selected auditorium
            const checkConflictResponse = await fetch('http://localhost:3001/MovieShow/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ showtimes_id: showtimesId, aud_id: selectedAuditorium })
            });
    
            const checkConflictData = await checkConflictResponse.json();
    
            if (checkConflictData.exists) {
                setErrorMessage('A show with the same start time (within an hour) already exists in this auditorium.');
                setIsSubmitting(false);
                return;
            }
    
            // Step 4: Add the showtime to the `MovieShow` table
            const selectedAuditoriumData = auditoriums.find(
                (auditorium) => auditorium.aud_id === parseInt(selectedAuditorium)
            );
    
            const dataToSubmit = {
                aud_id: selectedAuditorium,
                movie_id,
                showtimes_id: showtimesId,
                noofseats: selectedAuditoriumData ? selectedAuditoriumData.numseats : noOfSeats
            };
    
            const postResponse = await fetch('http://localhost:3001/MovieShow/post', {
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