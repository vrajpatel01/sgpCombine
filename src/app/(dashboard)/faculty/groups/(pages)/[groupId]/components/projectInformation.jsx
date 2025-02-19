import ProjectInfoItem from "./projectInfoItem";

// components
import LanguageContainer from "./languageContainer";
import { cn } from "@/lib/utils";

export default function ProjectInformation({
  projectInfo,
  className,
  ...props
}) {
  return (
    <div
      className={cn("grid grid-cols-1 lg:grid-cols-2 gap-5 pb-5", className)}
      {...props}
    >
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Project Title</h2>
        <p className="text-body-16">{projectInfo?.title}</p>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Abstract</h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">{projectInfo?.abstract}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">
          Project Objective and Scope
        </h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">
            {projectInfo?.ProjectObjectivesAndScope}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">
          Background Study of Existing System
        </h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">
            {projectInfo?.BackgroundStudyOfExistingSystem}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Methodology/Approach</h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">{projectInfo?.Methodology_Approach}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">
          Tentative Project Planning/Timeline
        </h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">
            {projectInfo?.TentativeProjectPlan_Timeline}
          </p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Individual Role</h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">{projectInfo?.IndividualRole}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Innovation/Novelty</h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">{projectInfo?.Innovation_Novelty}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
        <h2 className="text-body-18 font-medium mb-3">Expected Outcomes</h2>
        <div className="overflow-x-scroll pb-4">
          <p className="text-body-16">{projectInfo?.ExpectedOutcome}</p>
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm w-full">
        <h2 className="text-body-18 font-medium mb-3">More Information</h2>
        <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full">
          <ProjectInfoItem
            title="Type of Project"
            values={[projectInfo?.projectType]}
          />
          <ProjectInfoItem title="Domain" values={[projectInfo?.domain]} />
          <ProjectInfoItem
            title="Type of Application"
            values={[projectInfo?.appType]}
          />
          <ProjectInfoItem
            title="Technologies/Tools"
            values={projectInfo?.technologies}
          />
        </div>
      </div>
      <div className="bg-white p-5 rounded-md shadow-sm w-full">
        <h2 className="text-body-18 font-medium mb-3">Languages used</h2>
        <div className="flex justify-start items-center flex-wrap gap-3">
          {projectInfo?.languages.map((lang) => (
            <LanguageContainer lang={lang} />
          ))}
        </div>
      </div>
    </div>
  );
}
