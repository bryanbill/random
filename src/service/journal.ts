import { JournalObj } from "../interface/journal"
import { Journal, User } from "../model"

const getJournals = async (userId: string, query?: { limit: number, offset: number }) => {
    const journals = await Journal.findAll(
        {
            where: { userId },
            limit: query?.limit ?? 10,
            offset: query?.offset ?? 0,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User
                }
            ]
        },);
    return journals.map(journal => journal.dataValues);
}
const getJournal = async (userId: string, journalId: string) => {
    const journal = await Journal.findOne(
        {
            where: {
                userId, id: journalId
            },
            include: {
                model: User
            }
        });
    return journal?.dataValues;
}
const createJournal = async (userId: string, journal: JournalObj) => {
    const newJournal = await Journal.create({
        ...journal,
        userId
    });
    return newJournal.dataValues;
}
const deleteJournal = async (userId: string, journalId: string) => {
    const journal = await Journal.findOne({ where: { userId, id: journalId } });
    if (!journal) {
        throw new Error("Journal not found");
    }
    await journal.destroy();
    return journal.dataValues;
}

export default {
    getJournals,
    getJournal,
    createJournal,
    deleteJournal
}