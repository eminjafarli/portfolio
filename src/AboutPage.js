import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 2fr 2fr;
    grid-template-rows: auto;
    gap: 20px;
    padding: 140px 30px;
    max-width: 12000px;
    margin: 0 auto;
    background-color: white;
    align-items: center;
    max-height: 379px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
        padding: 100px 20px;
        max-height: none;
        margin-top:20px;
    }
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;

    @media (max-width: 768px) {
        gap: 15px;
    }
`;

const MotionCard = styled(motion.div)`
    background-color: #f7f7f9;
    border-radius: 24px;
    padding: 21px;
    text-align: left;
    font-size: 16px;
    flex: 1;

    @media (max-width: 768px) {
        padding: 18px;
        font-size: 15px;
    }
`;

const Title = styled.h3`
    font-size: 22px;
    margin-bottom: 8px;
    margin-top: 8px;

    @media (max-width: 768px) {
        font-size: 20px;
    }
`;

const Text = styled.p`
    color: #666;
    font-size: 17px;

    @media (max-width: 768px) {
        font-size: 15px;
    }
`;

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};
const AboutPage = () => {
    return (
        <GridWrapper>
            <Column>
                <MotionCard {...fadeUp}>
                    <Title>About Me</Title>
                    <Text>I was born and raised in Baku, Azerbaijan. Since childhood, I’ve had a passion for bringing my ideas to life, and programming became the perfect way to do that. It gives me the freedom to turn imagination into something real — whether it’s a tool, a system, or a full application. For me, software development is more than just coding; it’s an unlimited workspace where creativity meets logic, and every project is a new opportunity to build something meaningful.</Text>
                </MotionCard>
                            <MotionCard {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
                    <Title>Education</Title>
                    <Text><b style={{ fontWeight: 600 }}>BSc in Information Technology</b><br />
                        <b style={{ fontWeight: 600 }}>Azerbaijani State University of Economics (2024-2028)</b><br />
                        <br />
                    Currently studying at the Faculty of Information Technology, where I’ve developed a strong foundation in computer science. Through my coursework, I’ve explored programming, algorithms, data structures, and software engineering — all of which have helped me grow both technically and logically as a developer.</Text></MotionCard>

            </Column>

            <Column>


                <MotionCard {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
                    <Title>Experience</Title>
                    <Text><b style={{ fontWeight: 600 }}>Junior Backend Developer Intern</b><br />
                        <b style={{ fontWeight: 600 }}>IDRAK Technology Transfer (2023-2025)</b><br />
                        <br />
                        Worked as an intern with a focus on backend web development.<br /> I had the opportunity to work on real-world projects where I helped build and maintain RESTful APIs using Spring Boot and managed data with PostgreSQL.<br /> I was involved in developing internal tools, writing clean, reusable code, and contributing to how the backend architecture was structured.<br />

                        <br /> Beyond coding, I took part in daily team meetings, code reviews, and sprint planning sessions, which gave me a deeper understanding of how real development teams work together.<br /> This experience taught me not just technical skills, but also how to communicate ideas clearly, solve problems collaboratively, and adapt to feedback in a fast-paced environment.
                        <br /> <br />It was a great introduction to agile workflows and gave me a clear picture of what it’s like to work as part of a professional team.</Text>
                </MotionCard>
            </Column>
        </GridWrapper>
    );
};

export default AboutPage;
