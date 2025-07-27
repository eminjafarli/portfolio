import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled.div`
    background-color: white;
    padding: 120px 30px 60px;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    height: 479px;
`;

const Card = styled.div`
    position: relative; 
    background-color: #f7f7f9;
    border-radius: 24px;
    padding: 20px;
    display: flex;
    height: 520px;
    flex-direction: column;
    text-align: left;
`;


const MotionCard = motion(Card);

const GifContainer = styled.div`
    display: flex;
    gap: 35px;
    margin-bottom: 15px;
    height: 80%;
    flex-direction: row;
    justify-content: center;

    @media (max-width: 768px) {
        flex-direction: column;
    }
`;

const GifWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 300px;
    border-radius: 16px;
    overflow: hidden;

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const GifLabel = styled.div`
    position: absolute;
    top: 8px;
    left: 8px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
    padding: 4px 8px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1;
`;

const ProjectGif = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 16px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
        width: 100%;
    }
`;

const ProjectTitle = styled.h3`
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 10px;
    margin-top: -105px;
`;

const ProjectDescription = styled.p`
    font-size: 22px;
    color: #676666;
    margin-top: 0px;
`;

const GitHubButton = styled.a`
    position: absolute;
    bottom: 20px;
    right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #24292e;
    color: white;
    text-decoration: none;
    box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #444c56;
    }

    svg {
        width: 24px;
        height: 24px;
        fill: white;
    }
`;


const ProjectsPage = () => {
    const projects = [
        {
            title: "BookStore App",
            description: " BookStore is a full-stack web app built with Java Spring Boot, SQL, and React. \n" +
                "    After logging in, users choose between managing members or books. The members dashboard lets admins view/edit user details with modals. \n" +
                "    The books dashboard is public — regular users can view and download books, while authorized roles can upload and manage them.",
            gifs: ["/book-admin.gif", "/book-user.gif"],
            githubUrl: "https://github.com/eminjafarli/BookStore"
        }
    ];

    return (
        <Wrapper>
            {projects.map((project, index) => (
                <MotionCard
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                    <GifContainer>
                        <GifWrapper>
                            <GifLabel>Admin's View</GifLabel>
                            <ProjectGif src={project.gifs[0]} alt="Admin View" />
                        </GifWrapper>
                        <GifWrapper>
                            <GifLabel>User's View</GifLabel>
                            <ProjectGif src={project.gifs[1]} alt="User View" />
                        </GifWrapper>
                    </GifContainer>
                    <ProjectTitle>{project.title}</ProjectTitle>
                    <ProjectDescription>{project.description}</ProjectDescription>

                    <GitHubButton
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View BookStore on GitHub"
                    >
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.372 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.112.82-.26.82-.577v-2.234c-3.338.726-4.033-1.415-4.033-1.415-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.083-.73.083-.73 1.205.085 1.838 1.238 1.838 1.238 1.07 1.835 2.807 1.305 3.492.997.108-.775.418-1.305.76-1.605-2.665-.3-5.466-1.335-5.466-5.93 0-1.31.47-2.38 1.237-3.22-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.46 11.46 0 013.003-.403c1.02.004 2.047.138 3.003.403 2.29-1.552 3.296-1.23 3.296-1.23.655 1.653.244 2.873.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.625-5.48 5.922.43.372.81 1.103.81 2.222v3.293c0 .319.217.694.825.576C20.565 21.796 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </GitHubButton>
                </MotionCard>
            ))}
        </Wrapper>
    );
};

export default ProjectsPage;
