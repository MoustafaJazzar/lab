const fse = require('fs-extra');
const directories = require('./projects/projects.json');

let formateSourceDirectoryName = (slug) => {
    const dir = slug.toLowerCase()
    return `./projects/${dir}/dist`;
}

let formateDestinationDirectoryName = (slug) => {
    const dir = slug.toLowerCase().replace(/ /g, '-');
    return `./public/${dir}`;
}

directories.forEach(({ slug }) => {
    const srcDir = formateSourceDirectoryName(slug)
    const destDir = formateDestinationDirectoryName(slug);
    fse.copySync(srcDir, destDir, { overwrite: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`files copied to ${destDir}`);
        }
    });
})