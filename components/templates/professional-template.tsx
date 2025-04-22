import { CVData } from "@/lib/types";

interface ProfessionalTemplateProps {
  cvData: CVData;
}

export default function ProfessionalTemplate({ cvData }: ProfessionalTemplateProps) {
  const { personalDetails, experience, education, skills, projects } = cvData;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="mb-8 border-b-2 border-gray-800 pb-4">
        <h1 className="text-3xl font-bold mb-1">{personalDetails.name || "Your Name"}</h1>
        <h2 className="text-xl text-gray-600 mb-3">{personalDetails.title || "Professional Title"}</h2>
        
        <div className="flex flex-wrap gap-4 text-sm">
          {personalDetails.email && (
            <div>Email: {personalDetails.email}</div>
          )}
          {personalDetails.phone && (
            <div>Phone: {personalDetails.phone}</div>
          )}
          {personalDetails.location && (
            <div>Location: {personalDetails.location}</div>
          )}
          {personalDetails.website && (
            <div>Website: {personalDetails.website}</div>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalDetails.summary && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Professional Summary</h3>
          <p>{personalDetails.summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Work Experience</h3>
          
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between">
                  <h4 className="font-bold">{exp.position}</h4>
                  <span className="text-gray-600">
                    {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between">
                  <h5 className="text-gray-700">{exp.company}</h5>
                  {exp.location && <span className="text-gray-600">{exp.location}</span>}
                </div>
                {exp.description && <p className="mt-1">{exp.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Education</h3>
          
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                <div className="flex justify-between">
                  <h4 className="font-bold">{edu.degree}{edu.field ? `, ${edu.field}` : ""}</h4>
                  <span className="text-gray-600">
                    {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                  </span>
                </div>
                <h5 className="text-gray-700">{edu.institution}</h5>
                {edu.location && <div className="text-gray-600">{edu.location}</div>}
                {edu.description && <p className="mt-1">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Skills</h3>
          
          <div className="space-y-2">
            {skills.map((category) => (
              <div key={category.id}>
                <h4 className="font-semibold">{category.name}</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill.id} 
                      className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-bold border-b border-gray-300 mb-2 pb-1">Projects</h3>
          
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex justify-between">
                  <h4 className="font-bold">{project.name}</h4>
                  {project.date && <span className="text-gray-600">{project.date}</span>}
                </div>
                {project.link && (
                  <div className="text-blue-600 underline mb-1">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      {project.link}
                    </a>
                  </div>
                )}
                {project.description && <p>{project.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}