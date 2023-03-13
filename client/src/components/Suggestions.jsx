import { useState } from 'react';
import { addItem } from '../../api';
import './Suggestions.css';



function Suggestions(props) {
  const  user = props?.location?.state?.user; 
  console.log(user); 
  console.log(props.location);
//   console.log(props.location.state.user);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newStatus, setNewStatus] = useState('planned');

  const handleAddSuggestion = async (e) => {
    e.preventDefault();
    console.log('user_id: ', user && user._id);
    const token = localStorage.getItem('token');
    console.log("Authorization:", `Bearer ${token}`)
    
    try {
        // Fetch user data
        const response = await fetch('http://localhost:4000/api/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
    
        if (!response.ok) {
          throw new Error('Request failed with status ' + response.status);
        }
    
        const data = await response.json();
        const { user } = data;
    
        console.log("user_id: ", user._id);
        const suggestionData = {
          title: newTitle,
          description: newDescription,
          status: newStatus,
          user: user._id,
          text: newSuggestion,
        };
    
        const result = await addItem(token, 'suggestions', suggestionData);
        console.log('New suggestion added:', result);
        setNewSuggestion('');
        setNewTitle('');
        setNewDescription('');
        setNewStatus('planned');
      } catch (error) {
        console.log(error);
      }
  };

  return (
    <div className="suggestions-container">
      <h2>Suggestions</h2>
      <form onSubmit={handleAddSuggestion}>
        <label htmlFor="new-title">Title:</label>
        <input
          id="new-title"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <label htmlFor="new-description">Description:</label>
        <input
          id="new-description"
          type="text"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
        />
        <label htmlFor="new-status">Status:</label>
        <select
          id="new-status"
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
        >
          <option value="planned">Planned</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <label htmlFor="new-suggestion">Suggestion:</label>
        <input
          id="new-suggestion"
          type="text"
          value={newSuggestion}
          onChange={(e) => setNewSuggestion(e.target.value)}
        />
        <button type="submit">Add Suggestion</button>
      </form>
    </div>
  );
}

export default Suggestions;

