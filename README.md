# anim8js-dom

[anim8](https://github.com/ClickerMonkey/anim8js) your HTML elements

anim8js-dom modifies the animation definition and animator functions to include units. Any unit that the property supports in CSS is usable in anim8js - and can handle converting between different units. You can even animate between values with different units. The following functions have changed:

- `Animator.set( attrs )` can set values with units like `12px` or `10%`
- `Animator.get( attrs )` you can specify what unit you want an attribute to be returned in
- `Animator.ref( attr, desiredUnit, relativeTo )` reference to an attributes value with the given unit
- `Animator.value( attr )` returns the value of the attribute with its unit
- `Animator.tweenTo( attr, target, options, cache, unit )` you can specify the target value unit
- `Animator.tweenManyTo( targets, options, cache, units )` you can specify a map of units to match the map of target values
- `Animator.tweenFrom( attr, starting, options, cache, unit )` you can specify the starting value unit
- `Animator.tweenManyFrom( startings, options, cache, units )` you can specify a map of units to match the map of startings
- `Animator.tween( attr, starts, ends, options, cache, unit )` you can specity the unit for tweening
- `Animator.tweenMany( starts, ends, options, cache, units )` you can specify a map of units to match the map of starts
- `Animator.move( attr, amount, options, cache, unit )` move by the given unit
- `Animator.moveMany( amounts, options, cache, units )` move many by the given map of units
- `Animator.follow( attr, path, options, cache, unit )` follow a path where the values in the path are the given unit

The *animation definition* has been modified to now include a `units` map like so:

```
anim8.save('animationName`, {
  keyframe: {
    '0,20,60,100': {
      left: 50
    },
    '10,40,80`: {
      left: 0
    }
  },
  units: {
    left: '%
  }
});
```

*Notes*
- `relativeTo` is one of: parentWidth, parentHeight, width, height, fontSize, parentFontSize, or htmlFontSize and is used with using the `%` unit

### Installation

- Bower: `bower install anim8js-dom`
- Node: `npm install anim8js-dom`
- Download: [anim8js-dom](https://raw.githubusercontent.com/ClickerMonkey/anim8js-dom/master/build/anim8js-dom.js)

##### Properties you can anim8

If a (type) isn't beside the property - assume a simple number type.

`padding` `paddingTop` `paddingLeft` `paddingBottom` `paddingRight`
`margin` `marginTop` `marginLeft` `marginBottom` `marginRight`
`borderRadius` `borderTopLeftRadius` `borderTopRightRadius` `borderBottomLeftRadius` `borderBottomRightRadius`
`borderWidth` `borderTopWidth` `borderRightWidth` `borderBottomWidth` `borderLeftWidth` 
`outlineWidth` `outlineOffset` `textIndent` `borderSpacing` `fontSize` `lineHeight` `letterSpacing`
`origin`(2d) `originX` `originY` 
`opacity` `zIndex`
`width` `minWidth` `maxWidth` `height` `minHeight` `maxHeight`
`top` `right` `bottom` `left`
`center`(2d) `centerX` `centerY`
`blur` `sepia` `brightness` `grayscale` `contrast` `invert` `saturation` `heuRotate`
`rotate` `rotate3d`(quaternion)
`translate`(2d) `translateX` `translateY` `translateZ` `translate3d`(3d)
`scale`(2d) `scaleX` `scaleY` `scaleZ` `scale3d`(3d)
`skew`(2d) `skewX` `skewY`
`backface` `visibility`
`backgroundColor`(rgba) `color`(rgba) `borderTopColor`(rgba) `borderRightColor`(rgba) `borderBottomColor`(rgba) `borderLeftColor`(rgba) `borderColor`(rgba) `outlineColor`(rgba)
`textShadowX` `textShadowY` `textShadowPosition`(2d) `textShadowBlur` `textShadowColor`(rgba)
`shadowX` `shadowY` `shadowPosition`(2d) `shadowBlur` `shadowSpread` `shadowColor`(rgba) `shadowInset`

##### Dynamic properties you can anim8

`angle` `distance` `orbitOffset`(2d)
