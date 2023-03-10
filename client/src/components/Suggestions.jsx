import React, { useState, useEffect } from 'react';
import { getItems, addItem, deleteItem, updateItem } from '../../api';

function Suggestions({ user }) {
  const [suggestions, setSuggestions] = useState([]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [editSuggestion, setEditSuggestion] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem('token');
        const data = await getItems(token, 'suggestions');
        setSuggestions(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  const handleAddSuggestion = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const data = await addItem(token, 'suggestions', { text: newSuggestion });
    setNewSuggestion('');
    setSuggestions([...suggestions, data]);
  };

  const handleDeleteSuggestion = async (id) => {
    const token = localStorage.getItem('token');
    await deleteItem(token, 'suggestions', id);
    setSuggestions(suggestions.filter((suggestion) => suggestion._id !== id));
  };

  const handleEditSuggestion = (suggestion) => {
    setEditSuggestion(suggestion);
    setNewSuggestion(suggestion.text);
  };

  const handleUpdateSuggestion = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const updatedSuggestion = await updateItem(token, 'suggestions', editSuggestion._id, { text: newSuggestion });
    const updatedSuggestions = suggestions.map((suggestion) => {
      if (suggestion._id === updatedSuggestion._id) {
        return updatedSuggestion;
      }
      return suggestion;
    });
    setEditSuggestion(null);
    setNewSuggestion('');
    setSuggestions(updatedSuggestions);
  };

  return (
    <div>
      <h2>Suggestions</h2>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion._id}>
            {editSuggestion?._id === suggestion._id ? (
              <form onSubmit={handleUpdateSuggestion}>
                <input type="text" value={newSuggestion} onChange={(e) => setNewSuggestion(e.target.value)} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditSuggestion(null)}>Cancel</button>
              </form>
            ) : (
              <>
                <p>{suggestion.text}</p>
                {user && (
                  <>
                    <button onClick={() => handleEditSuggestion(suggestion)}>Edit</button>
                    <button onClick={() => handleDeleteSuggestion(suggestion._id)}>Delete</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
      {user && (
        <form onSubmit={handleAddSuggestion}>
          <input type="text" value={newSuggestion} onChange={(e) => setNewSuggestion(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}

export default Suggestions;
