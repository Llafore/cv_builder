import path from "path";
import fs from "fs";
import puppeteer from "puppeteer";

const INPUT_DATA_PATH = "../data/cv.json";
const BASE_TEMPLATE_PATH = "../templates/cv.hbs";
const PARTIALS_TEMPLATE_PATH = "../templates/partials";
const OUTPUT_PATH = "../output/";

export const definePaths = () => {
    const __dirname = new URL('.', import.meta.url).pathname;

    return {
        dataPath: path.join(__dirname, INPUT_DATA_PATH),
        templatePath: path.join(__dirname, BASE_TEMPLATE_PATH),
        partialsDir: path.join(__dirname, PARTIALS_TEMPLATE_PATH),
        outputDir: path.join(__dirname, OUTPUT_PATH)
    }
}

export const writeFile = (filePath, file) => {
    const dir = path.dirname(filePath)
    
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(filePath, file);
}

export const generatePdf = async (html, paths) => {
    const browser = await puppeteer.launch({
        handless: true,
        args: [
            "--no-sandbox",
            "-disable-setuid-sandbox",
            "--disable-dev-shm-usage",
        ],
            
    });
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.emulateMediaType('screen');
    await page.goto("http://127.0.0.1:5500/output/cv.html", { waitUntil: 'networkidle0' });

    await page.pdf({
        path: path.join(paths.outputDir, "cv.pdf"),
        format: "A4",
        printBackground: true
    });

    await browser.close();
}