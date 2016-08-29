
/**
 * Returns true if the given variable is an HTML element.
 *
 * @method anim8.isElement
 * @param {Any} x
 * @return {Boolean}
 */
function isElement(x)
{
  return typeof HTMLElement === "object" ? x instanceof HTMLElement :
  x && typeof x === "object" && x !== null && x.nodeType === 1 && typeof x.nodeName === "string";
}


function unset( e, anim, attr, property, css, clearedValue )
{
  if ( attr === true )
  {
    e.style[ css ] = clearedValue;
  }
  else
  {
    delete anim.frame[ attr ];

    property.set( e, anim );

    e.style[ css ] = anim.styles[ css ];
  }
}


/**
 * Computes the desired style of the given element and returns it as a string.
 * The style given must be in hyphenated format like so:
 * anim8.dom.style( element, 'font-size' ) = '12px'
 *
 * @param {HTMLElement} e
 * @param {String} style
 * @return {String}
 */
var $style = (function()
{
  var hyphenated = {};

  var hyphenize = function(str)
  {
    if ( str in hyphenated )
    {
      return hyphenated[ str ];
    }

    var key = str;

    str = str.replace(/[a-z][A-Z]/g, function(str, letter)
    {
     return str[0] + '-' + str[1].toLowerCase();
    });

    str = str.replace(/^Webkit/, '-webkit');
    str = str.replace(/^Moz/, '-moz');
    str = str.replace(/^Ms/, '-ms');
    str = str.replace(/^O/, '-o');
    str = str.replace(/^Khtml/, '-khtml');

    hyphenated[ key ] = str;

    return str;
  };

  return function(e, style)
  {
    if (e.currentStyle)
    {
      return e.currentStyle[ style ];
    }
    else if (document.defaultView && document.defaultView.getComputedStyle)
    {
      return document.defaultView.getComputedStyle( e, null ).getPropertyValue( hyphenize( style ) );
    }
    else
    {
      return e.style[ style ];
    }
  };

})();

/**
 * Given an array of styles this will return the first one that is present on elements in the current browser.
 *
 * @param {Array} prefixes
 * @return {String|false}
 */
var $prefix = (function()
{
  var a = document.createElement('a');

  return function(prefixes)
  {
    for (var i = 0; i < prefixes.length; i++)
    {
      if ( isDefined( a.style[ prefixes[ i ] ] ) )
      {
        return prefixes[i];
      }
    }
    return false;
  };

})();

/**
 * Parses the string for a value and a unit.
 *
 * @param {String} value
 * @return {Object|false}
 */
var $parseValue = (function()
{
  var regex = /(-?\d*(\.\d+)|-?\d+)(px|em|%|vw|ex|cm|mm|in|pt|pc|deg|rad)?/;

  return function(x)
  {
    var parsed = regex.exec( x );

    if (parsed)
    {
      return {
        value: parseFloat( parsed[1] ),
        unit: parsed[3]
      };
    }

    return false;
  };
})();


/**
 * Converts one unit to another for a given element.
 *
 * For Example: anim8.dom.convert( element, '100px', '%', 'parentWidth' )
 *    returns how much percent 100px relativeTo parentWidth of the given element
 *
 * @param {HTMLElement} e
 * @param {String} from
 * @param {String} toUnit
 * @param {String|Number} relativeTo
 * @return {Number|false}
 */
var $convert = (function()
{
  /**
   * Calculators how many pixels a given value & unit is.
   *
   * For Example: anim8.toPixels( 100, 'in' )
   *    returns how many pixels are in 1 inch, with up to 2 decimal points of accuracy.
   */
  var toPixels = function(baseValue, baseUnit, defaultRate)
  {
    if ( document.body )
    {
      try
      {
        var div = document.createElement('div');
        document.body.appendChild( div );
        div.style.width = baseValue + baseUnit;
        var pixels = (div.offsetWidth / baseValue);
        document.body.removeChild( div );

        return pixels || defaultRate;
      }
      catch (e)
      {
        // Do nothing
      }
    }

    return defaultRate;
  };

  var getFontSize = function(e, notUnit, relativeTo)
  {
    var fontSize = $style( e, 'fontSize' );
    var parsed = $parseValue( fontSize );

    if ( !parsed || parsed.unit === notUnit )
    {
      return 12;
    }

    if ( parsed.unit === 'px' )
    {
      return parsed.value;
    }

    return getConverterScale( e, conversions[ parsed.unit ].px, relativeTo );
  };

  var variables = {};

  variables.parentWidth = function(e)
  {
    return e.parentNode.scrollWidth;
  };
  variables.parentHeight = function(e)
  {
    return e.parentNode.scrollHeight;
  };
  variables.width = function(e)
  {
    return e.offsetWidth;
  };
  variables.height = function(e)
  {
    return e.offsetHeight;
  };
  variables.fontSize = function(e)
  {
    return getFontSize( e, '%' );
  };
  variables.parentFontSize = function(e)
  {
    return getFontSize( e.parentNode, '%' );
  };
  variables.htmlFontSize = function(e)
  {
    var htmlElement = document.getElementsByTagName("html")[0];

    return getFontSize( htmlElement, '%' );
  };

  var conversions = {};

  conversions['pt']  = { px: toPixels( 100, 'pt', 1 ) };
  conversions['in']  = { px: toPixels( 100, 'in', 72 ) };
  conversions['cm']  = { px: toPixels( 1000, 'cm', 72 / 2.54 ) };
  conversions['mm']  = { px: toPixels( 100000, 'mm', 72 / 25.4 ) };
  conversions['vw']  = { px: toPixels( 1000, 'vw', 1024 * 0.01 ) };
  conversions['deg'] = { rad: Math.PI / 180.0 };

  conversions['em'] =
  {
    px: function(e, relativeTo)
    {
      return getFontSize( e, 'em', relativeTo );
    }
  };

  conversions['rem'] =
  {
    px: function(e, relativeTo)
    {
      var htmlElement = document.getElementsByTagName("html")[0];

      return getFontSize( htmlElement, 'rem', relativeTo );
    }
  };

  conversions['%'] =
  {
    px: function(e, relativeTo)
    {
      if ( isNumber( relativeTo ) )
      {
        return relativeTo;
      }
      if ( relativeTo in variables )
      {
        return variables[ relativeTo ]( e ) * 0.01;
      }

      return 1.0;
    }
  };

  // Populate conversions going other way.
  for (var unit in conversions)
  {
    for (var to in conversions[ unit ])
    {
      if ( !(to in conversions) )
      {
        conversions[ to ] = {};
      }

      if ( !(unit in conversions[ to ]) )
      {
        var given = conversions[ unit ][ to ];

        if ( isNumber( given ) )
        {
          conversions[ to ][ unit ] = 1.0 / given;
        }
        if ( isFunction( given ) )
        {
          conversions[ to ][ unit ] = (function(converter)
          {
            return function(e, relativeTo)
            {
              return 1.0 / converter( e, relativeTo );
            };
          })( given );
        }
      }
    }
  }

  // Given an element, convert, and relativeTo - return the number we need to multiply by.
  var getConverterScale = function(e, converter, relativeTo)
  {
    if ( isNumber( converter ) )
    {
      return converter;
    }
    else if ( isFunction( converter ) )
    {
      return converter( e, relativeTo );
    }

    return 1.0;
  };

  return function(e, from, toUnit, relativeTo)
  {
    if ( isNumber( from ) )
    {
      return from;
    }

    var parsed = $parseValue( from );

    if ( !parsed )
    {
      return false;
    }

    var value = parsed.value;
    var fromUnit = parsed.unit;

    if ( !fromUnit || fromUnit === toUnit )
    {
      return value;
    }

    // First see if we have a direct conversion available...
    if ( fromUnit in conversions && toUnit in conversions[ fromUnit ] )
    {
      var converter = conversions[ fromUnit ][ toUnit ];

      value *= getConverterScale( e, converter, relativeTo );
    }
    // Otherwise convert it to px, then to the desired unit
    else if ( fromUnit in conversions && conversions[ fromUnit ].px && toUnit in conversions.px )
    {
      var converter1 = conversions[ fromUnit ].px;
      var converter2 = conversions.px[ toUnit ];

      var combined = getConverterScale( e, converter1, relativeTo ) *
                     getConverterScale( e, converter2, relativeTo );

      value *= combined;
    }

    return value;
  };

})();
