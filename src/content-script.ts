import IAB from "./deniers/IAB-denier";
import { sleep } from "./util/util";

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
