
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
