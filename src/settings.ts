import { App, PluginSettingTab, Setting } from "obsidian";
import type GraphvizPlugin from "./main";

export interface GraphvizSettings {
	engine: string;
}

export const DEFAULT_SETTINGS: GraphvizSettings = {
	engine: "dot",
};

export class GraphvizSettingTab extends PluginSettingTab {
	private readonly plugin: GraphvizPlugin;

	constructor(app: App, plugin: GraphvizPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		containerEl.createEl("h2", { text: "Graphviz settings" });

		new Setting(containerEl)
			.setName("Layout engine")
			.setDesc("Graphviz layout engine, for example dot, neato, fdp.")
			.addText((text) =>
				text
					.setPlaceholder("dot")
					.setValue(this.plugin.settings.engine)
					.onChange(async (value) => {
						const trimmed = value.trim();
						this.plugin.settings.engine = trimmed || "dot";
						await this.plugin.saveSettings();
					}),
			);
	}
}

