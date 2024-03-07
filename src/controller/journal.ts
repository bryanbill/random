import { JournalObj } from "../interface/journal"
import { journal } from "../service"

const getAllJournals = async (userId: string) => {
    const response = await journal.getJournals(userId);
    return response;
}

const getJournal = async (userId: string, journalId: string) => {
    const response = await journal.getJournal(userId, journalId);
    return response;
}

const createJournal = async (userId: string, body: JournalObj) => {
    const response = await journal.createJournal(userId, body);
    return response;
}

const deleteJournal = async (userId: string, journalId: string) => {
    const response = await journal.deleteJournal(userId, journalId);
    return response;
}

export {
    getAllJournals,
    getJournal,
    createJournal,
    deleteJournal
}