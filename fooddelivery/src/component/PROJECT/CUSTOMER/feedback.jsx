import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState('');
  const cName=sessionStorage.getItem("cName")
  const handleChange = (e) => {
    setFeedback(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:9000/feedback/${cName}`, { feedback });
      console.log(response.data);
      alert('Feedback submitted successfully!');
      setFeedback('');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div>
      <h2 id='feedhead'>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="feedback"id='feed'>Your Feedback:</label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          />
        </div>
        <button type="submit">Submit Feedback</button>
      </form>
    </div>
  );
};

export default FeedbackForm;
