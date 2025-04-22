import { CVData } from "@/lib/types";

interface CreativeTemplateProps {
  cvData: CVData;
}

export default function CreativeTemplate({ cvData }: CreativeTemplateProps) {
  const { personalDetails, experience, education, skills, projects } = cvData;

  return (
    <div className="bg-white text-gray-900 p-8 max-w-4xl mx-auto">
      <div className="grid grid-cols-12 gap-8">
        {/* Sidebar */}
        <div className="col-span-4 bg-gray-900 text-white p-6 rounded-lg">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-1">{personalDetails.name || "Your Name"}</h1>
            <h2 className="text-lg opacity-80 mb-4">{personalDetails.title || "Professional Title"}</h2>
            
            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-4"></div>
          </div>
          
          <div className="space-y-1 mb-8 text-sm">
            {personalDetails.email && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Email:</span>
                <span>{personalDetails.email}</span>
              </div>
            )}
            {personalDetails.phone && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Phone:</span>
                <span>{personalDetails.phone}</span>
              </div>
            )}
            {personalDetails.location && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Location:</span>
                <span>{personalDetails.location}</span>
              </div>
            )}
            {personalDetails.website && (
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">Website:</span>
                <span>{personalDetails.website}</span>
              </div>
            )}
          </div>

          {/* Skills */}
          {skills.length > 0 && (
            <section className="mb-8">
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Skills</h3>
              
              <div className="space-y-4">
                {skills.map((category) => (
                  <div key={category.id}>
                    <h4 className="font-medium mb-2 text-sm uppercase tracking-wider">{category.name}</h4>
                    <div className="space-y-2">
                      {category.skills.map((skill) => (
                        <div key={skill.id} className="flex items-center">
                          <div className="flex-1 flex items-center">
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div 
                                className="bg-yellow-400 h-1.5 rounded-full" 
                                style={{ width: `${(skill.level || 3) * 20}%` }}
                              ></div>
                            </div>
                          </div>
                          <span className="text-xs ml-2 min-w-[60px]">{skill.name}</span>
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
              <h3 className="text-lg font-bold mb-4 text-yellow-400">Education</h3>
              
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h4 className="font-bold text-sm">{edu.degree}</h4>
                    <div className="text-yellow-400 text-xs mb-1">{edu.field}</div>
                    <div className="text-sm">{edu.institution}</div>
                    <div className="text-xs opacity-75 mb-1">
                      {edu.startDate} - {edu.current ? "Present" : edu.endDate}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Main Content */}
        <div className="col-span-8 p-6">
          {/* Summary */}
          {personalDetails.summary && (
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">About Me</h3>
              <p>{personalDetails.summary}</p>
            </section>
          )}

          {/* Experience */}
          {experience.length > 0 && (
            <section className="mb-8">
              <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Experience</h3>
              
              <div className="space-y-6">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                    <div className="absolute w-3 h-3 bg-yellow-400 rounded-full -left-[7px] top-1.5"></div>
                    <h4 className="font-bold">{exp.position}</h4>
                    <div className="flex justify-between items-baseline mb-1">
                      <h5 className="text-gray-700 font-medium">{exp.company}</h5>
                      <span className="text-sm text-gray-500">
                        {exp.startDate} - {exp.current ? "Present" : exp.endDate}
                      </span>
                    </div>
                    {exp.location && <div className="text-sm text-gray-500 mb-2">{exp.location}</div>}
                    {exp.description && <p className="text-sm">{exp.description}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {projects.length > 0 && (
            <section>
              <h3 className="text-xl font-bold mb-4 border-b-2 border-gray-200 pb-2">Projects</h3>
              
              <div className="grid grid-cols-1 gap-6">
                {projects.map((project) => (
                  <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-baseline mb-2">
                      <h4 className="font-bold text-yellow-600">{project.name}</h4>
                      {project.date && <span className="text-sm text-gray-500">{project.date}</span>}
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