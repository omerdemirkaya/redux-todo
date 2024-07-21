import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo, editTodo } from './todosSlice';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAddOrEditTodo = () => {
    if (editMode) {
      dispatch(editTodo({ id: editId, text }));
      setEditMode(false);
      setEditId(null);
    } else {
      if (text.trim()) {
        dispatch(addTodo(text));
      }
    }
    setText('');
  };

  const handleEdit = (todo) => {
    setEditMode(true);
    setEditId(todo.id);
    setText(todo.text);
  };

  return (
    <div className="App">
      <h1>Görev Listesi</h1>
      <div className="input-container">
        <input 
          type="text" 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Yeni görev ekle"
        />
        <button onClick={handleAddOrEditTodo}>
          {editMode ? 'Düzenle' : 'Ekle'}
        </button>
      </div>
      <ul>
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <span onClick={() => dispatch(toggleTodo(todo.id))}>
              {todo.text}
            </span>
            <div className="buttons">
              <button onClick={() => handleEdit(todo)}>Düzenle</button>
              <button onClick={() => dispatch(deleteTodo(todo.id))}>Sil</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
