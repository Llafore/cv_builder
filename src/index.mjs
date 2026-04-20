import { definePaths, generatePdf, writeFile } from "./files_manager.mjs";
import { createTemplate } from "./template_manager.mjs";
import path from "path";

export const build_cv = async () => {
    const paths = definePaths();
    const html = createTemplate(paths);

    writeFile(
        path.join(paths.outputDir, "cv.html"), 
        html
    );

    generatePdf(html, paths);
}