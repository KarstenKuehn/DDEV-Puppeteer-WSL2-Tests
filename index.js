import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

// Optional: If you'd like to use the new headless mode. "shell" is the default.
// NOTE: Because we build the shell binary, this option does not work.
//       However, this option will stay so when we migrate to full chromium it will work.
chromium.setHeadlessMode = true;

async function scrape(){

    try {
        const browser = await puppeteer.launch({
            args: chromium.args,
            defaultViewport: chromium.defaultViewport,
            executablePath: await chromium.executablePath(),
            headless: chromium.headless,
        });

        const page = await browser.newPage();
        const response =  await page.goto("https://ddev.com/blog/amd64-on-apple-silicon-ddev/");

        const statusCode = response.status();
        const finalUrl =  response.url();
        const redirects =  response.request().redirectChain().length;

        const pageTitle = await page.title();
        const pageDescription = await page.$eval('meta[name=description]', element => element.content);

        await browser.close();

        console.log( JSON.stringify({
            status: 'OK' ,
            body:{
                statusCode,
                finalUrl,
                redirects,
                page: {
                    title: pageTitle,
                    description: pageDescription,

                }
            }
        }));

      }catch (e) {
        console.error(JSON.stringify({
            status: 'ERROR',
            body: e
        }));
    }


}

scrape();
