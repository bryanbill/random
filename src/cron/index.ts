import cron from "node-cron";
import { Journal, User } from "../model";
import { Op } from "sequelize";
import { queue } from "../service";
import shuffle from "lodash.shuffle";

const cronJob = async () => {
   cron.schedule('0 12 * * *', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      const yesterdayStart = new Date(yesterday);
      yesterdayStart.setHours(0, 0, 0, 0);

      const yesterdayEnd = new Date(yesterday);
      yesterdayEnd.setHours(23, 59, 59, 999);

      const yesterJournals = await Journal.findAll({
         where: {
            createdAt: {
               [Op.between]: [
                  yesterdayStart,
                  yesterdayEnd
               ]
            }
         },
         include: [
            {
               model: User
            }
         ]
      })

      if (yesterJournals.length < 2) {
         return;
      }

      const shuffledJournals = shuffle(yesterJournals.map((j) => j.dataValues));

      shuffledJournals.forEach((journal, index) => {
         const recipientIndex = (index + 1) % shuffledJournals.length;
         const recipientJournal = shuffledJournals[recipientIndex];

         queue.addToQueue({
            to: journal.user.email,
            subject: 'Hello from Journaly!',
            text: `Hello, here is a gem from yesterday: ${recipientJournal.title} - ${recipientJournal.content}`
         });
      });
   });
}

export default cronJob;