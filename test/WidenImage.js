import applib from '../build/applib'
import assert from 'assert'
import fixtureIO from './Utilities/FixtureIO'
import styleMocking from './Utilities/StyleMocking'

const maybeWidenImage = applib.WidenImage.maybeWidenImage
let document = null

describe('WidenImage', () => {
  beforeEach(() => {
    document = fixtureIO.documentFromFixtureFile('WidenImage.html')
  })

  describe('Images which should not widen', () => {
    it('image has usemap', () => {
      const image = document.getElementById('imageWithUsemap')
      const result = maybeWidenImage(image)
      assert.ok(result === false)
      assert.ok(image.classList.contains('wideImageOverride') === false)
    })

    it('image in div with noresize css class', () => {
      const image = document.getElementById('imageInNoResizeDiv')
      const result = maybeWidenImage(image)
      assert.ok(result === false)
      assert.ok(image.classList.contains('wideImageOverride') === false)
    })

    it('image in div with tsingle css class often used for side-by-side images', () => {
      const image = document.getElementById('imageInTSingleDiv')
      const result = maybeWidenImage(image)
      assert.ok(result === false)
      assert.ok(image.classList.contains('wideImageOverride') === false)
    })

    it('image in table', () => {
      const image = document.getElementById('imageInTable')
      const result = maybeWidenImage(image)
      assert.ok(result === false)
      assert.ok(image.classList.contains('wideImageOverride') === false)
    })
  })

  describe('Images which should widen', () => {
    it('widened image width and height attributes are removed', () => {
      const image = document.getElementById('imageWithWidthAndHeight')
      const result = maybeWidenImage(image)
      assert.ok(result === true)
      assert.ok(image.classList.contains('wideImageOverride') === true)
      assert.ok(image.hasAttribute('width') === false)
      assert.ok(image.hasAttribute('height') === false)
    })

    it('widened image ancestors make room for widened image', () => {
      const ancestors = document.querySelectorAll("[id*='widthConstrainedAncestor']")
      // We placed the image in question inside of 3 divs in the fixture html file.
      assert.ok(ancestors.length === 3)

      styleMocking.mockStylesInElements(ancestors, {
        width: '50%',
        maxWidth: '50%',
        float: 'right'
      })

      const image = document.getElementById('imageInWidthConstrainedAncestors')
      const result = maybeWidenImage(image)
      assert.ok(result === true)
      assert.ok(image.classList.contains('wideImageOverride') === true)

      // maybeWidenImage should have changed the style properties we manually set above.
      styleMocking.verifyStylesInElements(ancestors, {
        width: '100%',
        maxWidth: '100%',
        float: 'none'
      })
    })
  })
})