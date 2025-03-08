"use client";
import TableRow from "@/components/shared/table/tableRow";
import TableCell from "@/components/shared/table/tableCell";
import { useGetStudentsWithoutGroup } from "../../(students)/services/query";
import Skeleton from "react-loading-skeleton";
import { Button } from "@/components/ui/button";
import { useRef, useState } from "react";
import { EmailStatusModel } from "../model/emailStatusMode";
import { Dialog } from "@/components/ui/dialog";

export function StudentWithoutGroupComp() {
  const tableRef = useRef();
  const studentWithoutGroup = useGetStudentsWithoutGroup();
  const [emailSendDialog, setEmailSendDialog] = useState(false);

  const tableStyle = `
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          padding: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 10px;
          text-align: left;
        }
        th {
          background-color: #f4f4f4;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        tr:hover {
          background-color: #f1f1f1;
        }
      </style>
    `;
  const handleButtonClick = () => {
    const printContent = tableRef.current;
    const WindowPrt = window.open(
      "",
      "",
      "left=0,top=0,width=900,height=900,toolbar=0,scrollbars=0,status=0"
    );

    WindowPrt.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          ${tableStyle}
        </head>
        <body>
          ${printContent.outerHTML}
        </body>
      </html>
    `);

    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  };

  return (
    <>
      <div className="flex justify-end items-center gap-3">
        <Button onClick={() => setEmailSendDialog(true)}>Send Reminder</Button>
        <Button onClick={handleButtonClick}>Print</Button>
      </div>
      <div className="table-container mb-6 overflow-x-auto no-scroll  bg-white rounded-md w-full my-5 border-border border-[.5px]">
        <table border={1} ref={tableRef} className="w-full table-auto">
          <thead className="border-b-1 border-border">
            <TableRow header>
              {/* {students.isSuccess && <TableCell content="" />} */}
              <TableCell content="Name" />
              <TableCell content="Enrollment" />
              <TableCell content="Email" />
              <TableCell content="Phone" />
              <TableCell content="Batch" />
              <TableCell content="Division" />
            </TableRow>
          </thead>
          <tbody className="divide-y">
            {studentWithoutGroup.isLoading &&
              Array(15)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell content={<Skeleton height={30} width={300} />} />
                    <TableCell content={<Skeleton height={30} width={300} />} />
                    <TableCell content={<Skeleton height={30} width={300} />} />
                    <TableCell content={<Skeleton height={30} width={300} />} />
                    <TableCell content={<Skeleton height={30} width={300} />} />
                    <TableCell content={<Skeleton height={30} width={300} />} />
                  </TableRow>
                ))}
            {studentWithoutGroup.isSuccess &&
              studentWithoutGroup?.data?.students?.map((student, index) => (
                <TableRow id={student._id} key={index}>
                  <TableCell content={student.name} />
                  <TableCell content={student.rollNumber} />
                  <TableCell content={student.email} />
                  <TableCell content={student.phoneNumber} />
                  <TableCell content={student.batch} />
                  <TableCell content={student.division} />
                </TableRow>
              ))}
          </tbody>
        </table>
      </div>
      <Dialog open={emailSendDialog} onOpenChange={setEmailSendDialog}>
        <EmailStatusModel
          model={emailSendDialog}
          setModel={setEmailSendDialog}
        />
      </Dialog>
    </>
  );
}
