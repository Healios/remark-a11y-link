const visit = require("unist-util-visit");

module.exports = (options) =>
{
	return tree =>
	{
		visit(tree, "inlineCode", node =>
		{
			if (node.value.startsWith("link"))
			{
				// Get groups from match.
				const groups = node.value.match(/link (.*?) text (.*?) alt (.*?) inline (.*?) end/);

				// When the markdown has been incorrectly formatted, render an error.
				if (groups == null)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> The markdown is not correctly formatted.</p>`;
					return;
				}

				// Extract groups.
				const link = groups[1].trim();
				const text = groups[2].trim();
				const alt = groups[3].trim();
				const inline = groups[4].trim() == "true" ? true : false;

				// When a link has not been provided, render an error.
				if (link == "undefined" || link.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a link.</p>`;
					return;
				}

				// When a text has not been provided, render an error.
				if (text == "undefined" || text.length == 0)
				{
					node.type = "html";
					node.value = `<p><span style="color: red; font-weight: bold;">remark-a11y-link Error:</span> You must specify a text.</p>`;
					return;
				}

				let css, html = "";
				// Figure out whether to "inline" or "block" the link.
				if (!inline)
					css = "display: block !important;"
				else
					css = "display: inline !important;"

				// Figure out which way to make accessible links.
				if (options != undefined && options.mode == "aria")
					html = `<a href="${link}" aria-label="${alt}" style="${css}">${text}</a>`
				else
					html = `<a href="${link}" style="${css}">${text}<span style="position: absolute !important; clip: rect(1px, 1px, 1px, 1px); width: 1px !important; height: 1px !important; padding: 0 !important; border: 0 !important; overflow: hidden; white-space: nowrap;">${alt}</span></a>`;

				// Update the node.
				node.type = "html";
				node.value = html;
			}
		});
	};
};
