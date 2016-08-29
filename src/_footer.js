

  // Register Factory
  anim8.Factories['default'] = anim8.Factories['dom'] = new FactoryDom();

  // Classes
  anim8.AnimatorDom = AnimatorDom;
  anim8.FactoryDom = FactoryDom;

  // Functions
  anim8.isElement = isElement;

  // Variables
  anim8.browser = browser;
  anim8.Matrix = Matrix;

  // Namespace
  anim8.dom = {
    Attributes:           Attributes,
    attribute:            $attribute,
    convert:              $convert,
    style:                $style,
    parseValue:           $parseValue,
    property:             $property,
    prefix:               $prefix,
    concatenateStyle:     concatenateStyle,
    setProperty:          setProperty,
    unset:                unset,
    factory:              factory,
    factoryDerivable:     factoryDerivable,
    factoryColor:         factoryColor
  };

  return anim8;

}));
