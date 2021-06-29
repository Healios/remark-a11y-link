# Remark accessible link plugin
[![Build](https://github.com/Healios/remark-a11y-link/actions/workflows/node.js.yml/badge.svg)](https://github.com/Healios/remark-a11y-link/actions/workflows/node.js.yml)

This is a plugin for [Remark](https://remark.js.org/), and allows you to embed accessible links in [markdown](https://daringfireball.net/projects/markdown/) files. This plugin can also be used with [Gridsome](https://gridsome.org/).

## Installation

```bash
npm i remark-a11y-link --save-dev
# yarn add remark-a11y-link --dev
```

## Configuration
### mode
You can configure in which way the link should be accessible.

There's two modes:
- aria
- hidden text within link

The default mode is hidden text within link, as it has wider support.

### Remark configuration:
```js
  const remark = require("remark");
  const a11yLink = require("remark-a11y-link");

  const processorWithoutMode = remark().use(a11yLink);

  const processorWithMode = remark().use(a11yLink, {
    mode: "aria",
  });
```


### Gridsome configuration:
```js
module.exports = {
  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "blog/**/*.md",
        route: "/blog/:year/:month/:day/:slug",
        remark: {
          plugins: [
            ["gridsome-remark-a11y-link"],
          ]
        }
      }
    }
  ]
}
```

## Usage in markdown

The markdown must consist of all the possible attributes (link, text, alt & inline), and you must enclose the markdown in backticks (\`). 

Format:
```markdown
`link [LINK] text [TEXT] alt [ALT_TEXT] inline [TRUE|FALSE]`
```

Examples:

```markdown
`link https://github.com/Healios/remark-a11y-link text remark-a11y-link alt Navigate to github and read about remark-a11y-link inline true`

or

`link https://github.com/Healios/remark-a11y-link text Navigate to github and read about remark-a11y-link alt inline false`
```

## Output

### ARIA
This is how the link should appear on the screen with aria mode:

<a href="https://github.com/Healios/remark-a11y-link" aria-label="Navigate to github and read about remark-a11y-link" style="display: inline !important;">remark-a11y-link</a>

### Hidden text within link
This is how the link should appear on the screen with hidden text within link mode:

<a href="https://github.com/Healios/remark-a11y-link" style="display: inline !important;">remark-a11y-link<span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Navigate to github and read about remark-a11y-link</span></a>

### Generated HTML

```html
<!-- ARIA mode -->
<a href="https://github.com/Healios/remark-a11y-link" aria-label="Navigate to github and read about remark-a11y-link" style="display: inline !important;">remark-a11y-link</a>

<!-- Text within link mode -->
<a href="https://github.com/Healios/remark-a11y-link" style="display: inline !important;">remark-a11y-link<span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">Navigate to github and read about remark-a11y-link</span></a>
```

### Errors
When the plugin detects errors, i.e. an incorreclty formatted a11y-link element, it will render a red fat error instead of an image.

<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> The markdown is not correctly formatted.</p>


## License

MIT
