import { createContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useGetWeeklySubmissionData } from "../services/query";
import { useEditWeekInformation, useSaveWeekInformation } from "../services/mutation";
import { useLeader } from "@/hooks/useLeader";
import { useToast } from "@/hooks/use-toast";


export const SubmissionContext = createContext()

export default function SubmissionContextProvider({ children }) {
    const { toast } = useToast();
    const pathname = usePathname()
    const currentWeek = parseInt(pathname.charAt(pathname.length - 1));
    const addWeeklySubmission = useSaveWeekInformation();
    const updateWeeklySubmission = useEditWeekInformation();
    let getWeeklySubmission = useGetWeeklySubmissionData(currentWeek);
    const queryClient = useQueryClient()
    const [submission, setSubmission] = useState({
        expectedOutcome: '',
        workDone: '',
        studentsWork: '',
        isLocked: false,
    })

    const [loading, setLoading] = useState({
        lock: false,
        save: false
    })

    const [groupMembersInfo, isLeader] = useLeader()

    useEffect(() => {
        if (!getWeeklySubmission.isError && getWeeklySubmission.data && getWeeklySubmission.data.data !== null) {
            setSubmission({
                expectedOutcome: getWeeklySubmission.data.data.expectedOutcome,
                workDone: getWeeklySubmission.data.data.workDone,
                studentsWork: getWeeklySubmission.data.data.studentsWork,
                isLocked: getWeeklySubmission.data.data.isLocked,
            })
        } else {
            setSubmission({
                expectedOutcome: '',
                workDone: '',
                studentsWork: '',
                isLocked: false,
            })
        }
    }, [getWeeklySubmission.data, getWeeklySubmission.isError])

    const addData = (data) => {
        setSubmission({
            ...submission,
            ...data
        })
    }

    const isValueChanged = () => {
        if (!!getWeeklySubmission.data && getWeeklySubmission.data.data !== null) {
            return submission.expectedOutcome !== getWeeklySubmission.data.data.expectedOutcome ||
                submission.workDone !== getWeeklySubmission.data.data.workDone ||
                submission.studentsWork !== getWeeklySubmission.data.data.studentsWork
        }
        return !isEmpty();
    }

    const isEmpty = () => {
        if (isLeader) {
            return submission.expectedOutcome === '' || submission.workDone === '' || submission.studentsWork.length === 0;
        }
        return submission.studentsWork === '';
    }

    const lock = () => {
        setLoading({
            ...loading,
            lock: true
        })
        return updateWeeklySubmission.mutate({
            ...(submission.expectedOutcome !== getWeeklySubmission.data.data.expectedOutcome && { expectedOutcome: submission.expectedOutcome }),
            ...(submission.workDone !== getWeeklySubmission.data.data.workDone && { workDone: submission.workDone }),
            ...(submission.studentsWork !== getWeeklySubmission.data.data.studentsWork && { studentsWork: submission.studentsWork }),
            isLocked: true,
            week: currentWeek
        }, {
            onSuccess: async (data) => {
                if (data.success) {
                    await queryClient.invalidateQueries(['weekly-submission', currentWeek])
                    return toast({
                        title: "successful",
                        description: 'Information Locked successfully'
                    })
                }
            },
            onError: (error) => {
                toast({
                    title: 'Failed',
                    description: error.response.data.message
                })
            },
            onSettled: () => {
                setLoading({
                    ...loading,
                    lock: false
                })
            }
        })
    }

    const save = () => {
        console.log('save');
        setLoading({
            ...loading,
            save: true
        })
        if (getWeeklySubmission.data) {
            if (getWeeklySubmission.data.data === null) {
                return updateWeeklySubmission.mutate({
                    expectedOutcome: submission.expectedOutcome,
                    workDone: submission.workDone,
                    studentsWork: submission.studentsWork,
                    week: currentWeek
                }, {
                    onSuccess: async (data) => {
                        if (data.success) {
                            await queryClient.invalidateQueries(['weekly-submission', currentWeek])
                            setLoading({
                                ...loading,
                                save: true
                            })
                            return toast({
                                title: "successful",
                                description: 'Information Updated successfully'
                            })
                        }
                    },
                    onError: (error) => {
                        if (!error.response.data.success) {
                            setLoading({
                                ...loading,
                                save: true
                            })
                            return toast({
                                title: "Failed",
                                description: error.response.data.message
                            })
                        }
                    },
                })
            }
            return updateWeeklySubmission.mutate({
                ...(submission.expectedOutcome !== getWeeklySubmission.data.data.expectedOutcome && { expectedOutcome: submission.expectedOutcome }),
                ...(submission.workDone !== getWeeklySubmission.data.data.workDone && { workDone: submission.workDone }),
                ...(submission.studentsWork !== getWeeklySubmission.data.data.studentsWork && { studentsWork: submission.studentsWork }),
                week: currentWeek
            }, {
                onSuccess: async (data) => {
                    if (data.success) {
                        await queryClient.invalidateQueries(['weekly-submission', currentWeek])
                        return toast({
                            title: "successful",
                            description: 'Information Updated successfully'
                        })
                    }
                },
                onSettled: () => {
                    return setLoading({
                        ...loading,
                        save: false
                    })
                }
            })
        }
        return addWeeklySubmission.mutate({
            ...(submission.expectedOutcome && { expectedOutcome: submission.expectedOutcome }),
            ...(submission.workDone && { workDone: submission.workDone }),
            ...(submission.studentsWork && { studentsWork: submission.studentsWork }),
        }, {
            onSettled: async (data, err, variable) => {
                if (data.success) {
                    toast({
                        title: 'Success',
                        description: data.message
                    })
                    await queryClient.invalidateQueries(['weekly-submission', currentWeek])
                }

                if (err !== null) {
                    toast({
                        title: 'Failed',
                        description: err?.response?.data?.message || 'Something went wrong'
                    })
                }

                setLoading({
                    ...loading,
                    save: false
                });
            }
        })
    }


    return (
        <SubmissionContext.Provider value={{
            submission, addData, isEmpty, save, isValueChanged, lock, isLeader, weekInfo: getWeeklySubmission.data, updateWeeklySubmission, isPending: {
                save: loading.save,
                get: getWeeklySubmission.isPending,
                lock: loading.lock,
            }
        }}>
            {children}
        </SubmissionContext.Provider>
    )
}