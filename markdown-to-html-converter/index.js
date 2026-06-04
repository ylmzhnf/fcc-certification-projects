const markdownInput = document.getElementById("markdown-input");
const htmlOutput = document.getElementById("html-output");
const preview = document.getElementById("preview");

function convertMarkdown() {
  let html = markdownInput.value;
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, '<img alt="$1" src="$2">');
  html = html.replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>');

  html = html.replace(/^ *### (.*?)\r?$/gm, "<h3>$1</h3>");
  html = html.replace(/^ *## (.*?)\r?$/gm, "<h2>$1</h2>");
  html = html.replace(/^ *# (.*?)\r?$/gm, "<h1>$1</h1>");

  html = html.replace(/^\s*> (.*)$/gm, "<blockquote>$1</blockquote>");
  html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/__(.*?)__/g, "<strong>$1</strong>");
  html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
  html = html.replace(/_(.*?)_/g, "<em>$1</em>");

  return html;
}

markdownInput.addEventListener("input", () => {
  const convertedHtml = convertMarkdown();

  htmlOutput.textContent = convertedHtml;
  preview.innerHTML = convertedHtml;
});
