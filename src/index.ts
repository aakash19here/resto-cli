#! /usr/bin/env node

import { Command } from "commander";
import figlet from "figlet";
import { crawler } from "./core";

const url = "https://fatimas.co.nz";

const program: Command = new Command();

console.log(figlet.textSync("Resto AI"));

program
  .version("1.0.0")
  .description("Get the prices for the menu items.")
  .option("-c, --crawl [value]", "Crawl and scrap data from desired website")
  .parse(process.argv);

const options = program.opts();

if (options.crawl) {
  crawler.run([url]).then((data) => console.log(data));
}
