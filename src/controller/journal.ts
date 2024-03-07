import { JournalObj } from "@/interface/journal"


const getAllJournals = async (userId: string, query: "daily" | "own") => { }

const getJournal = async (userId: string, journalId: string) => { }

const createJournal = async (userId: string, journal: JournalObj) => { }

const deleteJournal = async (userId: string, journalId: string) => { }

export {
    getAllJournals,
    getJournal,
    createJournal,
    deleteJournal
}