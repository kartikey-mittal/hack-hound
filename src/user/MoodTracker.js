import React, { useState, useEffect } from 'react';
import Skills from '../assets/aaa.png'
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import Navbar from '../Navbar';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { db, collection, } from '../Firebase'
import { getToken } from "firebase/messaging";
import { messaging } from "../Firebase";
const skillsData = ['C++', 'JavaScript', 'Python', 'React', 'Node.js', "C", 'Java', 'PHP'];
const professionData = ['Student', 'Working Professional', 'Freelancer'];



const Profile = () => {
    const [value, setValue] = useState(0);

    // If initialValue can change and you want to reset the slider when it does:
    useEffect(() => {
        setValue(0);
    }, [0]);

    const handleChange = (event) => {
        setValue(event.target.value);
        console.log(event.target.value);
    };
    //slider color
    const [sliderValue, setSliderValue] = useState(0); // Initial slider value

    const [isLeftSectionVisible, setIsLeftSectionVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsLeftSectionVisible(window.innerWidth > 615);
        };

        // Add event listener for window resize
        window.addEventListener('resize', handleResize);

        // Initial check on mount
        handleResize();

        // Remove event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    const handleSliderChange = (newValue) => {
        // Update the slider value
        setSliderValue(newValue);
    };

    // useEffect(() => {
    //     // Req user for notification permission
    //     requestPermission();
    //   }, []);



    //   async function requestPermission() {
    //     const permission = await Notification.requestPermission();
    //     if (permission === "granted") {
    //       //Generate Token
    //       const token = await getToken(messaging, {
    //         vapidKey:
    //           "BKv8mFnjjmLOQt0PJHotmX37n0BTsOF_IaT2vBPv8TyhOVzaHkG32cuFfoDwrgbd3f27d2yNoTBz-Bx_q5H3D1o",
    //       });
    //       console.log("Token Gen",token);
    //       // Send this token  to server ( db)
    //     } else if (permission === "denied") {
    //       alert("You denied for the notification");
    //     }
    //   }


    const navigate = useNavigate();

    const { id } = useParams();
    const [step, setStep] = useState(1);

    const [selectedSkill, setSelectedSkill] = useState([]);
    const [selectedProfession, setSelectedProfession] = useState(null);
    const [githubProfile, setGithubProfile] = useState('');
    const [gfgProfile, setGfgProfile] = useState('');

    useEffect(() => {
        if (step === 4) {
            const selectedSkills = selectedSkill.map((index) => skillsData[index]);

            console.log('Selected Skills:', selectedSkills);
            console.log('Selected Profession:', selectedProfession);
            console.log('GitHub Profile:', githubProfile);
            console.log('GFG Profile:', gfgProfile);

            //   const skilledCollectionRef = collection(db, 'Skilled');
            //   const skilledDocRef = doc(skilledCollectionRef, id);

            //   const fetchFCMToken = async () => {
            //         try {
            //             const permission = await Notification.requestPermission();
            //             if (permission === "granted") {
            //                 // Generate Token
            //                 const token = await getToken(messaging, {
            //                     vapidKey: "BKv8mFnjjmLOQt0PJHotmX37n0BTsOF_IaT2vBPv8TyhOVzaHkG32cuFfoDwrgbd3f27d2yNoTBz-Bx_q5H3D1o",
            //                 });
            //                 console.log("Token Gen", token);

            //                 // Save FCM token in Firestore
            //                 const skilledCollectionRef = collection(db, 'Skilled');
            //                 const skilledDocRef = doc(skilledCollectionRef, id);
            //                 const docSnapshot = await getDoc(skilledDocRef);
            //                 const existingData = docSnapshot.data();

            //                 const updatedData = {
            //                     ...existingData,
            //                     selectedSkills: selectedSkills || existingData.selectedSkills,
            //                     selectedProfession: selectedProfession || existingData.selectedProfession,
            //                     githubProfile: githubProfile || existingData.githubProfile,
            //                     gfgProfile: gfgProfile || existingData.gfgProfile,
            //                     fcmtoken: token, // Save FCM token here
            //                 };

            //                 await setDoc(skilledDocRef, updatedData);

            //                 // Store data in localStorage
            //                 localStorage.setItem('SkilledSkillsArray', JSON.stringify(updatedData.selectedSkills || []));
            //                 localStorage.setItem('SkilledProfession', updatedData.selectedProfession || '');

            //                 alert('Data saved to Firestore!');
            //                 navigate('/skilled/home');
            //             } else if (permission === "denied") {
            //                 alert("You denied permission for notifications");
            //             }
            //         } catch (error) {
            //             console.error('Error fetching or saving FCM token:', error);
            //         }
            //     };

            // fetchFCMToken();
        }
    }, [selectedSkill, step, selectedProfession, githubProfile, gfgProfile, id, navigate]);

    const handleContinue = () => {
        if (step === 1) {
            
            setStep((prevStep) => prevStep + 1);
            localStorage.setItem('Step1', value);
        } else if (step === 2 ) {
            console.log('step 2');
            setStep((prevStep) => prevStep + 2);
            localStorage.setItem('Step2', value);
        } 
        else if (step === 4) {
            setStep((prevStep) => prevStep + 1);
            localStorage.setItem('Step4', value);
        }
        else if (step === 5) {
            setStep((prevStep) => prevStep + 1);
            localStorage.setItem('Step5', value);
        }
        else if (step === 6) {
            setStep((prevStep) => prevStep + 1);
            localStorage.setItem('Step6', value);
            console.log('_---------------_---------------_-------_');
            console.log(localStorage.getItem('step1'));
            console.log(localStorage.getItem('step2'));
            console.log(localStorage.getItem('step4'));
            console.log(localStorage.getItem('step5'));
            navigate('/mood');
        }
    };
    // const handleback = () => {
    //     setStep((prevStep) => prevStep - 1);
    // };


    // const [selectedSkill, setSelectedSkill] = useState(null);
    const [isSkillClicked, setIsSkillClicked] = useState(false);

    const selectedBgColor = '#4285F4';
    const selectedTextColor = 'white';
    const initialBorderRadius = 50;
    const borderColor = 'black';
    const borderWidth = '0.2px';
    const bgColor = "white";
    const textColor = "black";

    const handleSkillClick = (index) => {
        if (selectedSkill.includes(index)) {
            // If the skill is already selected, remove it
            setSelectedSkill((prevSkills) => prevSkills.filter((skill) => skill !== index));
        } else {
            // If the skill is not selected, add it
            setSelectedSkill((prevSkills) => [...prevSkills, index]);
        }

        // Set isSkillClicked to true when a skill is clicked
        setIsSkillClicked(true);
    };

    // const handleProfessionClick = (index) => {
    //     // Set isSkillClicked to false when a profession is selected
    //     setIsSkillClicked(false);

    //     setSelectedProfession(professionData[index]);
    // };




    const homeStyle = {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        padding: 20,
        background: `
        repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(242, 242, 242, 0.8) 50px, rgba(242, 242, 242, 0.8) 51px),
        repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(242, 242, 242, 0.8) 50px, rgba(242, 242, 242, 0.8)51px),
        #ff7b6a  `,
    };


    const contentStyle = {
        width: '85%',
        height: '85vh',
        border: '1px solid #ccc',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Center items horizontally
        overflow: 'hidden',
        backgroundColor: '#F3F6FC'
    };

    const mainboxStyle = {
        width: '90%',
        height: '90%',
        backgroundColor: "#EEF4FE",
        borderRadius: 15,
        margin: 'auto',
        marginTop: '20px',
        boxShadow: '0px 08px 10px rgba(0, 0, 0, 0.1)',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    };

    const skillContainerStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        width: '100%',
        gap: isLeftSectionVisible ? 0 : 10,
        marginLeft: isLeftSectionVisible ? -2 : -5,
    };

    const skillButtonStyle = {
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: initialBorderRadius,
        border: `1px solid ${borderColor}`,
        borderWidth: borderWidth,
        fontFamily: 'DMM',
        padding: '10px',
        outline: 'none',
        margin: '5px',
        minWidth: '80px',
        whiteSpace: 'nowrap',
        marginLeft: 40
    };



    const continueButtonStyle = {
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


    };



    const styles = {
        emailLabel: {

            color: '#7D716A',
            fontFamily: 'DMM',
            fontSize: 15,
            marginTop: 50,
            fontWeight: 500
        },
        leftSectionHidden: {
            display: isLeftSectionVisible ? 'flex' : 'none',
        },

        passwordLabel: {

            color: '#7D716A',
            fontFamily: 'DMM',
            fontSize: 15,
            marginTop: 20,
            fontWeight: 500
        },
        inputField: {
            borderRadius: 10,
            margin: 5,
            padding: '10px',
            width: '80%',
            borderColor: '#7D716A',
            borderWidth: '0.5px',
            fontFamily: 'DMM',
        },
    };

    let color;
    if (value < 5) {
        color = 'red';
    } else if (value >= 5 && value <= 8) {
        color = 'orange';
    } else {
        color = 'green';
    }

    return (
        <>
            <Navbar />
            <div style={homeStyle}>
                <div style={contentStyle}>
                    <div style={mainboxStyle}>
                        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                            <div style={{ width: '45%', height: '500px', backgroundColor: "#EEF4FE", marginTop: '20px', borderRadius: '20px', justifyContent: 'center', alignContent: 'center', alignItems: 'center', display: 'flex', ...styles.leftSectionHidden }}>

                                <img src={Skills} alt="Logo" style={{ height: '80%', width: '80 %',borderRadius:'25px' }} />
                            </div>


                            {/* Skills */}

                            
                            {/* ************************************************* */}

                            {/* PROFESSION */}
                            {step === 1 && (
                                <>
                                    <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                        <div style={{ margin: "30px", textAlign: "left" }}>
                                            <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>Since how long have you been feeling down, depressed, irritable, or hopeless?
</h2>

                                        </div>


                                        <input
                                            type="range"
                                            min="0"
                                            max="10"
                                            value={value}
                                            onChange={handleChange}
                                            style={{
                                                width: '100%',
                                                height: '10px',
                                                background: color, // Gradient color
                                                outline: 'none',
                                                borderRadius: '5px',
                                                overflow: 'hidden'
                                            }}
                                        />
                                        <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                        <div style={{ marginTop: '140px' }}>
                                            <button
                                                 style={continueButtonStyle}
                                                onClick={handleContinue} // Pass a function reference
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}


                            {/* ************************************************* */}


                            {/* PROFILE */}
                            {step === 2 && (
                                <>
                                <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                    <div style={{ margin: "30px", textAlign: "left" }}>
                                        <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>Over the last two weeks for how many days have you had little interest or pleasure in doing things?</h2>

                                    </div>


                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={value}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            height: '10px',
                                            background: color, // Gradient color
                                            outline: 'none',
                                            borderRadius: '5px',
                                            overflow: 'hidden'
                                        }}
                                    />
                                    <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                    <div style={{ marginTop: '140px' }}>
                                        <button
                                             style={continueButtonStyle}
                                            onClick={handleContinue} // Pass a function reference
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </>
                            )}

                            {/* PROFESSION */}
                            {step === 4 && (
                                 <>
                                 <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                     <div style={{ margin: "30px", textAlign: "left" }}>
                                         <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>Over the last two weeks for how many days have you had little interest or pleasure in doing things?</h2>
 
                                     </div>
 
 
                                     <input
                                         type="range"
                                         min="0"
                                         max="10"
                                         value={value}
                                         onChange={handleChange}
                                         style={{
                                             width: '100%',
                                             height: '10px',
                                             background: color, // Gradient color
                                             outline: 'none',
                                             borderRadius: '5px',
                                             overflow: 'hidden'
                                         }}
                                     />
                                     <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                     <div style={{ marginTop: '140px' }}>
                                         <button
                                              style={continueButtonStyle}
                                             onClick={handleContinue} // Pass a function reference
                                         >
                                             Continue
                                         </button>
                                     </div>
                                 </div>
                             </>
                            )}

                            {step === 5 && (
                                <>
                                <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                    <div style={{ margin: "30px", textAlign: "left" }}>
                                        <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>Since how long have you been feeling bad about yourself - or feeling that you are a failure, or that you have let yourself or your family down?</h2>

                                    </div>


                                    <input
                                        type="range"
                                        min="0"
                                        max="10"
                                        value={value}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            height: '10px',
                                            background: color, // Gradient color
                                            outline: 'none',
                                            borderRadius: '5px',
                                            overflow: 'hidden'
                                        }}
                                    />
                                    <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                    <div style={{ marginTop: '140px' }}>
                                        <button
                                             style={continueButtonStyle}
                                            onClick={handleContinue} // Pass a function reference
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            </>
                            )}

                            {step === 6 && (
                                 <>
                                 <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                     <div style={{ margin: "30px", textAlign: "left" }}>
                                         <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>Since how long have you had trouble concentrating on things like officework, reading, or watching TV</h2>

                                     </div>


                                     <input
                                         type="range"
                                         min="0"
                                         max="10"
                                         value={value}
                                         onChange={handleChange}
                                         style={{
                                             width: '100%',
                                             height: '10px',
                                             background: color, // Gradient color
                                             outline: 'none',
                                             borderRadius: '5px',
                                             overflow: 'hidden'
                                         }}
                                     />
                                     <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                     <div style={{ marginTop: '140px' }}>
                                         <button
                                              style={continueButtonStyle}
                                             onClick={handleContinue} // Pass a function reference
                                         >
                                             Continue
                                         </button>
                                     </div>
                                 </div>
                             </>
                            )}

                            {step === 7 && (
                                <>
                                    <div style={{ width: isLeftSectionVisible ? '80%' : '100%', height: '500px', backgroundColor: "white", marginTop: '20px', borderRadius: '20px' }}>
                                        <div style={{ margin: "30px", textAlign: "left" }}>
                                            <h2 style={{ fontWeight: 500, fontFamily: 'DMM', wordSpacing: '1px', letterSpacing: '1px', lineHeight: '1.2', color: '1E1E1E' }}>In the last 10 days for how long have you had trouble falling asleep, staying asleep, or have you been sleeping too much?</h2>

                                        </div>
                                        <input
                                         type="range"
                                         min="0"
                                         max="10"
                                         value={value}
                                         onChange={handleChange}
                                         style={{
                                             width: '100%',
                                             height: '10px',
                                             background: color, // Gradient color
                                             outline: 'none',
                                             borderRadius: '5px',
                                             overflow: 'hidden'
                                         }}
                                     />
                                     <p style={{ textAlign: 'center' }}>Value: {value}</p>
                                     <div style={{ marginTop: '140px' }}>
                                         <button
                                              style={continueButtonStyle}
                                             onClick={handleContinue} // Pass a function reference
                                         >
                                             Continue
                                         </button>
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* ************************************************* */}



                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;