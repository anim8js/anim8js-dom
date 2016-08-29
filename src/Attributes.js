
var Attributes = {};

/**
 * The default attribute.
 */
Attributes['default']              = {defaultValue: 0};

/**
 * All animatable attributes for AnimatorDoms & HTMLElements.
 */

Attributes.padding                 = {defaultValue: 0, defaultUnit: 'px'};
Attributes.paddingTop              = {defaultValue: 0, defaultUnit: 'px'};
Attributes.paddingRight            = {defaultValue: 0, defaultUnit: 'px'};
Attributes.paddingBottom           = {defaultValue: 0, defaultUnit: 'px'};
Attributes.paddingLeft             = {defaultValue: 0, defaultUnit: 'px'};

Attributes.margin                  = {defaultValue: 0, defaultUnit: 'px'};
Attributes.marginTop               = {defaultValue: 0, defaultUnit: 'px'};
Attributes.marginRight             = {defaultValue: 0, defaultUnit: 'px'};
Attributes.marginBottom            = {defaultValue: 0, defaultUnit: 'px'};
Attributes.marginLeft              = {defaultValue: 0, defaultUnit: 'px'};

Attributes.borderRadius            = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderTopLeftRadius     = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderTopRightRadius    = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderBottomLeftRadius  = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderBottomRightRadius = {defaultValue: 0, defaultUnit: 'px'};

Attributes.borderWidth             = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderTopWidth          = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderRightWidth        = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderBottomWidth       = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderLeftWidth         = {defaultValue: 0, defaultUnit: 'px'};

Attributes.outlineWidth            = {defaultValue: 0, defaultUnit: 'px'};
Attributes.outlineOffset           = {defaultValue: 0};
Attributes.textIndent              = {defaultValue: 0, defaultUnit: 'px'};
Attributes.borderSpacing           = {defaultValue: 0, defaultUnit: 'px'};
Attributes.fontSize                = {defaultValue: 1, defaultUnit: 'em'};
Attributes.lineHeight              = {defaultValue: 1, defaultUnit: 'em'};
Attributes.letterSpacing           = {defaultValue: 0, defaultUnit: 'px'};

Attributes.origin                  = {defaultValue: {x:50, y:50}, defaultUnit: '%', property: 'transformOrigin', calculator: '2d'};
Attributes.originX                 = {defaultValue: 50, defaultUnit: '%', property: 'transformOrigin'};
Attributes.originY                 = {defaultValue: 50, defaultUnit: '%', property: 'transformOrigin'};

Attributes.opacity                 = {defaultValue: 1};
Attributes.zIndex                  = {defaultValue: 1};

Attributes.width                   = {defaultValue: 0, defaultUnit: 'px'};
Attributes.minWidth                = {defaultValue: 0, defaultUnit: 'px'};
Attributes.maxWidth                = {defaultValue: 0, defaultUnit: 'px'};

Attributes.height                  = {defaultValue: 0, defaultUnit: 'px'};
Attributes.minHeight               = {defaultValue: 0, defaultUnit: 'px'};
Attributes.maxHeight               = {defaultValue: 0, defaultUnit: 'px'};

Attributes.angle                   = {defaultValue: 0, property: 'orbit', defaultUnit: 'deg'};
Attributes.distance                = {defaultValue: 0, property: 'orbit', defaultUnit: 'px'};
Attributes.orbitOffset             = {defaultValue: {x:50, y:50}, defaultUnit: '%', property: 'orbitOffset', calculator: '2d'};

Attributes.top                     = {defaultValue: 0, defaultUnit: 'px'};
Attributes.right                   = {defaultValue: 0, defaultUnit: 'px'};
Attributes.bottom                  = {defaultValue: 0, defaultUnit: 'px'};
Attributes.left                    = {defaultValue: 0, defaultUnit: 'px'};

Attributes.center                  = {defaultValue: {x:0, y:0}, defaultUnit: 'px', property: 'center', calculator: '2d'};
Attributes.centerX                 = {defaultValue: 0, defaultUnit: 'px', property: 'center'};
Attributes.centerY                 = {defaultValue: 0, defaultUnit: 'px', property: 'center'};

Attributes.blur                    = {defaultValue: 0, property: 'filter', defaultUnit: 'px'};
Attributes.sepia                   = {defaultValue: 0, property: 'filter', defaultUnit: '%'};
Attributes.brightness              = {defaultValue: 100, property: 'filter', defaultUnit: '%'};
Attributes.grayscale               = {defaultValue: 0, property: 'filter', defaultUnit: '%'};
Attributes.contrast                = {defaultValue: 100, property: 'filter', defaultUnit: '%'};
Attributes.invert                  = {defaultValue: 0, property: 'filter', defaultUnit: '%'};
Attributes.saturation              = {defaultValue: 0, property: 'filter', defaultUnit: '%'};
Attributes.hueRotate               = {defaultValue: 0, property: 'filter', defaultUnit: 'deg'};

Attributes.rotate                  = {defaultValue: 0, property: 'transform', defaultUnit: 'deg'};
Attributes.rotate3d                = {defaultValue: {x:0, y:0, z:1, angle:0}, property: 'transform', calculator: 'quaternion', defaultUnit: 'deg'};

Attributes.translate               = {defaultValue: {x:0, y:0}, property: 'transform', calculator: '2d', defaultUnit: 'px'};
Attributes.translateX              = {defaultValue: 0, property: 'transform', defaultUnit: 'px'};
Attributes.translateY              = {defaultValue: 0, property: 'transform', defaultUnit: 'px'};
Attributes.translateZ              = {defaultValue: 0, property: 'transform', defaultUnit: 'px'};
Attributes.translate3d             = {defaultValue: {x:0, y:0, z:0}, property: 'transform', calculator: '3d', defaultUnit: 'px'};

Attributes.scale                   = {defaultValue: {x:1, y:1}, property: 'transform', calculator: '2d'};
Attributes.scaleX                  = {defaultValue: 1, property: 'transform'};
Attributes.scaleY                  = {defaultValue: 1, property: 'transform'};
Attributes.scaleZ                  = {defaultValue: 1, property: 'transform'};
Attributes.scale3d                 = {defaultValue: {x:1, y:1, z:1}, property: 'transform', calculator: '3d'};

Attributes.skew                    = {defaultValue: {x:0, y:0}, defaultUnit: 'deg', property: 'transform', calculator: '2d'};
Attributes.skewX                   = {defaultValue: 0, defaultUnit: 'deg', property: 'transform'};
Attributes.skewY                   = {defaultValue: 0, defaultUnit: 'deg', property: 'transform'};

Attributes.backface                = {defaultValue: 0};
Attributes.visibility              = {defaultValue: 1};

Attributes.backgroundColor         = {defaultValue: Color(), calculator: 'rgba'};
Attributes.color                   = {defaultValue: Color(), calculator: 'rgba'};
Attributes.borderTopColor          = {defaultValue: Color(), calculator: 'rgba'};
Attributes.borderRightColor        = {defaultValue: Color(), calculator: 'rgba'};
Attributes.borderBottomColor       = {defaultValue: Color(), calculator: 'rgba'};
Attributes.borderLeftColor         = {defaultValue: Color(), calculator: 'rgba'};
Attributes.borderColor             = {defaultValue: Color(), calculator: 'rgba'};
Attributes.outlineColor            = {defaultValue: Color(), calculator: 'rgba'};

Attributes.textShadowX             = {defaultValue: 0, defaultUnit: 'px', property: 'textShadow'};
Attributes.textShadowY             = {defaultValue: 0, defaultUnit: 'px', property: 'textShadow'};
Attributes.textShadowPosition      = {defaultValue: {x: 0, y: 0}, defaultUnit: 'px', calculator: '2d', property: 'textShadow'};
Attributes.textShadowBlur          = {defaultValue: 0, defaultUnit: 'px', property: 'textShadow'};
Attributes.textShadowColor         = {defaultValue: Color(), calculator: 'rgba', property: 'textShadow'};

Attributes.shadowX                 = {defaultValue: 0, defaultUnit: 'px', property: 'shadow'};
Attributes.shadowY                 = {defaultValue: 0, defaultUnit: 'px', property: 'shadow'};
Attributes.shadowPosition          = {defaultValue: {x: 0, y: 0}, defaultUnit: 'px', calculator: '2d', property: 'shadow'};
Attributes.shadowBlur              = {defaultValue: 0, defaultUnit: 'px', property: 'shadow'};
Attributes.shadowSpread            = {defaultValue: 0, defaultUnit: 'px', property: 'shadow'};
Attributes.shadowColor             = {defaultValue: Color(), calculator: 'rgba', property: 'shadow'};
Attributes.shadowInset             = {defaultValue: 0, property: 'shadow'};
