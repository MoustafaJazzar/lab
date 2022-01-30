const fse = require('fs-extra');
const directories = require('./projects.json');

let formateSourceDirectoryName = (str) => {
    const dir = str.toLowerCase().replace(/ /g, '-');
    return `./${dir}/dist`;
}

let formateDestinationDirectoryName = (str) => {
    const dir = str.toLowerCase().replace(/ /g, '-');
    return `./public/${dir}`;
}

directories.forEach(({ name }) => {
    const srcDir = formateSourceDirectoryName(name)
    const destDir = formateDestinationDirectoryName(name);
    fse.copySync(srcDir, destDir, { overwrite: true }, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`files copied to ${destDir}`);
        }
    });
})