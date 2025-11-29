import type { MarkdownPostProcessorContext, Plugin } from "obsidian";
import { Notice } from "obsidian";
import { instance } from "@viz-js/viz";
import type GraphvizPlugin from "./main";

let vizInstancePromise: ReturnType<typeof instance> | null = null;

async function getVizInstance() {
	if (!vizInstancePromise) {
		vizInstancePromise = instance();
	}

	return vizInstancePromise;
}

function renderError(element: HTMLElement, message: string) {
	element.empty();
	const errorElement = element.createEl("pre", {
		text: message,
	});
	errorElement.addClass("graphviz-error");
}

async function processGraphvizCodeBlock(
	source: string,
	element: HTMLElement,
	context: MarkdownPostProcessorContext,
	plugin: GraphvizPlugin,
) {
	const trimmedSource = source.trim();
	if (!trimmedSource) {
		renderError(element, "Graphviz: empty code block.");
		return;
	}

	let viz;
	try {
		viz = await getVizInstance();
	} catch (error) {
		console.error("obsidian-graphviz: failed to initialize Viz.js instance", error);
		new Notice("Graphviz: failed to initialize renderer. See console for details.");
		renderError(element, "Graphviz: failed to initialize renderer.");
		return;
	}

	try {
		const svgElement = viz.renderSVGElement(trimmedSource, {
			engine: plugin.settings.engine || "dot",
		});

		// Make SVG responsive to the container size.
		svgElement.removeAttribute("width");
		svgElement.removeAttribute("height");
		svgElement.style.width = "100%";
		svgElement.style.height = "auto";

		element.empty();
		const container = element.createDiv({
			cls: "graphviz-diagram",
		});
		container.appendChild(svgElement);
	} catch (error) {
		console.error("obsidian-graphviz: failed to render Graphviz diagram", error);
		new Notice("Graphviz: rendering error. See console for details.");
		renderError(element, "Graphviz: rendering error. Check DOT syntax.");
	}
}

export function registerGraphvizCodeBlocks(plugin: Plugin & GraphvizPlugin) {
	const processor = async (
		source: string,
		element: HTMLElement,
		context: MarkdownPostProcessorContext,
	) => {
		await processGraphvizCodeBlock(source, element, context, plugin);
	};

	plugin.registerMarkdownCodeBlockProcessor("graphviz", processor);
	plugin.registerMarkdownCodeBlockProcessor("dot", processor);
}
