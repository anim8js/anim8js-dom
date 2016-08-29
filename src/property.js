
/**
 * Returns a property for the given name.
 *
 * @param  {String|Object}
 * @return {Object}
 */
function $property(prop)
{
  if ( isObject( prop ) && isFunction( prop.get ) && isFunction( prop.set ) )
  {
    return prop;
  }
  if ( isString( prop ) && prop in Properties )
  {
    return Properties[ prop ];
  }

  throw prop + ' is not a valid property';
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
