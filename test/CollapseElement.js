import assert from 'assert'
import domino from 'domino'
import { getTableHeader } from '../src/CollapseElement'

describe('CollapseElement', () => {
  describe('getTableHeader()', () => {
    it('no table', () => {
      const doc = domino.createDocument('<html></html>')
      const actual = getTableHeader(doc.documentElement)
      assert.deepEqual(actual, [])
    })

    it('no header', () => {
      const doc = domino.createDocument('<table></table>')
      const actual = getTableHeader(doc.querySelector('table'))
      assert.deepEqual(actual, [])
    })

    it('empty header', () => {
      const doc = domino.createDocument('<table><tr><th></th></tr></table>')
      const actual = getTableHeader(doc.querySelector('table'))
      assert.deepEqual(actual, [])
    })

    it('nonempty header', () => {
      const doc = domino.createDocument('<table><tr><th><a>text</a></th></tr></table>')
      const actual = getTableHeader(doc.querySelector('table'), 'pageTitle')
      assert.deepEqual(actual, ['text'])
    })
  })
})