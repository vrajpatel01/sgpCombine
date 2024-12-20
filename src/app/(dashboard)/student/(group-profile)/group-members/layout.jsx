import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GroupMemberLayout({ children }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Group Members</CardTitle>
                <CardDescription>
                    Add group members to your group.
                </CardDescription>
            </CardHeader>
            {children}
        </Card>
    )
}