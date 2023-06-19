import { useState, useEffect } from 'react';
import moment from 'moment';
import TickIcon from './TickIcon';
import ProgressBar from './ProgressBar';
import Modal from './Modal';

const ListItem = ({ task, getData }) => {
  const [showModal, setShowModal] = useState(false);
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    const calculateTimeAgo = () => {
      const now = moment();
      const taskDate = moment(task.date);
      const duration = moment.duration(now.diff(taskDate));

      const days = Math.floor(duration.asDays());
      const hours = duration.hours();

      let formatted = '';
      if (days > 0) {
        formatted += `${days} day${days > 1 ? 's' : ''}`;
      }
      if (hours > 0) {
        formatted += ` ${hours} hour${hours > 1 ? 's' : ''}`;
      }

      if (formatted === '') {
        formatted = 'Just now';
      } else {
        formatted += ' ago';
      }

      setFormattedDate(formatted);
    };

    calculateTimeAgo();
  }, [task.date]);

  const deleteItem = async () => {
    try {
      const response = await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'DELETE',
      });
      if (response.status === 200) {
        getData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const markAsDone = async () => {
    try {
      await fetch(`http://localhost:8000/todos/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, condition: 'completed' }),
      });
      getData();
    } catch (err) {
      console.log(err);
    }
  };
  
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
        <p className='user-email'>{formattedDate}</p>
      </div>
      <div className="button-container">
      {task.condition === 'progress' ? (
      <button className="edit" onClick={() => setShowModal(true)}>
        EDIT
        </button>
        ) : (
          <button className="edit" hidden>EDIT</button>
        )}
        {task.condition === 'progress' ? (
          <button className="condition" onClick={markAsDone}>
            DONE
          </button>
        ) : (
          <button className="completed" hidden></button>
        )}
        <button className="delete" onClick={deleteItem}>
          DELETE
        </button>
      </div>
      {showModal && <Modal mode={'edit'} setShowModal={setShowModal} getData={getData} task={task} />}
    </li>
  );
};

export default ListItem;
