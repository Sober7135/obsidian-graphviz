import { Plugin } from "obsidian";
import { DEFAULT_SETTINGS, GraphvizSettingTab, type GraphvizSettings } from "./settings";
import { registerGraphvizCodeBlocks } from "./graphviz";

export default class GraphvizPlugin extends Plugin {
	settings: GraphvizSettings;

	async onload() {
		await this.loadSettings();

		registerGraphvizCodeBlocks(this);
		this.addSettingTab(new GraphvizSettingTab(this.app, this));
	}

	onunload() {
		// All processors and settings tabs are automatically unregistered by the base Plugin class.
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

