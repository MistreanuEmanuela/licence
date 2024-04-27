import React, { useState, useEffect, useRef } from 'react';
import styles from './community.module.css';
import Navbar from '../NavBars/NavBar';
import { RiMenuUnfoldFill, RiMenuFoldFill } from 'react-icons/ri';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdCancel } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import Delete from '../Components/Animations/Delete';
import { MdDelete } from "react-icons/md";
import { LuUserCircle2 } from "react-icons/lu";
import { IoSendSharp } from "react-icons/io5";
import Save from '../Components/Animations/Save';

interface Post {
    id: number;
    postText: string;
    createdAt: string;
}

interface Message {
    id: number,
    owner: boolean,
    postId: number,
    messageText: string,
    createdAt: string,
    lastName: string,
    firstName: string
}

function Community() {
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [posts, setPosts] = useState<Post[]>([]);
    const [newPost, setNewPost] = useState<boolean>(false);
    const [added, setAdded] = useState<boolean>(false);
    const [deletedState, setDeleteState] = useState<boolean>(false);
    const [deletedStateMessage, setDeleteStateMessage] = useState<boolean>(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [socket, setSocket] = useState<any>(null);
    const [newPostContent, setNewPostContent] = useState<{ postName: string, postText: string }>({
        postName: '',
        postText: ''
    });
    const [errors, setErrors] = useState<string[]>([]);
    const [postId, setPostId] = useState<number>();
    const [postInfo, setPostInfo] = useState<any>(null);
    const [messageNew, setMessageNew] = useState<{ postId: number, messageText: string }>({
        postId: 0,
        messageText: '',
    });
    const [messageId, setMessageId] = useState<number>();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto", block: "end" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        fetchPosts();
    }, []);

    const toggleSlideBar = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            fetchPosts();
            if(postId) {
                fetchMessages();
            }
        }, 5000); 
        return () => clearInterval(interval);
    });

    const fetchPosts = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8082/posts/findPosts', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    };

    const fetchPostInfo = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:8082/posts/findPost?id=${postId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch post info');
            }

            const data = await response.json();
            setPostInfo(data);
        } catch (error) {
            console.error('Error fetching post info:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('No token found');
            }

            const response = await fetch(`http://localhost:8082/messages/findMessages?id=${postId}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const data = await response.json();
            setMessages(data);
        } catch (error) {
            console.error('Error fetching messages:', error);
        }
    };

    const handleCancel = () => {
        setNewPost(false);
    };

    const handleAddPost = async () => {
        try {
            const errors: string[] = [];

            if (!newPostContent.postText) {
                errors.push('Post text is required');
            }
            if (newPostContent.postName.length > 15) {
                errors.push('Post name must be 15 characters or less');
            }

            if (errors.length > 0) {
                setErrors(errors);
                return;
            }

            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8082/posts/addPost', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPostContent)
            });
            if (!response.ok) {
                throw new Error('Failed to add post');
            }
            const responseBody = await response.text();
            const newPost: Post = responseBody ? JSON.parse(responseBody) : {};
            setPosts(prevPosts => [...prevPosts, newPost]);
            setNewPost(false);
            setNewPostContent({ postName: '', postText: '' });
            setAdded(true);
            setTimeout(() => {
                setAdded(false);
                fetchPosts();
            }, 2000);
        } catch (error) {
            console.error('Error adding post:', error);
            setErrors([]);
        }
    };

    const handleDeletePost = async () => {
        try {
            const response = await fetch(`http://localhost:8082/posts/deletePost?id=${postId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log("Post deleted successfully");
                setDeleted(true);
                setTimeout(() => {
                    setDeleted(false);
                    setDeleteState(false);
                    setPostId(undefined);
                    setPostInfo(null);
                }, 2000);
                fetchPosts();
            } else {
                console.error('Failed to delete post:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    const handleSendMessage = async () => {
        try {
            if (postId) {
                const token = localStorage.getItem('token');
                messageNew.postId = postId;
                if (!token) {
                    throw new Error('No token found');
                }

                const response = await fetch('http://localhost:8082/messages/addMessage', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(messageNew)
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }
                else
                {
                    fetchMessages();
                }

                setMessageNew({ postId: postId, messageText: '' });
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    const handleDeleteMessage = async () => {
        try {
            const response = await fetch(`http://localhost:8082/messages/deleteMessage?id=${messageId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (response.ok) {
                console.log("Message deleted successfully");
                setDeleted(true);
                setTimeout(() => {
                    setDeleted(false);
                    setDeleteStateMessage(false);
                    setMessageId(undefined);
                    fetchMessages();
                }, 2000);
            } else {
                console.error('Failed to delete message:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-EN', options);
    };

    const handleSetPostId = (postId: number) => {
        setPostId(postId);
        fetchPostInfo();
        fetchMessages();
    };
    const [deleted, setDeleted] = useState<boolean>(false);
    const handleDeleteConfirm = () => {
        handleDeletePost();
    };

    const handleDeleteCancel = () => {
        setDeleteState(false);
    };

    const handleDeleteConfirmMessage = () => {
        handleDeleteMessage();
      
    };
    const handleDeleteMessagePress = (id: number) =>
    {
        setMessageId(id);
        setDeleteStateMessage(true);

    }
    const handleDeleteCancelMessage = () => {
        setDeleteStateMessage(false);
    };

    return (
        <div className={styles.body}>
            <Navbar pagename="" />
            <div className={styles.page}>
                {newPost &&
                    <div className={styles.message_box}>
                        <div className={styles.botton_cancel} onClick={handleCancel}><MdCancel /></div>
                        <div className={styles.error}>
                            <ul>
                                {errors.map((error, index) => (
                                    <div key={index}>{error}</div>
                                ))}
                            </ul>
                        </div>
                        <input
                            className={styles.input}
                            type="text"
                            placeholder="Give a short name"
                            maxLength={15}
                            value={newPostContent?.postName || ''}
                            onChange={(e) => setNewPostContent(prevState => ({ ...prevState, postName: e.target.value }))}
                            required
                        />
                        <textarea
                            className={styles.input}
                            placeholder="Write your post here"
                            value={newPostContent?.postText || ''}
                            onChange={(e) => setNewPostContent(prevState => ({ ...prevState, postText: e.target.value }))}
                            required
                        />
                        <div className={styles.bottoms_container}>
                            <div className={styles.botton_send} onClick={handleAddPost}>
                                <div className={styles.send_icon}><IoIosSend /></div>Send
                            </div>
                        </div>
                    </div>
                }
                {added &&
                    <div className={styles.message_box}>
                        <p>New post added successfully!</p>
                        <Save />
                    </div>
                }
                <div className={styles.menu}>
                    <button className={styles.toggleBtn} onClick={toggleSlideBar}>
                        {isOpen ? <RiMenuFoldFill /> : <RiMenuUnfoldFill />}
                    </button>
                    <div className={`${styles.slideBar} ${isOpen ? styles.slideBarOpen : ''}`}>
                        <div className={styles.content}>
                            <div className={styles.title}>Community posts</div>
                            <button className={styles.button_new} onClick={() => setNewPost(true)}>
                                <div className={styles.icon}><IoAddCircleOutline /></div>New post
                            </button>
                            {posts.slice().reverse().map(post => (
                                <button key={post.id} className={styles.button_post} onClick={() => handleSetPostId(post.id)}>
                                    {post.postText}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                {deletedState && postInfo && (
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            {!deleted ? (
                                <>
                                    <p>Are you sure you want to delete this post?</p>
                                    <div className={styles.buttons}>
                                        <button onClick={handleDeleteConfirm} className={styles.confirmButton}>Yes</button>
                                        <button onClick={handleDeleteCancel} className={styles.cancelButton}>No</button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <p>Deleted successfully.</p>
                                    <Delete />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                  {deletedStateMessage && postInfo && (
                    <div id="custom-confirm-dialog" className={styles.confirmDialog}>
                        <div className={styles.dialogContent}>
                            {!deleted ? (
                                <>
                                    <p>Are you sure you want to delete this message?</p>
                                    <div className={styles.buttons}>
                                        <button onClick={handleDeleteConfirmMessage} className={styles.confirmButton}>Yes</button>
                                        <button onClick={handleDeleteCancelMessage} className={styles.cancelButton}>No</button>
                                    </div>
                                </>
                            ) : (
                                <div>
                                    <p>Deleted successfully.</p>
                                    <Delete />
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {postInfo && (
                    <div className={styles.post}>
                        {postInfo.owner && (
                            <button onClick={() => setDeleteState(true)} className={styles.delete_button}><MdDelete />
                            </button>)}
                        <div className={styles.postare}>
                            <div className={styles.post_infos}>
                                <div> {postInfo.userFirstName} {postInfo.userLastName}</div>
                                <div> {formatDate(postInfo.createdAt)} </div>
                            </div>
                            <div className={styles.post_content}>
                                <div className={styles.post_icon}> <FaUserCircle /></div>
                                <div className={styles.post_text}> {postInfo.postText} </div>
                            </div>
                        </div>

                        <div className={styles.message_display}>
                            {messages && messages.slice().map(message => (
                                <div className={`${styles.message} ${message.owner ? styles.message_owner : ''}`} key={message.id}>
                                    <div className={`${styles.post_infos} ${message.owner ? styles.post_infos_owner : ''}`}>

                                        {message.owner && (<div> Me </div>)}
                                        {!message.owner && (<div>{message.firstName} {message.lastName}</div>)}

                                        <div> {formatDate(message.createdAt)}</div>

                                    </div>
                                    <div className={`${styles.message_content} ${message.owner ? styles.message_content_owner : ''}`}>
                                        <div className={styles.message_icon}> <LuUserCircle2 /></div>
                                        <div className={`${styles.message_text} ${message.owner ? styles.message_text_owner : ''}`}>

                                            {message.messageText} </div>
                                    </div>
                                    {message.owner && (
                                        <div className={styles.post_infos}>
                                            <button className={styles.delete} onClick={() => handleDeleteMessagePress(message.id)}> Delete</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        <div ref={messagesEndRef} />
                        </div>
                        <div className={styles.newMessage}>
                            <input
                                className={styles.input_field}
                                type="text"
                                value={messageNew.messageText}
                                onChange={(e) => setMessageNew({ ...messageNew, messageText: e.target.value })}
                                placeholder="Type your message..."
                            />
                            {messageNew.messageText !== '' ? (
                                <button onClick={handleSendMessage} className={styles.sendMessage}><IoSendSharp /></button>
                            ) : (
                                <button className={styles.sendMessage_inactive}><IoSendSharp /></button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Community;
