
/**
 * A factory for HTML Elements
 */
function FactoryDom()
{
  this.cached = {};
  this.ids = 0;
  this.elementAttribute = 'anim8';
  this.priority = 5;
  this.attributes = {};
}

Class.extend( FactoryDom, Factory,
{

  /**
   * Determines whether the given subject is valid for this factory to create Animators for.
   *
   * @param  {any} subject
   * @return {Boolean}
   */
  is: function(subject)
  {
    return isElement( subject );
  },

  /**
   * Returns an animator given a subject.
   *
   * @param  {HTMLElement} subject
   * @return {anim8.Animator}
   */
  animatorFor: function(subject)
  {
    var animatorId = subject.getAttribute( this.elementAttribute );

    if (!(animatorId in this.cached))
    {
      var animator = new AnimatorDom( subject );

      subject.setAttribute( this.elementAttribute, animatorId = animator.id = ++this.ids );

      animator.factory = this;

      this.cached[animatorId] = animator;
    }

    return this.cached[ animatorId ];
  },

  /**
   * Destroys the animator by unlinking the animator from the subject.
   *
   * @param  {anim8.Animator} animator
   */
  destroy: function(animator)
  {
    delete this.cached[ animator.id ];
  },

  /**
   * Returns the attribute descriptor for the given attribute.
   *
   * @param  {String} attr
   * @return {Object}
   */
  attribute: function(attr)
  {
    var attribute = this.attributes[ attr ];

    if ( !attribute )
    {
      attribute = this.attributes[ attr ] = $attribute( attr );

      var calculatorName = attribute.calculator;
      var calculator = $calculator( calculatorName );
      var defaultValue = calculator.parse( attribute.defaultValue, calculator.ZERO );
      var propertyName = coalesce( attribute.property, attr );
      var property = $property( propertyName );
      var defaultUnit = attribute.defaultUnit || '';

      attribute.calculatorName = calculatorName;
      attribute.calculator = calculator;
      attribute.defaultValue = defaultValue;
      attribute.name = attr;
      attribute.propertyName = propertyName;
      attribute.property = property;
      attribute.defaultUnit = defaultUnit;
      attribute.parse = function(value) {
        return this.calculator.parse( value, this.defaultValue );
      };
      attribute.cloneDefault = function() {
        return this.calculator.clone( this.defaultValue );
      };
    }

    return attribute;
  }

});
