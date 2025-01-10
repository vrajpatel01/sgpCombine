"use client";
import { createContext } from "react";
import { useState } from "react";
import {
  useGetGroupMembers,
  useGetGroupSelectionDate,
  useGetProjectDetails,
} from "../services/query";
import { useEffect } from "react";

export const GroupInfoContext = createContext();

export default function GroupInfoContextProvider({ children }) {
  const projectDetails = useGetProjectDetails();
  const groupSelectionDate = useGetGroupSelectionDate();
  const groupMembersInfo = useGetGroupMembers();
  const [dates, setDates] = useState({
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    if (groupSelectionDate.isSuccess) {
      const startDate = new Date(
        groupSelectionDate?.data?.data?.grSelectionStartDate
      );
      const endDate = new Date(
        groupSelectionDate?.data?.data?.grSelectionEndDate
      );
      const today = new Date().toISOString().split("T")[0];
      setDates({
        start: startDate.toISOString().split("T")[0] <= today,
        end: endDate.toISOString().split("T")[0] >= today,
      });
    }
  }, [groupSelectionDate.data, groupSelectionDate.isSuccess]);

  return (
    <GroupInfoContext.Provider
      value={{
        projectDetails,
        dates,
        groupMembersInfo,
        isLoading: {
          dates: groupSelectionDate.isLoading,
          projectDetails: projectDetails.isLoading,
          groupMembersInfo: groupMembersInfo.isLoading,
        },
      }}
    >
      {children}
    </GroupInfoContext.Provider>
  );
}
