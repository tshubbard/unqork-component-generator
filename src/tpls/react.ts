export const REACT_TS_TPL: string = `
import React from 'react'

import './{{componentName}}.css'

type {{componentName}}Props {

}

function {{componentName}}(props: {{componentName}}Props): React.ReactElement {
  return (
    <>
    </>
  )
}

export default {{componentName}}
`

export const INDEX_TPL: string = `
export { default as {{componentName}} } from './{{componentName}}'
`

export const TEST_TPL: string = `
import React from 'react'
import { render, screen } from '@testing-library/react'

import {{componentName}} from '../{{componentName}}'

const render{{componentName}} = (WrappedComponent: React.ReactChild | React.ReactChild[]) => {
  return render(
    {WrappedComponent}
  )
}

describe('{{componentName}}', () => {
  beforeEach(() => {
    
  })

  afterEach(() => {
    
  })

  it('should render', () => {
    render{{componentName}}(<{{componentName}} />)

    expect(screen.getByLabelText('test')).toBeInTheDocument()
  })
})
`