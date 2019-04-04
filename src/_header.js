// UMD (Universal Module Definition)
(function (root, factory)
{
  if (typeof define === 'function' && define.amd) // jshint ignore:line
  {
    // AMD. Register as an anonymous module.
    define(['anim8js'], function(anim8) { // jshint ignore:line
      return factory(anim8, root);
    });
  }
  else if (typeof module === 'object' && module.exports)  // jshint ignore:line
  {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require('anim8js'), global);  // jshint ignore:line
  }
  else
  {
    // Browser globals (root is window)
    factory(root.anim8, root);
  }
}(this, function(anim8, window)
{

  var FastMap = anim8.FastMap;
  var Animator = anim8.Animator;
  var Factory = anim8.Factory;
  var Class = anim8.Class;
  var Color = anim8.Color;
  var Easings = anim8.Easings;
  var EasingTypes = anim8.EasingTypes;
  var isFunction = anim8.isFunction;
  var isString = anim8.isString;
  var isNumber = anim8.isNumber;
  var isDefined = anim8.isDefined;
  var isObject = anim8.isObject;
  var isBoolean = anim8.isBoolean;
  var coalesce = anim8.coalesce;
  var clamp = anim8.clamp;
  var toArray = anim8.toArray;

  var $calculator = anim8.calculator;

  var HTMLElement = (this.HTMLElement || window.HTMLElement);
  var document = (this.document || window.document);

  if (!document)
  {
    throw 'document is not defined on this or window, if you are building for node you cannot use the anim8js-dom package. If you are building with webpack make sure to set output.globalObject to "this".';
  }

  if (!HTMLElement)
  {
    throw 'HTMLElement is not defined on this or window, if you are building for node you cannot use the anim8js-dom package. If you are building with webpack make sure to set output.globalObject to "this".';
  }

  function override(target, source)
  {
    for (var prop in source)
    {
      target[ prop ] = source[ prop ];
    }
  }
