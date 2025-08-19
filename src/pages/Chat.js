import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // Fetch messages in real-time
  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsubscribe();
  }, []);

  // Send new message
  const sendMessage = async () => {
    if (newMessage.trim() === '') return;

    await addDoc(collection(db, 'messages'), {
      text: newMessage,
      uid: auth.currentUser.uid,
      displayName: auth.currentUser.displayName,
      createdAt: serverTimestamp()
    });

    setNewMessage('');
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <button
        className="mb-4 bg-red-500 text-white p-2 rounded"
        onClick={() => signOut(auth)}
      >
        Logout
      </button>

      <div className="border p-4 h-80 overflow-y-scroll mb-4">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`mb-2 ${msg.uid === auth.currentUser.uid ? 'text-right' : 'text-left'}`}
          >
            <span className="font-bold">{msg.displayName}: </span>
            {msg.text}
          </div>
        ))}
      </div>

      <div className="flex">
        <input
          type="text"
          className="border p-2 flex-1"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          className="bg-blue-500 text-white p-2 ml-2 rounded"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;

