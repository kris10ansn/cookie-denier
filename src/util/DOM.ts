export const xpathSelector = (element: Node, expression: string) => {
    const result = window.document.evaluate(expression, element);
    return result.iterateNext();
};

export const click = (selector: string) =>
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
