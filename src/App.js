import React, {useState} from 'react';
import styled from 'styled-components';
import {AnimatePresence, motion} from 'framer-motion';

import {
    FaJava, FaHtml5, FaCss3Alt, FaJs, FaReact,
    FaGitAlt
} from 'react-icons/fa';
import { SiPostgresql, SiSpring } from 'react-icons/si';
import AboutPage from "./AboutPage";
import {Route, Routes, NavLink, BrowserRouter as Router, useNavigate} from "react-router-dom";
import ContactChat from "./ContactChat";
import ProjectPage from "./ProjectPage";
import ScrollToTop from "./ScrollToTop";

const NavbarWrapper = styled.nav`
    width: 33%;
    height: 50px;
    border-radius: 100px;
    background-color: white;
    position: fixed;
    top: 2px;
    left: 50%;
    margin-top: 40px;
    transform: translateX(-50%);
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    display: flex;
    justify-content: space-around;
    align-items: stretch;

    @media (max-width: 768px) {
        width: 90%;
        height: 45px;
    }
`;

const StyledLink = styled(NavLink)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 85%;
    font-size: 16px;
    margin: 4px 3px;
    font-weight: 500;
    text-decoration: none;
    border-radius: 100px;
    transition: color 0.3s, background-color 0.3s;
    color: #999;

    &.active {
        background-color: #f2f2f2;
        color: black;
    }

    &:hover {
        color: black;
    }
`;

const Navbar = () => (
    <NavbarWrapper>
        <StyledLink to="/" end>Home</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <StyledLink to="/projects">Projects</StyledLink>
        <StyledLink to="/contact">Contact</StyledLink>
    </NavbarWrapper>
);

const Wrapper = styled.div`
    background-color: white;
    padding: 121px 30px 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    @media (max-width: 768px) {
        padding: 100px 15px 40px;
        grid-template-columns: 1fr;
    }
`;

const Card = styled.div`
    position: relative;
    background-color: #f7f7f9;
    border-radius: 24px;
    padding: 30px;
    display: flex;
    flex-direction: column;
    text-align: left;

    @media (max-width: 768px) {
        flex-direction: column;
        grid-column: span 1 !important;
        grid-row: auto !important;
    }
    ${props => props.large && `grid-column: span 2; grid-row: span 2;`}
    ${props => props.long && `grid-column: span 2; grid-row: span 1;`}
    ${props => props.top && `margin-top: 20px;`}
    ${props => props.row && `flex-direction: row; align-items: flex-start;`}

`;
const MotionCard = motion(Card);

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;

    @media (max-width: 768px) {
        margin-left: 45px;
        align-items: center;
    }
`;

const CardImage = styled.img`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

    @media (max-width: 768px) {
        margin: 0 auto 10px;
    }
`;

const PlaceholderTitle = styled.h3`
    font-size: 30px;
    font-weight: 620;
    margin-bottom: -1px;
    @media (max-width: 768px) {
        font-size: 24px;
        margin-left: 0;
        text-align: center;
    }
    ${props => props.normal && `
    margin-top: -15px;
    margin-left: 27px;
  `}
    ${props => props.project && `
    margin-top: -15px;
    margin-left: 0px;
  `}
    
`;

const FooterWrapper = styled.footer`
    width: 60%;
    text-align: center;
    padding: 20px;
    font-size: 14px;
    color: #777;
    margin-left: auto;
    margin-right: auto;
    margin-top: 45px;
    background-color: transparent;

    @media (max-width: 768px) {
        width: 90%;
        font-size: 13px;
    }
`;
const Footer = () => (
    <FooterWrapper>
        © 2025. Hand-Crafted & Made by Emin Jafarli
    </FooterWrapper>
);

const PlaceholderText = styled.p`
    font-size: 16px;
    color: #676666;
    margin-bottom: -5px;
    @media (max-width: 768px) {
        font-size: 15px;
        ${props => props.bigtext && `font-size: 18px;`}
        text-align: center;
    }
    ${props => props.bigtext && `
    font-size: 24px;
  `}
    
`;

const SkillsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    margin-top: 20px;
    margin-left: 8px;

    @media (max-width: 768px) {
        margin-left: 0;
    }
`;

const Skill = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #676666;

    @media (max-width: 768px) {
        justify-content: center;
    }
`;

const ProjectList = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 15px;
`;

const HoverLabel = styled(motion.div)`
    position: absolute;
    left: 100%;
    bottom: 50%;
    transform: translateY(-50%);
    margin-left: -85px;
    margin-bottom: 28px;
    background: white;
    color: #333;
    padding: 4px 10px;
    font-size: 13px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    white-space: nowrap;
    pointer-events: none;
    z-index: 1003;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.95);
    z-index: 500;
    pointer-events: none;
`;

const CardArrowButton = styled.button`
    position: absolute;
    bottom: 15px;
    right: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: none;
    background-color: white;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
        transform: rotate(-45deg);
    }

    svg {
        width: 20px;
        height: 20px;
        transform: rotate(90deg);
    }
`;

const ProjectCard = styled.div`
    margin-top: 15px;
    background-color: #e8e8e8;
    border-radius: 12px;
    padding: 15px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
        background-color: #dcdcdc;
    }

    h4 {
        margin: 0 0 8px 0;
    }

    p {
        margin: 0;
        color: #444;
    }
`;

const projectsData = [
    {
        title: "BookStore App",
        description: "Bookstore is a web application that allows users to browse, add, edit, and manage books."
    }
];


const HomePage = () => {
    const navigate = useNavigate();
    const [hoverCardActive, setHoverCardActive] = useState(false);
    const [activeOverlayCard, setActiveOverlayCard] = useState(null);


    return (
        <>
            {activeOverlayCard === 'intro' && (<Overlay initial={{ opacity: 0 }}
                                         animate={{ opacity: 1 }}
                                         exit={{ opacity: 0 }}
                                         transition={{ duration: 0.2 }}/>)}
            {activeOverlayCard === 'profile' && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}
            {activeOverlayCard === 'project' && (
                <Overlay
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                />
            )}




            <Wrapper>
            <MotionCard
                large
                top
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6}}
                style={{
                    zIndex: activeOverlayCard === 'intro' ? 1001 : 'auto',
                    position: activeOverlayCard === 'intro' ? 'relative' : 'relative',
                }}
            >
                <CardArrowButton
                    onClick={() => navigate(`/about`)}
                    onMouseEnter={() => setActiveOverlayCard('intro')}
                    onMouseLeave={() => setActiveOverlayCard(null)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M17 17H7V7" />
                    </svg>

                    <AnimatePresence>
                        {activeOverlayCard === 'intro' && (
                            <HoverLabel
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0, rotate:45 }}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                About
                            </HoverLabel>
                        )}
                    </AnimatePresence>
                </CardArrowButton>


                <PlaceholderTitle>
                    <span style={{color: '#8F8F8F'}}>Hi, I'm</span> <span style={{color: 'black'}}>Emin Jafarli.</span>
                </PlaceholderTitle>
                <PlaceholderText bigtext>
                    I am an 18 year old information technology student and software developer with a strong foundation
                    in creating reliable and user-friendly web applications. Committed to continuous learning, I
                    approach challenges with analytical problem-solving skills and a dedication to professional growth.
                    My goal is to leverage emerging technologies to deliver effective solutions while advancing my
                    expertise in the field.
                </PlaceholderText>
            </MotionCard>

            <MotionCard
                long
                top
                row
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.1}}
                style={{
                    zIndex: activeOverlayCard === 'profile' ? 1001 : 'auto',
                    position: activeOverlayCard === 'profile' ? 'relative' : 'relative',
                }}
            >

                <CardArrowButton
                    onClick={() => navigate(`/contact`)}
                    onMouseEnter={() => setActiveOverlayCard('profile')}
                    onMouseLeave={() => setActiveOverlayCard(null)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="black">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 7L7 17M17 17H7V7" />
                    </svg>

                    <AnimatePresence>
                        {activeOverlayCard === 'profile' && (
                            <HoverLabel
                                style={{ marginLeft: '-95px', marginBottom: '32px' }}
                                initial={{ opacity: 0, y: 4 }}
                                animate={{ opacity: 1, y: 0, rotate: 45}}
                                exit={{ opacity: 0, y: 4 }}
                                transition={{ duration: 0.2 }}
                            >
                                Contact
                            </HoverLabel>
                        )}
                    </AnimatePresence>
                </CardArrowButton>

                <CardImage src="/emin1.png" alt="Emin"/>
                <TextWrapper>
                    <PlaceholderTitle>Emin Jafarli</PlaceholderTitle>
                    <PlaceholderText>Full-Stack Developer, IT Student</PlaceholderText>
                </TextWrapper>
            </MotionCard>

            <MotionCard
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.2}}
            >
                <PlaceholderTitle normal>Technical Skills</PlaceholderTitle>
                <SkillsGrid>
                    <Skill><FaJava color="#007396" size={24}/> Java</Skill>
                    <Skill><FaReact color="#61DBFB" size={24}/> React</Skill>
                    <Skill><SiSpring color="#6DB33F" size={24}/> Spring Boot</Skill>
                    <Skill><FaHtml5 color="#E34F26" size={24}/> HTML</Skill>
                    <Skill><SiPostgresql color="#336791" size={24}/> PostgreSQL</Skill>
                    <Skill><FaCss3Alt color="#1572B6" size={24}/> CSS</Skill>
                    <Skill><FaGitAlt color="#F05032" size={24}/> Git</Skill>
                    <Skill><FaJs color="#F7DF1E" size={24}/> JavaScript</Skill>
                </SkillsGrid>
            </MotionCard>
            <MotionCard
                initial={{opacity: 0, y: 30}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, delay: 0.3}}
            >
                <PlaceholderTitle project>Projects</PlaceholderTitle>
                <ProjectList>
                    {projectsData.map(({title, description}) => (
                        <ProjectCard style={{
                            zIndex: activeOverlayCard === 'project' ? 1001 : 'auto',
                            position: activeOverlayCard === 'project' ? 'relative' : 'relative',
                        }}
                            key={title}
                                     onClick={() => navigate(`/projects`)}
                                     onMouseEnter={() => setActiveOverlayCard('project')}
                                     onMouseLeave={() => setActiveOverlayCard(null)}>
                            <AnimatePresence>
                                {activeOverlayCard === 'project' && (
                                    <HoverLabel
                                        style={{ marginLeft: '-162px', marginBottom: '-95px' }}
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 4 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        Projects
                                    </HoverLabel>
                                )}
                            </AnimatePresence>

                            <h4>{title}</h4>
                            <p>{description}</p>
                        </ProjectCard>
                    ))}
                </ProjectList>
            </MotionCard>
        </Wrapper>
            </>
    );
};
function App() {
    return (
        <Router>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactChat />} />
                <Route path="/projects" element={<ProjectPage />} />
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
