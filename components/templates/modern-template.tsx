import { CVData } from "@/lib/types";

interface ModernTemplateProps {
  cvData: CVData;
}

export default function ModernTemplate({ cvData }: ModernTemplateProps) {
  const { personalDetails, experience, education, skills, projects } = cvData;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6 -mx-8 -mt-8 mb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{personalDetails.name || "Your Name"}</h1>
          <h2 className="text-xl opacity-90 mb-4">{personalDetails.title || "Professional Title"}</h2>
          
          <div className="flex flex-wrap gap-6 text-sm mt-4">
            {personalDetails.email && (
              <div>
                <span className="font-semibold">Email:</span> {personalDetails.email}
              </div>
            )}
            {personalDetails.phone && (
              <div>
                <span className="font-semibold">Phone:</span> {personalDetails.phone}
              </div>
            )}
            {personalDetails.location && (
              <div>
                <span className="font-semibold">Location:</span> {personalDetails.location}
              </div>
            )}
            {personalDetails.website && (
              <div>
                <span className="font-semibold">Website:</span> {personalDetails.website}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="col-span-1 space-y-8">
          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 border-b-2 border-blue-600 pb-1">Skills</h3>
              
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.id}>
                    <h4 className="font-semibold mb-2">{category.name}</h4>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(skill.level || 3) * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm">{skill.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 border-b-2 border-blue-600 pb-1">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold">{edu.degree}</h4>
                    <div className="text-gray-700 mb-1">{edu.field}</div>
                    <div className="font-medium">{edu.institution}</div>
                    <div className="text-sm text-gray-600 mb-1">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                    {edu.location && <div className="text-sm text-gray-600 mb-2">{edu.location}</div>}
                    {edu.description && <p className="text-sm">{edu.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 space-y-8">
          {/* Summary */}
          {personalDetails.summary && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 border-b-2 border-blue-600 pb-1">Profile</h3>
              <p>{personalDetails.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 border-b-2 border-blue-600 pb-1">Work Experience</h3>
              
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold">{exp.position}</h4>
                      <span className="text-sm text-gray-600">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between items-baseline mb-2">
                      <h5 className="text-gray-800 font-semibold">{exp.company}</h5>
                      {exp.location && <span className="text-sm text-gray-600">{exp.location}</span>}
                    </div>
                    {exp.description && <p className="text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-lg font-bold mb-4 text-blue-600 border-b-2 border-blue-600 pb-1">Projects</h3>
              
              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.id}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h4 className="font-bold">{project.name}</h4>
                      {project.date && <span className="text-sm text-gray-600">{project.date}</span>}
                    </div>
                    {project.link && (
                      <div className="text-blue-600 text-sm mb-2">
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                          {project.link}
                        </a>
                      </div>
                    )}
                    {project.description && <p className="text-sm">{project.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}