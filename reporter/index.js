
// TODO переделать на классы
async function screenshot() {
    driver.takeScreenshot().then( async function (data) {
        let base64Data = await data.replace(/^data:image\/png;base64,/,"")
        let [fileName, dirName] = await getTestNameAndDirName()
        await mkdir(path.resolve(__dirname, '..', 'data', dirName),{"recursive": true})
        await fsPromises.writeFile(path.resolve(__dirname, '..', 'data', dirName, fileName + ".png"), base64Data, 'base64')
    })
}

async function getTestNameAndDirName() {
    const re = await RegExp("(?=[А-Я])")
    let arrNamesTest = expect.getState().currentTestName.split(re)
    let fileName = arrNamesTest.pop(-1).trim()
    let dirName = arrNamesTest.pop().trim()
    return [fileName.replace(/ /g, '_'), dirName.replace(/ /g, '_')]
}
