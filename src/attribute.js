
/**
 * Returns an attribute based on the given input. If the input is an object it's assumed to be an attribute and it's
 * returned immediately. If the input is a string the attribute with the given name is returned. Otherwise
 * the default attribute is returned.
 *
 * @param {Object|String} attr
 */
function $attribute(attr)
{
  if ( isObject( attr ) && isDefined( attr.defaultValue ) )
  {
    return attr;
  }
  if ( isString( attr ) && attr in Attributes )
  {
    return Attributes[ attr ];
  }

  return Attributes['default'];
}
