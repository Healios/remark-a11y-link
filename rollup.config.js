import copy from "rollup-plugin-copy";

export default [
    {
        input: "index.js",
        external: ["unist-util-visit",],
        output: [
            { file: "dist/index.js", format: "cjs", },
            { file: "gridsome/index.js", format: "cjs", },
        ],
        plugins: [
            copy({
                targets: [
                    {
                        src: "README.md",
                        dest: "gridsome/",
                        transform: (contents) => contents.toString().replace("i remark-a11y-link", "i gridsome-remark-a11y-link")
                                                                    .replace("add remark-a11y-link", "add gridsome-remark-a11y-link"),
                    },
                ],
            }),
        ],
    },
];