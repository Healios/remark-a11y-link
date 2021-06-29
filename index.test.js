// Import remark to parse markdown.
const remark = require("remark");

// Import our plugin.
const plugin = require("./index");

// Setup shared data.
const processorWithOptions = remark().use(plugin, {
    mode: "aria",
});

const processor = remark().use(plugin);

const base = [
    "to-replace",
    "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    "It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",
    "Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
    "Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC.",
    "This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.",
    "",
].join("\n");

// Tests.
test("error is rendered, when markdown is incorrectly formatted", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> The markdown is not correctly formatted.</p>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when link isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`link  text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a link.</p>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when link is undefined", () =>
{
    let inputString = base.replace("to-replace", "\`link undefined text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a link.</p>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});


test("error is rendered, when text isn't specified", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text  alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a text.</p>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("error is rendered, when text is undefined", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text undefined alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a text.</p>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("link is using aria attribute", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<a href="https://github.com/Healios/remark-a11y-link" aria-label="Navigate to github and read about remark-a11y-link" style="display: inline !important;">remark-a11y-link</a>`);

    const result = processorWithOptions.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("link is using sr-only", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<a href="https://github.com/Healios/remark-a11y-link" style="display: inline !important;">remark-a11y-link<span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Navigate to github and read about remark-a11y-link</span></a>`);

    const result = processor.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("link is inline", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true end\`");
    let expectedResult = base.replace("to-replace", `<a href="https://github.com/Healios/remark-a11y-link" aria-label="Navigate to github and read about remark-a11y-link" style="display: inline !important;">remark-a11y-link</a>`);

    const result = processorWithOptions.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});

test("link is block", () =>
{
    let inputString = base.replace("to-replace", "\`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline false end\`");
    let expectedResult = base.replace("to-replace", `<a href="https://github.com/Healios/remark-a11y-link" aria-label="Navigate to github and read about remark-a11y-link" style="display: block !important;">remark-a11y-link</a>`);

    const result = processorWithOptions.processSync(inputString).toString();
    expect(result).toBe(expectedResult);
});