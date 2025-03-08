import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StudentWithoutGroupComp } from "./components/students-without-group";

export default function FilteredStudentPage() {
  return (
    <div>
      <Tabs>
        <TabsList>
          <TabsTrigger>Students without group</TabsTrigger>
        </TabsList>
      </Tabs>
      <StudentWithoutGroupComp />
    </div>
  );
}
