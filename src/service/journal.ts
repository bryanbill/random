import { JournalObj } from "@/interface/journal"

const getJournals = async (userId: string, query: string) => { }
const getJournal = async (userId: string, journalId: string) => { }
const createJournal = async (userId: string, journal: JournalObj) => { }
const deleteJournal = async (userId: string, journalId: string) => { }

export {
    getJournals,
    getJournal,
    createJournal,
    deleteJournal
}