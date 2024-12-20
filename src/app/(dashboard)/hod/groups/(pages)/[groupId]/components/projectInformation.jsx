import ProjectInfoItem from "./projectInfoItem";

// components
import LanguageContainer from "./languageContainer";

// icons
import { SiMysql } from "react-icons/si";
import { IoLogoCss3, IoLogoHtml5, IoLogoJavascript } from "react-icons/io5";

export default function ProjectInformation({ projectInfo }) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-md shadow-sm lg:col-span-2">
                <h2 className="text-body-18 font-medium mb-3">Abstract</h2>
                <p className="text-body-16">{projectInfo?.abstract}</p>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm w-full">
                <h2 className="text-body-18 font-medium mb-3">More Information</h2>
                <div className="text-light-text flex justify-start items-start flex-col gap-3 w-full">
                    <ProjectInfoItem title='Type of Project' values={[projectInfo?.projectType]} />
                    <ProjectInfoItem title='Domain' values={[projectInfo?.domain]} />
                    <ProjectInfoItem title='Type of Application' values={[projectInfo?.appType]} />
                    <ProjectInfoItem title='Technologies/Tools' values={projectInfo?.technologies} />
                </div>
            </div>
            <div className="bg-white p-5 rounded-md shadow-sm w-full">
                <h2 className="text-body-18 font-medium mb-3">Languages used</h2>
                {/* <div className="text-light-text columns-3 sm:columns-3 md:columns-4 max-[1200px]:min-[1025px]:columns-2 lg:sm:columns-3 xl:sm:columns-4 space-y-5 w-full"> */}
                <div className="flex justify-start items-center flex-wrap gap-3">
                    {projectInfo?.languages.map((lang) => (
                        <LanguageContainer lang={lang} />
                    ))}
                </div>
            </div>
        </div>
    )
}