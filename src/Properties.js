
var Properties = {};

Properties.noop =
{
  get: function(e, anim)
  {
  },
  set: function(e, anim)
  {
  },
  unset: function(e, anim)
  {
  }
};

Properties.padding                  = factory( 'padding', 'parentWidth' );
Properties.paddingTop               = factory( 'paddingTop', 'parentWidth' );
Properties.paddingRight             = factory( 'paddingRight', 'parentWidth' );
Properties.paddingBottom            = factory( 'paddingBottom', 'parentWidth' );
Properties.paddingLeft              = factory( 'paddingLeft', 'parentWidth' );

Properties.margin                   = factory( 'margin', 'parentWidth' );
Properties.marginTop                = factory( 'marginTop', 'parentWidth' );
Properties.marginRight              = factory( 'marginRight', 'parentWidth' );
Properties.marginBottom             = factory( 'marginBottom', 'parentWidth' );
Properties.marginLeft               = factory( 'marginLeft', 'parentWidth' );

Properties.borderRadius             = factory( 'borderRadius', 'width' );
Properties.borderTopLeftRadius      = factory( 'borderTopLeftRadius', 'width' );
Properties.borderTopRightRadius     = factory( 'borderTopRightRadius', 'width' );
Properties.borderBottomLeftRadius   = factory( 'borderBottomLeftRadius', 'width' );
Properties.borderBottomRightRadius  = factory( 'borderBottomRightRadius', 'width' );

Properties.borderWidth              = factory( 'borderWidth' );
Properties.borderTopWidth           = factory( 'borderTopWidth' );
Properties.borderRightWidth         = factory( 'borderRightWidth' );
Properties.borderBottomWidth        = factory( 'borderBottomWidth' );
Properties.borderLeftWidth          = factory( 'borderLeftWidth' );

Properties.outlineWidth             = factory( 'outlineWidth' );
Properties.textIndent               = factory( 'textIndent', 'parentWidth' );
Properties.tabSize                  = factory( 'tabSize', 'parentWidth' );
Properties.borderSpacing            = factory( 'borderSpacing' );
Properties.fontSize                 = factory( 'fontSize', 'parentFontSize' );
Properties.lineHeight               = factory( 'lineHeight', 'fontSize' );
Properties.letterSpacing            = factory( 'letterSpacing' );
Properties.wordSpacing              = factory( 'wordSpacing' );

Properties.zIndex                   = factory( 'zIndex' );

Properties.color                    = factoryColor( 'color' );
Properties.backgroundColor          = factoryColor( 'backgroundColor' );
Properties.borderTopColor           = factoryColor( 'borderTopColor' );
Properties.borderRightColor         = factoryColor( 'borderRightColor' );
Properties.borderBottomColor        = factoryColor( 'borderBottomColor' );
Properties.borderLeftColor          = factoryColor( 'borderLeftColor' );
Properties.borderColor              = factoryColor( 'borderColor' );
Properties.outlineColor             = factoryColor( 'outlineColor' );
Properties.textDecorationColor      = factoryColor( 'textDecorationColor' );

Properties.minWidth                 = factory( 'minWidth', 'parentWidth' );
Properties.maxWidth                 = factory( 'maxWidth', 'parentWidth' );
Properties.minHeight                = factory( 'minHeight', 'parentHeight' );
Properties.maxHeight                = factory( 'maxHeight', 'parentHeight' );

Properties.width                    = factoryDerivable('width', 'parentWidth', function(e) { return e.offsetWidth + 'px'; });
Properties.height                   = factoryDerivable('height', 'parentHeight', function(e) { return e.offsetHeight + 'px'; });

Properties.top                      = factoryDerivable('top', 'parentHeight', function(e) { return e.offsetTop + 'px'; });
Properties.right                    = factoryDerivable('right', 'parentWidth', function(e) { return (e.parentNode.scrollWidth - (e.offsetLeft + e.offsetWidth)) + 'px'; });
Properties.bottom                   = factoryDerivable('bottom', 'parentHeight', function(e) { return (e.parentNode.scrollHeight - (e.offsetTop + e.offsetHeight)) + 'px'; });
Properties.left                     = factoryDerivable('left', 'parentWidth', function(e) { return e.offsetLeft + 'px'; });

Properties.scrollTop                = factoryNumberAttribute( 'scrollTop' );
Properties.scrollLeft               = factoryNumberAttribute( 'scrollLeft' );

Properties.zIndex.set = function(e, anim)
{
  anim.styles.zIndex = Math.floor( anim.frame.zIndex );
};

Properties.visibility =
{
  get: function(e, anim)
  {
    if (anim.animating.visibility === false)
    {
      var style = $style( e, 'visibility' );
      anim.frame.visibility = style === 'hidden' ? 0.0 : 1.0;
      anim.animating = true;
    }
  },
  set: function(e, anim)
  {
    anim.styles.visibility = anim.frame.visibility < 0.5 ? 'hidden' : 'visible';
  },
  unset: function(e, anim)
  {
    e.style.visibility = null;
  }
};

Properties.backface = (function()
{
  var css = $prefix(['WebkitBackfaceVisibility', 'MozBackfaceVisibility', 'msBackfaceVisibility', 'BackfaceVisibility']);

  if ( !css )
  {
    return Properties.noop;
  }

  return {

    get: function(e, anim)
    {
      if ( anim.animating.backface === false )
      {
        var style = $style( e, css );

        anim.frame.backface = (style === 'visible') ? 1.0 : 0.0;
        anim.animating.backface = true;
      }
    },
    set: function(e, anim)
    {
      anim.styles[css] = anim.frame.backface < 0.5 ? 'none' : 'visible';
    },
    unset: function(e, anim)
    {
      e.style[ css ] = null;
    }

  };

})();

Properties.transformOrigin = (function()
{
  var css = $prefix(['WebkitTransformOrigin', 'MozTransformOrigin', 'OTransformOrigin', 'msTransformOrigin', 'transformOrigin']);

  if ( !css )
  {
    return Properties.noop;
  }

  var keywords =
  {
    'left':   '0%',
    'center': '50%',
    'right':  '100%',
    'top':    '0%',
    'bottom': '100%'
  };

  var setOriginAttribute = function(e, value, anim, attr, relativeTo )
  {
    if (anim.animating[attr] === false)
    {
      if ( value in keywords )
      {
        value = keywords[ value ];
      }

      var converted = $convert( e, value, anim.units[ attr ], relativeTo );

      if ( converted !== false )
      {
        anim.frame[ attr ] = converted;
        anim.animating[ attr ] = true;
      }
    }
  };

  var setOrigin = function(e, split, anim)
  {
    if (anim.animating.origin === false)
    {
      if ((split.length === 1) ||
          (split.length === 2 && split[0] === split[1]) ||
          (split.length === 3 && split[0] === split[1] && split[1] === split[2]))
      {
        setOriginAttribute( e, split[0], anim, 'origin', 'width' );
      }
    }
  };

  return {

    get: function(e, anim)
    {
      var style = $style( e, css );

      if (style)
      {
        var origin = style.toLowerCase();
        var split = origin.split(' ');

        switch (split.length)
        {
        case 3:
          setOriginAttribute( e, split[0], anim, 'originX', 'width' );
          setOriginAttribute( e, split[1], anim, 'originY', 'height' );
          setOriginAttribute( e, split[2], anim, 'originZ' );
          setOrigin( e, split, anim );
          break;
        case 2:
          setOriginAttribute( e, split[0], anim, 'originX', 'width' );
          setOriginAttribute( e, split[1], anim, 'originY', 'height' );
          setOrigin( e, split, anim );
          break;
        case 1:
          setOriginAttribute( e, split[0], anim, 'originX', 'width' );
          setOriginAttribute( e, split[0], anim, 'originY', 'height' );
          setOrigin( e, split, anim );
          break;
        }
      }
    },
    set: function(e, anim)
    {
      var style = null;

      if ( isDefined( anim.frame.originZ ) )
      {
        style = anim.valueOr( 'originX', 'origin', 'x' ) + ' ' + anim.valueOr( 'originY', 'origin', 'y' ) + ' ' + anim.valueOr( 'originZ', 'origin', 'z' );
      }
      else
      {
        style = anim.valueOr( 'originX', 'origin', 'x' ) + ' ' + anim.valueOr( 'originY', 'origin', 'y' );
      }

      anim.styles[css] = style;
    },
    unset: function(e, anim, attr)
    {
      unset( e, anim, attr, this, css, null );
    }
  };

})();

Properties.transform = (function()
{
  var css = $prefix(['WebkitTransform', 'MozTransform', 'OTransform', 'msTransform', 'transform']);

  if ( !css )
  {
    return Properties.noop;
  }

  var parse = function( e, value, anim, attr, relativeTo )
  {
    var desiredUnit = anim.units[ attr ];
    var converted = $convert( e, value, desiredUnit, relativeTo );

    if ( converted !== false )
    {
      return converted;
    }

    // TODO show convert this to desiredUnit, however defaultValue may be non-scalar.
    return anim.getAttribute( attr ).defaultValue;
  };

  var getter1d = function(e, anim, parsed, attr)
  {
    return parse( e, parsed[1], anim, attr, 'width' );
  };
  var getter2d = function(e, anim, parsed, attr)
  {
    return {
      x: parse( e, parsed[1], anim, attr, 'width' ),
      y: parse( e, parsed[2], anim, attr, 'height' )
    };
  };
  var getter3d = function(e, anim, parsed, attr)
  {
    return {
      x: parse( e, parsed[1], anim, attr, 'width' ),
      y: parse( e, parsed[2], anim, attr, 'height' ),
      z: parse( e, parsed[3], anim, attr )
    };
  };
  var getter4d = function(e, anim, parsed, attr)
  {
    return {
      x: parse( e, parsed[1], anim, attr, 'width' ),
      y: parse( e, parsed[2], anim, attr, 'height' ),
      z: parse( e, parsed[3], anim, attr ),
      angle: parse( e, parsed[4], anim, attr )
    };
  };

  var setter1d = function(attr, value, unit)
  {
    return attr + '(' + value + unit + ')';
  };
  var setter2d = function(attr, value, unit)
  {
    return attr + '(' + value.x + unit + ',' + value.y + unit + ')';
  };
  var setter3d = function(attr, value, unit)
  {
    return attr + '(' + value.x + unit + ',' + value.y + unit + ',' + value.z + unit + ')';
  };
  var setter4d = function(attr, value, unit)
  {
    return attr + '(' + value.x + ',' + value.y + ',' + value.z + ',' + value.angle + unit + ')';
  };
  var combine = function(ax, ay, bx, by, ascl, bscl)
  {
    return {
      x: (ascl * ax) + (bscl * bx),
      y: (ascl * ay) + (bscl * by)
    };
  };
  var place1d = function(anim, e, attr, value, relativeTo)
  {
    if ( anim.animating[ attr ] === false )
    {
      anim.frame[ attr ] = $convert( e, value, anim.units[ attr ], relativeTo );
      anim.animating[ attr ] = true;
    }
  };
  var place2d = function(anim, e, attr, valueX, valueY, relativeToX, relativeToY)
  {
    if ( anim.animating[ attr ] === false )
    {
      anim.frame[ attr ] = {
        x: $convert( e, valueX, anim.units[ attr ], relativeToX ),
        y: $convert( e, valueY, anim.units[ attr ], relativeToY )
      };
      anim.animating[ attr ] = true;
    }
  };
  var place3d = function(anim, e, attr, valueX, valueY, valueZ, relativeToX, relativeToY, relativeToZ)
  {
    if ( anim.animating[ attr ] === false )
    {
      anim.frame[ attr ] = {
        x: $convert( e, valueX, anim.units[ attr ], relativeToX ),
        y: $convert( e, valueY, anim.units[ attr ], relativeToY ),
        z: $convert( e, valueZ, anim.units[ attr ], relativeToZ )
      };
      anim.animating[ attr ] = true;
    }
  };
  var place4d = function(anim, e, attr, valueX, valueY, valueZ, valueRotate, relativeToX, relativeToY, relativeToZ, relativeToRotate)
  {
    if ( anim.animating[ attr ] === false )
    {
      anim.frame[ attr ] = {
        x: $convert( e, valueX, anim.units[ attr ], relativeToX ),
        y: $convert( e, valueY, anim.units[ attr ], relativeToY ),
        z: $convert( e, valueZ, anim.units[ attr ], relativeToZ ),
        angle: $convert( e, valueRotate, anim.units[ attr ], relativeToRotate )
      };
      anim.animating[ attr ] = true;
    }
  };

  var regexes =
  {
    translate:    /translate\(([^,]+)\s*,\s*([^\)]+)\)/i,
    translate3d:  /translate3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
    translateX:   /translateX\(([^\)]+)\)/i,
    translateY:   /translateY\(([^\)]+)\)/i,
    translateZ:   /translateZ\(([^\)]+)\)/i,
    scale:        /scale\(([^,]+)\s*,\s*([^\)]+)\)/i,
    scale3d:      /scale3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
    scaleX:       /scaleX\(([^\)]+)\)/i,
    scaleY:       /scaleY\(([^\)]+)\)/i,
    scaleZ:       /scaleZ\(([^\)]+)\)/i,
    rotate:       /rotate\(([^\)]+)\)/i,
    skew:         /skew\(([^,]+)\s*,\s*([^\)]+)\)/i,
    skewX:        /skewX\(([^\)]+)\)/i,
    skewY:        /skewY\(([^\)]+)\)/i,
    rotate3d:     /rotate3d\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^\)]+)\)/i,
    rotateX:      /rotateX\(([^\)]+)\)/i,
    rotateY:      /rotateY\(([^\)]+)\)/i,
    rotateZ:      /rotateZ\(([^\)]+)\)/i
  };

  var matrix = /matrix\(([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\s*,\s*([^,]+)\)/i;

  var getters =
  {
    translate:    getter2d,
    translate3d:  getter3d,
    translateX:   getter1d,
    translateY:   getter1d,
    translateZ:   getter1d,
    scale:        getter2d,
    scale3d:      getter3d,
    scaleX:       getter1d,
    scaleY:       getter1d,
    scaleZ:       getter1d,
    rotate:       getter1d,
    rotate3d:     getter4d,
    rotateX:      getter1d,
    rotateY:      getter1d,
    rotateZ:      getter1d,
    skew:         getter2d,
    skewX:        getter1d,
    skewY:        getter1d
  };

  var setters =
  {
    translate:    setter2d,
    translate3d:  setter3d,
    translateX:   setter1d,
    translateY:   setter1d,
    translateZ:   setter1d,
    scale:        setter2d,
    scale3d:      setter3d,
    scaleX:       setter1d,
    scaleY:       setter1d,
    scaleZ:       setter1d,
    rotate:       setter1d,
    rotate3d:     setter4d,
    rotateX:      setter1d,
    rotateY:      setter1d,
    rotateZ:      setter1d,
    skew:         setter2d,
    skewX:        setter1d,
    skewY:        setter1d
  };

  var props = new FastMap( regexes );
  var regex = props.values;
  var attrs = props.keys;
  props.setters = [];
  props.getters = [];

  for (var prop in getters)
  {
    var i = props.indexOf( prop );

    props.getters[ i ] = getters[ prop ];
    props.setters[ i ] = setters[ prop ];
  }

  return {

    get: function(e, anim)
    {
      var style = $style( e, css );

      var matrixParsed = matrix.exec( style );

      if ( matrixParsed )
      {
        var a = parseFloat( matrixParsed[ 1 ] );
        var b = parseFloat( matrixParsed[ 2 ] );
        var c = parseFloat( matrixParsed[ 3 ] );
        var d = parseFloat( matrixParsed[ 4 ] );
        var tx = parseFloat( matrixParsed[ 5 ] );
        var ty = parseFloat( matrixParsed[ 6 ] );

        // Make sure the matrix is invertible
        if ((a * d - b * c) !== 0)
        {
          // Take care of translation
          var translateX = tx + 'px';
          var translateY = ty + 'px';

          // Compute X scale factor and normalize first row.
          var scaleX = Math.sqrt( a * a + b * b );
          if ( scaleX !== 0 )
          {
            a /= scaleX;
            b /= scaleX;
          }

          // Compute shear factor and make 2nd row orthogonal to 1st.
          var skew = a * c + b * d;
          var combined = combine( c, d, a, b, 1.0, -skew );
          c = combined.x;
          d = combined.y;

          // Now, compute Y scale and normalize 2nd row.
          var scaleY = Math.sqrt( c * c + d * d );
          if ( scaleY !== 0 )
          {
            c /= scaleY;
            d /= scaleY;
            skew /= scaleY;
          }

          // Now, get the rotation out
          var rotate = Math.atan2( b, a ) + 'rad';

          // Place values in animator.
          place2d( anim, e, 'translate', translateX, translateY, 'width', 'height' );
          place3d( anim, e, 'translate3d', translateX, translateY, 0, 'width', 'height' );
          place1d( anim, e, 'translateX', translateX, 'width' );
          place1d( anim, e, 'translateY', translateY, 'height' );
          place2d( anim, e, 'scale', scaleX, scaleY );
          place1d( anim, e, 'scaleX', scaleX );
          place1d( anim, e, 'scaleY', scaleY );
          place3d( anim, e, 'scale3d', scaleX, scaleY, 1 );
          place1d( anim, e, 'rotate', rotate );
          place4d( anim, e, 'rotate3d', 0, 0, 1, rotate );
          place1d( anim, e, 'rotateZ', rotate );
          place2d( anim, e, 'skew', skew, skew );
          place1d( anim, e, 'skewX', skew );
          place1d( anim, e, 'skewY', skew );

          return;
        }
      }

      for (var attr in anim.animating)
      {
        var i = props.indexOf( attr );

        if ( i !== -1 && anim.animating[ attr ] === false )
        {
          var parsed = regex[ i ].exec( style );

          if ( parsed )
          {
            anim.frame[ attr ] = props.getters[ i ]( e, anim, parsed, attr );
            anim.animating[ attr ] = true;
          }
        }
      }
    },
    set: function(e, anim)
    {
      var transforms = [];

      for (var i = 0; i < attrs.length; i++)
      {
        var attr = attrs[ i ];

        if ( attr in anim.frame )
        {
          transforms.push( props.setters[ i ]( attr, anim.frame[ attr ], anim.units[ attr ] ) );
        }
      }

      if (transforms.length)
      {
        anim.styles[ css ] = transforms.join( ' ' );
      }
    },
    unset: function(e, anim, attr)
    {
      unset( e, anim, attr, this, css, '' );
    }
  };

})();

Properties.opacity = (function()
{
  var css = $prefix(['WebkitOpacity', 'MozOpacity', 'KhtmlOpacity', 'opacity']);

  if ( !css )
  {
    return Properties.noop;
  }

  return {

    get: function(e, anim)
    {
      if (anim.animating.opacity === false)
      {
        var style = $style( e, css );
        var opacity = parseFloat( style );

        if ( !isNaN(opacity) )
        {
          anim.frame.opacity = opacity;
          anim.animating.opacity = true;
        }
      }
    },
    set: function(e, anim)
    {
      anim.styles[ css ] = clamp( anim.frame.opacity, 0, 1 );
    },
    unset: function(e, anim)
    {
      e.style[ css ] = null;
    }
  };

})();

Properties.shadow = (function()
{
  var css = $prefix(['WebkitBoxShadow', 'MozBoxShadow', 'boxShadow']);

  if ( !css )
  {
    return Properties.noop;
  }

  var parsePart = function( e, anim, attr, value, relativeTo )
  {
    if ( anim.updating[ attr ] === false && value )
    {
      var parsed = $convert( e, value, anim.units[ attr ], relativeTo );

      if ( parsed !== false )
      {
        anim.frame[ attr ] = parsed;
        anim.updating[ attr ] = true;
      }
    }
  };

  return {

    get: function(e, anim)
    {
      var style = $style( e, css );
      var parts = style.split( ' ' );

      if ( parts.length < 3 )
      {
        return;
      }

      var inset = 0;

      if ( parts[ 0 ] === 'inset' )
      {
        inset = 1;
        parts.shift();
      }

      var x = parts[ 0 ];
      var y = parts[ 1 ];
      var blur = false, spread = false, color = false;

      switch ( parts.length ) {
        case 3:
          color = parts[ 2 ];
          break;
        case 4:
          blur = parts[ 2 ];
          color = parts[ 3 ];
          break;
        case 5:
          blur = parts[ 2 ];
          spread = parts[ 3 ];
          color = parts[ 4 ];
          break;
      }

      parsePart( e, anim, 'shadowX', x, 'width' );
      parsePart( e, anim, 'shadowY', y, 'height' );
      parsePart( e, anim, 'shadowBlur', blur, 'width' );
      parsePart( e, anim, 'shadowSpread', spread, 'width' );

      if ( anim.updating.shadowPosition === false )
      {
        var parsedX = $convert( e, x, anim.units.shadowPosition, 'width' );
        var parsedY = $convert( e, y, anim.units.shadowPosition, 'height' );

        if ( parsedX !== false && parsedY !== false )
        {
          anim.frame.shadowPosition = {
            x: parsedX,
            y: parsedY
          };
          anim.updating.shadowPosition = true;
        }
      }

      if ( anim.updating.shadowInset === false )
      {
        anim.frame.shadowInset = inset;
        anim.updating.shadowInset = true;
      }

      if ( anim.updating.shadowColor === false )
      {
        var parsed = Color.parse( color );

        if ( parsed !== false )
        {
          anim.frame.shadowColor = parsed;
          anim.updating.shadowColor = true;
        }
      }

    },

    set: function(e, anim)
    {
      var style = '';

      if ( anim.frame.inset )
      {
        style += 'inset '; // TODO test - fixed but not sure
      }

      style += anim.valueOr( 'shadowX', 'shadowPosition', 'x' ) + ' ';
      style += anim.valueOr( 'shadowY', 'shadowPosition', 'y' ) + ' ';

      if ( isNumber( anim.frame.shadowBlur ) )
      {
        style += anim.value( 'shadowBlur' ) + ' ';
      }

      if ( isNumber( anim.frame.shadowSpread ) )
      {
        style += anim.value( 'shadowSpread' ) + ' ';
      }

      style += Color.format( anim.frame.shadowColor );

      anim.styles[ css ] = style;
    },

    unset: function(e, anim, attr)
    {
      unset( e, anim, attr, this, css, null );
    }

  };

})();


Properties.textShadow = (function()
{
  var css = $prefix(['WebkitTextShadow', 'MozTextShadow', 'textShadow']);

  if ( !css )
  {
    return Properties.noop;
  }

  var parsePart = function( e, anim, attr, value, relativeTo )
  {
    if ( anim.updating[ attr ] === false && value )
    {
      var parsed = $convert( e, value, anim.units[ attr ], relativeTo );

      if ( parsed !== false )
      {
        anim.frame[ attr ] = parsed;
        anim.updating[ attr ] = true;
      }
    }
  };

  return {

    get: function(e, anim)
    {
      var style = $style( e, css );
      var parts = style.split( ' ' );

      if ( parts.length < 3 )
      {
        return;
      }

      var x = parts[ 0 ];
      var y = parts[ 1 ];
      var blur = false, color = false;

      switch ( parts.length ) {
        case 3:
          color = parts[ 2 ];
          break;
        case 4:
          blur = parts[ 2 ];
          color = parts[ 3 ];
          break;
      }

      parsePart( e, anim, 'textShadowX', x, 'width' );
      parsePart( e, anim, 'textShadowY', y, 'height' );
      parsePart( e, anim, 'textShadowBlur', blur, 'width' );

      if ( anim.updating.textShadowPosition === false )
      {
        var parsedX = $convert( e, x, anim.units.textShadowPosition, 'width' );
        var parsedY = $convert( e, y, anim.units.textShadowPosition, 'height' );

        if ( parsedX !== false && parsedY !== false )
        {
          anim.frame.textShadowPosition = {
            x: parsedX,
            y: parsedY
          };
          anim.updating.textShadowPosition = true;
        }
      }

      if ( anim.updating.textShadowColor === false )
      {
        var parsed = Color.parse( color );

        if ( parsed !== false )
        {
          anim.frame.textShadowColor = parsed;
          anim.updating.textShadowColor = true;
        }
      }
    },

    set: function(e, anim)
    {
      var style = '';

      if ( anim.frame.inset )
      {
        style += 'inset '; // TODO test - fixed but not sure
      }

      style += anim.valueOr( 'textShadowX', 'textShadowPosition', 'x' ) + ' ';
      style += anim.valueOr( 'textShadowY', 'textShadowPosition', 'y' ) + ' ';

      if ( isNumber( anim.frame.textShadowBlur ) )
      {
        style += anim.value( 'textShadowBlur' ) + ' ';
      }

      if ( isNumber( anim.frame.textShadowSpread ) )
      {
        style += anim.value( 'textShadowSpread' ) + ' ';
      }

      style += Color.format( anim.frame.textShadowColor );

      anim.styles[ css ] = style;
    },

    unset: function(e, anim, attr)
    {
      unset( e, anim, attr, this, css, null );
    }

  };

})();

Properties.filter = (function()
{
  var css = $prefix(['WebkitFilter', 'MozFilter', 'OFilter', 'msFilter', 'filter']);

  if ( !css )
  {
    return Properties.noop;
  }

  var methods =
  {
    grayscale:  'grayscale',
    sepia:      'sepia',
    saturate:   'saturate',
    hueRotate:  'hue-rotate',
    invert:     'invert',
    brightness: 'brightness',
    contrast:   'contrast',
    blur:       'blur'
  };

  var patterns = {};

  for (var attr in methods)
  {
    patterns[attr] = new RegExp( methods[attr] + '\(([^\)]+)\)', 'i');
  }

  return {

    get: function(e, anim)
    {
      var style = $style( e, css );

      for (var attr in patterns)
      {
        if ( anim.animating[attr] === false )
        {
          var parsed = patterns[attr].exec( style );

          if ( parsed )
          {
            var converted = $convert( e, parsed[1], anim.units[ attr ] );

            if ( converted !== false )
            {
              anim.frame[ attr ] = converted;
              anim.animating[ attr ] = true;
            }
          }
        }
      }
    },
    set: function(e, anim)
    {
      // we don't check anim.updated[attr] here since the current value of a transform property is important

      var filters = [];

      for (var attr in methods)
      {
        if ( attr in anim.frame )
        {
          filters.push( methods[attr] + '(' + anim.value( attr ) + ')' );
        }
      }

      if (filters.length)
      {
        anim.styles[ css ] = filters.join(' ');
      }
    },
    unset: function(e, anim, attr)
    {
      unset( e, anim, attr, this, css, null );
    }
  };

})();

Properties.center =
{
  get: function(e, anim)
  {
    var cx = (e.offsetLeft + e.offsetWidth * 0.5) + 'px';
    var cy = (e.offsetTop + e.offsetHeight * 0.5) + 'px';

    if ( anim.animating.center === false )
    {
      var desiredUnit = anim.units.center;
      var ccx = $convert( e, cx, desiredUnit, 'parentWidth' );
      var ccy = $convert( e, cy, desiredUnit, 'parentHeight' );

      if ( ccx !== false && ccy !== false )
      {
        anim.frame.center = {
          x: ccx,
          y: ccy
        };
        anim.animating.center = true;
      }
    }
    if ( anim.animating.centerX === false )
    {
      var desiredUnit = anim.units.centerX;
      var ccx = $convert( e, cx, desiredUnit, 'parentWidth' );

      if ( ccx !== false )
      {
        anim.frame.centerX = ccx;
        anim.animating.centerX = true;
      }
    }
    if ( anim.animating.centerY === false )
    {
      var desiredUnit = anim.units.centerY;
      var ccy = $convert( e, cy, desiredUnit, 'parentHeight' );

      if ( ccy !== false )
      {
        anim.frame.centerY = ccy;
        anim.animating.centerY = true;
      }
    }
  },
  preset: function(e, anim)
  {
    anim.cached.width  = $convert( e, e.offsetWidth + 'px', anim.units.centerX || anim.units.center, 'parentWidth' );
    anim.cached.height = $convert( e, e.offsetHeight + 'px', anim.units.centerY || anim.units.center, 'parentHeight' );
  },
  set: function(e, anim)
  {
    var rw = anim.cached.width * 0.5;
    var rh = anim.cached.height * 0.5;

    if ( anim.updated.center )
    {
      anim.styles.left = (anim.frame.center.x - rw) + anim.units.center;
      anim.styles.top = (anim.frame.center.y - rh) + anim.units.center;
    }
    if ( anim.updated.centerX )
    {
      anim.styles.left = (anim.frame.centerX - rw) + anim.units.centerX;
    }
    if ( anim.updated.centerY )
    {
      anim.styles.top = (anim.frame.centerY - rh) + anim.units.centerY;
    }
  },
  unset: function(e, anim, attr)
  {

  }
};

Properties.orbit =
{
  DEGREE_TO_RADIAN: Math.PI / 180.0,

  RADIAN_TO_DEGREE: 180.0 / Math.PI,

  get: function(e, anim)
  {
    var ox = (e.parentNode.scrollWidth * 0.5);
    var oy = (e.parentNode.scrollHeight * 0.5);
    var cx = (e.offsetLeft + e.offsetWidth * 0.5);
    var cy = (e.offsetTop + e.offsetHeight * 0.5);
    var dx = cx - ox;
    var dy = cy - oy;

    if ( anim.animating.orbitOffset === false )
    {
      var cunit = anim.units.orbitOffset;
      var cox = $convert( e, ox + 'px', cunit, 'parentWidth' );
      var coy = $convert( e, oy + 'px', cunit, 'parentHeight' );

      if ( cox !== false && coy !== false )
      {
        anim.frame.orbitOffset = {
          x: cox,
          y: coy
        };
        anim.animating.orbitOffset = false;
      }
    }

    if ( anim.animating.distance === false )
    {
      anim.frame.distance = Math.sqrt( dx * dx + dy * dy );
      anim.animating.distance = true;
    }

    if ( anim.animating.angle === false )
    {
      anim.frame.angle = Math.atan2( dy, dx ) * this.RADIAN_TO_DEGREE;
      anim.animating.angle = true;
    }
  },

  preset: function(e, anim)
  {
    anim.cached.parentWidth = e.parentNode.scrollWidth;
    anim.cached.parentHeight = e.parentNode.scrollHeight;
    anim.cached.width = e.offsetWidth;
    anim.cached.height = e.offsetHeight;
  },

  set: function(e, anim)
  {
    // TODO calculator this correctly
    var cunit = anim.units.orbitOffset || '%';
    var orbitX = anim.frame.orbitOffset ? anim.frame.orbitOffset.x : 50;
    var orbitY = anim.frame.orbitOffset ? anim.frame.orbitOffset.y : 50;

    var originUnit = anim.units.origin || '%';
    var originX = anim.frame.origin ? anim.frame.origin.x : 50;
    var originY = anim.frame.origin ? anim.frame.origin.y : 50;

    var cox = $convert( e, orbitX + cunit, 'px', anim.cached.parentWidth / 100.0 );
    var coy = $convert( e, orbitY + cunit, 'px', anim.cached.parentHeight / 100.0 );

    var ox = $convert( e, originX + originUnit, 'px', anim.cached.width / 100.0 );
    var oy = $convert( e, originY + originUnit, 'px', anim.cached.height / 100.0 );

    var angle = (anim.frame.angle || 0.0) * this.DEGREE_TO_RADIAN;
    var distance = anim.frame.distance || 0.0;

    var cos = Math.cos( angle ) * distance;
    var sin = Math.sin( angle ) * distance;

    anim.styles.left = (cox + cos - ox) + 'px';
    anim.styles.top = (coy + sin - oy) + 'px';
  },

  unset: function(e, anim, attr)
  {

  }
};
