export { default } from "next-auth/middleware"

export const config = {
    matcher: [
        "/",
        "/hod", "/hod/faculty", "/hod/students", "/hod/department", "/hod/settings", "/hod/groups", "/hod/groups/[groupId]", "/hod/assign", "/hod/assign/[facultyId]",
        "/coordinator", "/coordinator/faculty", "/coordinator/students", "/coordinator/department", "/coordinator/settings", "/coordinator/groups", "/coordinator/groups/[groupId]", "/coordinator/assign", "/coordinator/assign/[facultyId]",
        "/faculty", "/faculty/students", "/faculty/department", "/faculty/settings", "/faculty/groups", "/faculty/groups/[groupId]", "/faculty/assign", "/faculty/assign/[facultyId]",
        "/student", "/student/settings", "/student/groups", "/student/groups/[groupId]", "/student/weekly-reports", "/student/weekly-reports/[week]",
    ]
}