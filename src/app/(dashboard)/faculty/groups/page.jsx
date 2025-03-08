import GroupsData from "./components/groupsData";
import { GroupStatusComp } from "./components/groupStatus";

export default function GroupsPage() {
  return (
    <div className="h-full">
      <div className="header flex justify-between items-center">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-title-28">Groups</h1>
        </div>
      </div>
      <GroupStatusComp />

      <div className="mt-5">
        <GroupsData />
      </div>
    </div>
  );
}
