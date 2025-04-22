import { CVData } from "./types";

export const defaultCV: CVData = {
  personalDetails: {
    name: "Alex Johnson",
    title: "Senior Software Engineer",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    website: "alexjohnson.dev",
    summary: "Results-driven software engineer with 8+ years of experience designing and developing scalable applications. Strong expertise in JavaScript, TypeScript, React, and Node.js. Passionate about creating elegant solutions to complex problems."
  },
  experience: [
    {
      id: "1",
      company: "Tech Innovations Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "Jan 2021",
      endDate: "",
      current: true,
      description: "Lead a team of 5 developers to build and maintain enterprise SaaS applications. Implemented microservices architecture that improved system scalability by 40%. Reduced API response time by 30% through optimizing database queries and implementing caching strategies."
    },
    {
      id: "2",
      company: "Data Systems LLC",
      position: "Software Engineer",
      location: "Oakland, CA",
      startDate: "Mar 2018",
      endDate: "Dec 2020",
      current: false,
      description: "Developed and maintained RESTful APIs for the company's flagship product. Implemented automated testing which increased code coverage from 65% to 90%. Collaborated with cross-functional teams to deliver features on time and within scope."
    },
    {
      id: "3",
      company: "WebDev Solutions",
      position: "Junior Developer",
      location: "Berkeley, CA",
      startDate: "Jun 2016",
      endDate: "Feb 2018",
      current: false,
      description: "Assisted in the development of responsive web applications using React.js. Collaborated with UX designers to implement pixel-perfect interfaces. Participated in code reviews and contributed to technical documentation."
    }
  ],
  education: [
    {
      id: "1",
      institution: "University of California, Berkeley",
      degree: "Master's",
      field: "Computer Science",
      location: "Berkeley, CA",
      startDate: "2014",
      endDate: "2016",
      current: false,
      description: "Specialized in Artificial Intelligence and Machine Learning. Graduated with honors."
    },
    {
      id: "2",
      institution: "Stanford University",
      degree: "Bachelor's",
      field: "Software Engineering",
      location: "Stanford, CA",
      startDate: "2010",
      endDate: "2014",
      current: false,
      description: "Participated in multiple hackathons and programming competitions. Member of the Computer Science Club."
    }
  ],
  skills: [
    {
      id: "1",
      name: "Programming Languages",
      skills: [
        { id: "101", name: "JavaScript", level: 5 },
        { id: "102", name: "TypeScript", level: 5 },
        { id: "103", name: "Python", level: 4 },
        { id: "104", name: "Java", level: 3 }
      ]
    },
    {
      id: "2",
      name: "Frontend Development",
      skills: [
        { id: "201", name: "React", level: 5 },
        { id: "202", name: "Next.js", level: 4 },
        { id: "203", name: "HTML/CSS", level: 5 },
        { id: "204", name: "Redux", level: 4 }
      ]
    },
    {
      id: "3",
      name: "Backend Development",
      skills: [
        { id: "301", name: "Node.js", level: 5 },
        { id: "302", name: "Express", level: 4 },
        { id: "303", name: "MongoDB", level: 4 },
        { id: "304", name: "PostgreSQL", level: 3 }
      ]
    }
  ],
  projects: [
    {
      id: "1",
      name: "E-commerce Platform",
      description: "Built a full-stack e-commerce platform using React, Node.js, and MongoDB. Implemented features such as product search, shopping cart, user authentication, and payment processing.",
      skills: ["React", "Node.js", "MongoDB", "Express"],
      link: "https://github.com/alexjohnson/ecommerce-platform",
      date: "2020 - 2021"
    },
    {
      id: "2",
      name: "Real-time Chat Application",
      description: "Developed a real-time chat application using Socket.io and React. Implemented features like private messaging, group chats, and message notifications.",
      skills: ["React", "Socket.io", "Express", "MongoDB"],
      link: "https://github.com/alexjohnson/chat-app",
      date: "2019"
    }
  ]
};