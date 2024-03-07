import test from "ava";
import { journal } from "../src/controller";

test("journal is created", async (t) => {
    const result = await journal.createJournal(
        "test",
        {
            title: "test",
            content: "test"
        }
    );
    t.pass();
})

test("journal ares retrieved", async (t) => {
    const result = await journal.getAllJournals("test");
    t.pass();
})

test("journal is retrieved", async (t) => {
    const result = await journal.getJournal("test", "test");
    t.pass();
})