const xpathSelector = (element: Node, expression: string) => {
    const result = window.document.evaluate(expression, element);
    return result.iterateNext();
};

const click = (selector: string) =>
    new Promise<void>((resolve, reject) => {
        let element = null;

        if (selector.indexOf("//") === 0) {
            element = xpathSelector(window.document, selector);
        } else {
            element = document.querySelector(selector);
        }

        if (!(element instanceof HTMLElement))
            return reject("Element not found");

        element.click();
        resolve();
    });

const sleep = (time: number) =>
    new Promise<void>((resolve) => {
        setTimeout(() => resolve(), time);
    });

type Denier = (prefix: string) => Promise<void>;

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

window.addEventListener("load", async () => {
    await sleep(175);
    const deniers = [{ name: "IAB", deny: IAB }];

    deniers.forEach((denier) => {
        const prefix = `[[Cookie denier -- ${denier.name}]]:`;

        denier
            .deny(prefix)
            .then(() => console.log(`${prefix} Successfully denied cookies`))
            .then(() => showMessageHacky(denier.name))
            .catch((error) => console.error(`${prefix}`, error));
    });
});

function showMessageHacky(denierName: string) {
    const div = document.createElement("div");
    div.innerHTML = `
            <style>
            @keyframes cookie-denier-message-box-fade {
                from {visibility:visible;opacity:0}
                50% {opacity:1}
                99% {opacity: 0}
                to {visibility: hidden}
            }
            #cookie-denier-message-box {
                visibility: hidden;
                animation: cookie-denier-message-box-fade 3s ease-in-out;
                animation-fill-mode: forwards;
                position: fixed;
                top: 50vw;
                left: 50vw;
                transform: translate(-50%, -50%);

                color: white;
                background: rgba(0, 0, 0, 0.75);
                border-radius: 10px;
                padding: 10px;

                opacity: 0;
            }
            </style>
            <p id="cookie-denier-message-box">${denierName} cookies denied!</p>
        `;
    document.body.appendChild(div);
}
