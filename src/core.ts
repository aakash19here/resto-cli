import { Dataset, PlaywrightCrawler } from "crawlee";

export const crawler = new PlaywrightCrawler({
  maxConcurrency: 10,
  requestHandler: async ({ page, request }) => {
    try {
      await page.waitForSelector("span.m2g-menu-product-name", {
        timeout: 10000,
      });
    } catch (e) {
      console.error(`Error waiting for the elements: ${(e as Error).message}`);
      return;
    }

    const names = await page.$$eval("span.m2g-menu-product-name", (spans) =>
      spans.map((span) => span.innerHTML)
    );

    const prices = await page.$$eval("span.m2g-menu-product-price", (spans) =>
      spans.map((span) => span.innerHTML)
    );

    const result = {
      names,
      prices,
    };

    // Save the extracted data to a dataset
    await Dataset.pushData({
      url: request.url,
      result,
    });

    await Dataset.exportToJSON("menu_items");
  },
});
