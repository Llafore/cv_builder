import fs from "fs";
import Handlebars from "handlebars";
import path from "path";
import { splitBullets } from "./utils/template.mjs";

const deepProcessObject = (data, processors = []) => {
    const walk = (node, parent = null, key = null) => {
        if (Array.isArray(node)) {
            node.forEach((item, index) => {
                walk(item, node, index);
            });
            return;
        }

        if (node && typeof node === "object") {

            processors.forEach((processor) => {
                processor(node, parent, key);
            });

            Object.keys(node).forEach((k) => {
                walk(node[k], node, k);
            });
        }
    };

    walk(data);
    return data;
};

const bulletsProcessor = (node) => {
    if (
        Object.prototype.hasOwnProperty.call(node, "bullets") &&
        Array.isArray(node.bullets)
    ) {
        node.bulletsSplit = splitBullets(node.bullets);
    }
};

export const createTemplate = (paths) => {
    const data = JSON.parse(fs.readFileSync(paths.dataPath, "utf-8"));
    const processedData = deepProcessObject(data, [bulletsProcessor])
    const partialFiles = fs.readdirSync(paths.partialsDir);

    for (const file of partialFiles) {
        const name = file.replace(".hbs", "");
        const content = fs.readFileSync(path.join(paths.partialsDir, file), "utf-8");
        Handlebars.registerPartial(name, content);
    }

    const templateSource = fs.readFileSync(paths.templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);
    return template(processedData);
}