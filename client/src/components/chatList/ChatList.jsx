import { Link } from "react-router-dom";
import "./chatList.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

// Define the ChatList component
const ChatList = () => {
  const queryClient = useQueryClient();
  
  // Fetch chats using React Query
  const { isLoading, error, data } = useQuery({
    queryKey: ["userChats"],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  // Define the delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (chatId) => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Parse JSON response if available
      const result = await response.json();
      return result;
    },
    onSuccess: () => {
      // Invalidate and refetch the userChats query to update the chat list
      queryClient.invalidateQueries(["userChats"]);
      queryClient.refetchQueries(["userChats"]);
    },
    onError: (err) => {
      console.log("Error deleting chat:", err);
    },
  });

  // Handle chat deletion
  const handleDelete = (chatId) => {
    if (window.confirm("Are you sure you want to delete this chat?")) {
      deleteMutation.mutate(chatId);
    }
  };

  return (
    <div className="chatList">
      <span className="title">DASHBOARD</span>
      <Link to="/dashboard">Create a new Chat</Link>
      <Link to="/">Explore Agent Q</Link>
      <Link to="/">Contact</Link>
      <hr />
      <span className="title">RECENT CHATS</span>
      <div className="list">
        {isLoading && <p>Loading...</p>}
        {error && <p>Something went wrong! Please try again later.</p>}
        {data?.length === 0 && !isLoading && !error && (
          <p>No chats found. <Link to="/dashboard">Start a new chat</Link></p>
        )}
        {data?.length > 0 && (
          <ul>
            {data.map((chat) => (
              <li key={chat._id} className="chat-item">
                <Link to={`/dashboard/chats/${chat._id}`}>
                  {chat.title}
                </Link>
                <div
                  className="delete-button"
                  onClick={() => handleDelete(chat._id)}
                >
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <hr />
      <div className="upgrade">
        <img src="/logo.png" alt="Logo" />
        <div className="texts">
          <span>Upgrade to Agent Q Pro</span>
          <span>Get unlimited access to all features</span>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
