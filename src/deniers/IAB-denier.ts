import { click } from "../util/DOM";
import { sleep } from "../util/util";
import { Denier } from "./denier";

const IAB: Denier = (prefix: string) =>
    new Promise(async (resolve, reject) => {
        const log =
            (...args: any[]) =>
            () =>
                console.log(prefix, ...args);

        const container = window.document.querySelector(
            "div#qc-cmp2-container"
        ) as HTMLDivElement;

        if (container === null) return reject("");

        click("//button[text()='MORE OPTIONS']").then(log("moreoptions"));
        await sleep(75);
        click("//button[text()='REJECT ALL']").then(log("rejectall"));
        await sleep(75);
        click("//button[text()='LEGITIMATE INTEREST ']").then(log("legintr"));
        await sleep(75);
        click("//button[text()='OBJECT ALL']").then(log("objectall"));
        await sleep(75);
        click("//button[text()='SAVE & EXIT']").then(log("save&exit"));

        resolve();
    });

export default IAB;
