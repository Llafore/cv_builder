import fs from "fs";
import Handlebars from "handlebars";
import path from "path";

const walkData = (branch) => {
    const bullets = {};

    for ([k, v] of branch) {
        if (k == "bullets") return splitInTwo(arr);

        if (typeof v == 'object' && !null){
            
        }
    }
}

const splitColumns = () => {

}

export const createTemplate = (paths) => {
    const data = JSON.parse(fs.readFileSync(paths.dataPath, "utf-8"));
    const partialFiles = fs.readdirSync(paths.partialsDir);

    for (const file of partialFiles) {
        const name = file.replace(".hbs", "");
        const content = fs.readFileSync(path.join(paths.partialsDir, file), "utf-8");
        Handlebars.registerPartial(name, content);
    }

    const templateSource = fs.readFileSync(paths.templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);

    return template(data);
}