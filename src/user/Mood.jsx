import React, { useEffect, useState } from 'react';
import Navbar1 from '../Navbar1';
import Modal from 'react-modal';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase';

import image from '../assets/hh.png'

const OPENAI_API_KEY = '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';

const Mood = () => {

    const [ans, setAns] = useState('fetching...');
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState('');

    const generateResponse = async (inputText) => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions', // Corrected URL
                {
                    model: 'gpt-3.5-turbo', // Specify the model to use
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a helpful assistant.'
                        },
                        {
                            role: 'user',
                            content: inputText
                        }
                    ]
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    }
                }
            );
            // console.log(queryQuestion);
            const generatedText = response.data.choices[0].message.content;
            setAns(generatedText);
            setMessages([...messages, { input: "Based the mood of mine just in a single word with related emoji based on numerical value - depressed : 4 , no social interaction : 6, sleeping Problem :8, feeling Tired : 5 , feeling Bad :6, concentration Problem : 4", output: generatedText }]);
            setInputText('');
            console.log(generatedText);
        } catch (error) {
            console.error('Error calling the OpenAI API:', error);
        }
    };



    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     generateResponse(inputText);
    // };

    // useEffect(() => {
    //     generateResponse("Based the mood of mine give response just in a single word strictly with related emoji based on numerical value - depressed : 4 , no social interaction : 6, sleeping Problem :8, feeling Tired : 5 , feeling Bad :6, concentration Problem : 4");
    // })

    const { id } = useParams();
    // const [isFullscreen, setIsFullscreen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [slideIndex, setSlideIndex] = useState(0);
    const [isSlideshowActive] = useState(true);
    // setIsSlideshowActive(true);
    const [intervalId, setIntervalId] = useState(null);
    const [images, setImages] = useState([]);
    const [question, setQuestion] = useState('');
    const [author, setAuthor] = useState('');
    const [date] = useState('latest');
    const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 615);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 615);
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth <= 615);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const fetchRequestData = async () => {
            try {
                const requestRef = doc(db, 'Requests', id);
                const docSnapshot = await getDoc(requestRef);

                if (docSnapshot.exists()) {
                    const requestData = docSnapshot.data();
                    console.log('Request Data:', requestData);

                    const screenshots = requestData?.Screenshots || [];
                    const question = requestData?.Question || '';
                    const author = requestData?.Name || '';

                    setAuthor(author);
                    setQuestion(question);
                    console.log('Screenshots:', screenshots);

                    setImages(screenshots);
                } else {
                    console.error('Request not found');
                }
            } catch (error) {
                console.error('Error fetching request data:', error);
            }
        };

        const intervalId = setInterval(() => {
            // Your interval logic here
            console.log('Interval logic running...');
        }, 1000); // Adjust the interval duration as needed

        // Fetch data only if the id has changed
        if (id) {
            fetchRequestData();
        }

        // Clear the interval on component unmount
        return () => clearInterval(intervalId);
    }, [id]);

    console.log(intervalId);

    useEffect(() => {
        const interval = setInterval(() => {
            if (isSlideshowActive) {
                setSlideIndex((prevIndex) => (prevIndex + 1) % images.length);
            }
        }, 99999);

        setIntervalId(interval);

        return () => clearInterval(interval);
    }, [isSlideshowActive, slideIndex, images]);

    const toggleSlideshow = (index) => {
        setCurrentImageIndex(index);
        setIsModalOpen((prevValue) => !prevValue);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    const homeStyle = {
        height: '85vh',
        display: 'flex',
        flexDirection: isMobileView ? 'column' : 'row',
        justifyContent: 'center',
        padding: 20,
        background: `
      repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255, 133, 244, 0.8) 50px, rgba(66, 133, 244, 0.8) 51px),
      repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(66, 133, 244, 0.8) 50px, rgba(66, 133, 244, 0.8) 51px),
      #5813ea`,
    };

    const contentStyle = {
        width: isMobileView ? '100%' : '95%',
        height: isMobileView ? '85vh' : '85vh',
        border: '1px solid #ccc',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        overflow: 'hidden',
        backgroundColor: '#F3F6FC',
    };

    const headingStyle = {
        width: '100%',
        backgroundColor: '#FFF4E8',
        fontSize: 25,
        fontFamily: 'DMM',
        fontWeight: 500,
        paddingTop: 5,
        paddingBottom: 5,
        textAlign: 'left',
        paddingLeft: isMobileView ? 20 : 80,
    };

    const mainboxStyle = {
        width: isMobileView ? '80%' : '90%',
        height: '85%',
        backgroundColor: 'transparent',
        borderRadius: 15,
        margin: 'auto',
        marginTop: '20px',
        border: '1px solid blue',
        boxShadow: '0px 8px 10px rgba(0, 0, 0, 0.1)',
        marginBottom: isMobileView ? '20px' : 0
    };

    const sliderContainerStyle = {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',

        width: '100%',
        height: isMobileView ? '30vh' : '60vh',
        overflowX: 'scroll',
        overflowY: 'hidden',
        alignItems: "flex-start",
    };


    const sliderStyle = {
        marginTop: 0,
        display: 'flex',
        transition: 'transform 0.3s ease-in-out',
        width: isMobileView ? "auto" : "auto"
        // transition: 'transform 2s ease-in-out',
        // transform: `translateX(-${slideIndex * 100}%)`,
    };

    const slideStyle = {
        flex: '0 0 auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: "20px",
        width: isMobileView ? "100%" : '100%',
        height: isMobileView ? "80%" : '100%',
        backgroundColor: 'white',
        border: "none",
        outline: "none",
        borderRadius: isMobileView ? 30 : 50,
        boxShadow: '5px 10px 15px  rgba(0, 0, 0, 0.4)',
    };

    return (
        <>
            <Navbar1 />
            <div style={homeStyle}>
                <div style={contentStyle}>
                    <div style={headingStyle}>👀 Result !!</div>
                    <div style={mainboxStyle}>
                        <div style={{ backgroundColor: 'transparent', height: 50, display: 'flex', flexDirection: isMobileView ? 'column' : 'row', alignItems: 'center' }}>
                            <div style={{ marginRight: '20px', fontSize: 20, marginLeft: '10px' }}>🤔</div>
                            <div style={{ marginRight: '10px', fontSize: 20, fontFamily: "DMM", fontStyle: 'bold' }}>{question}</div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: isMobileView ? 'column' : 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                            <div style={sliderContainerStyle}>
                                <div style={sliderStyle}>
                                <img
                                                src={image}
                                               
                                                style={{
                                                    width: isMobileView ? "100%" : '100%',
                                                    height: '350px',
                                                    borderRadius: 30,
                                                    marginLeft:'200px',
                                                    marginTop:'40px'

                                                }}
                                            />
                                </div>
                            </div>
                            <div style={{ backgroundColor: 'transparent', width: isMobileView ? '80%' : '30%', height: '400px', marginLeft: '50px', marginRight: '50px', position: 'relative', display: 'flex', flexDirection: 'column' }}>
                                <p style={{ color: 'grey', fontFamily: 'DMM', textAlign: 'left', fontSize: 25, marginBottom: isMobileView ? '0px' : '5px' }}>
                                    Mood State💡
                                </p>
                                <p style={{ color: '#5813EA', fontFamily: 'DMM', textAlign: 'left', fontSize: 35, marginTop: isMobileView ? '0px' : '5px', fontWeight: '500', marginBottom: '5px' }}>

                                    Despondent 😔
                                </p>
                                <p style={{ color: 'grey', fontFamily: 'DMM', textAlign: 'left', fontSize: 15, marginBottom: '1px' }}>
                                    Answered by: {author} <br />
                                    Date: {date}
                                </p>
                                <button
                                    style={{
                                        fontFamily: 'DMM',
                                        fontSize: 15,
                                        color: 'white',
                                        backgroundColor: '#4285F4',
                                        borderRadius: 50,
                                        border: 'none',
                                        outline: 'none',
                                        padding: 10,
                                        paddingLeft: 15,
                                        paddingRight: 15,
                                        position: 'absolute',
                                        bottom: 0,
                                        cursor: 'pointer',
                                        marginBottom: isMobileView ? '100px' : '50px'
                                    }}
                                >
                                    Connect
                                </button>
                            </div>

                            {/* ------------aviral---------- */}
                            <div className="answer-section">
                                {messages.map((message, index) => (
                                    <div key={index} className="message">
                                        <p className="input">{message.input}</p>
                                        <p className="output">{message.output}</p>
                                    </div>
                                ))}
                            </div>
                            {/* ---------------- */}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%', // Set the desired width (e.g., 80% of the viewport)
                        height: '70%', // Set the desired height (e.g., 80% of the viewport)

                        maxWidth: '90%',
                        maxHeight: '90%',
                    },
                }}
            >
                <img
                    src={images[currentImageIndex]}
                    alt={`uploaded-${currentImageIndex}`}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                    }}
                />
                <button
                    onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1))}
                    style={{ position: 'absolute', top: '40%', left: '10px', fontSize: '50px', color: 'blue', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DMM' }}
                >
                    <p>{'<'}</p>
                </button>
                <button
                    onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)}
                    style={{ position: 'absolute', top: '50%', right: '0px', fontSize: '50px', color: 'blue', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'DMM' }}
                >
                    {'>'}
                </button>

            </Modal>
        </>
    );

};

export default Mood;




// Q : Since how long have you been feeling down, depressed, irritable, or hopeless?
// Ans : 4
// Q :Over the last two weeks for how many days have you had little interest or pleasure in doing things?
// Ans : 6
// Q :In the last 10 days for how long have you had trouble falling asleep, staying asleep, or have you been sleeping too much?
// Ans : 8
// Q :Since how long have you been feeling tired, or have you had little energy?
// Ans : 5
// Q :Since how long have you been feeling bad about yourself - or feeling that you are a failure, or that you have let yourself or your family down?
// Ans : 6
// Q :Since how long have you had trouble concentrating on things like officework, reading, or watching TV.
// Ans : 4
// Q :Since how you had thoughts that you would be better off dead, or of hurting yourself in some way?
// Ans : 3`