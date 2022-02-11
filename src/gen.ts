import fs = require('fs')
import path = require('path')
import mustache = require('mustache')
import { REACT_TS_TPL, INDEX_TPL, TEST_TPL } from './tpls/react'

type GenerateComponentProps = {
    componentName: string
    fsPath: string,
    addCss: boolean
}

function generateComponent(props: GenerateComponentProps) {
    const { componentName, fsPath, addCss } = props

    const compFolderName = path.join(fsPath, componentName)
    const testFolderName = path.join(compFolderName, '__tests__')

    fs.mkdirSync(compFolderName)
    fs.mkdirSync(testFolderName)

    const reactFileTpl = mustache.render(REACT_TS_TPL, { componentName })
    const indexFileTpl = mustache.render(INDEX_TPL, { componentName })
    const testFileTpl = mustache.render(TEST_TPL, { componentName })
    
    const compFileName = `${componentName}.tsx`
    const compCSSFileName = `${componentName}.css`
    const indexFileName = 'index.ts'
    const compTestFileName = `${componentName}.unit.test.tsx`

    fs.writeFileSync(path.join(compFolderName, compFileName), reactFileTpl);

    if (addCss) {
        fs.writeFileSync(path.join(compFolderName, compCSSFileName), '');
    }

    fs.writeFileSync(path.join(compFolderName, indexFileName), indexFileTpl);
    fs.writeFileSync(path.join(testFolderName, compTestFileName), testFileTpl);
} 

export default generateComponent