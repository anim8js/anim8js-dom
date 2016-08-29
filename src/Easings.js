
/**
 * Easings equivalent to the CSS animations. These are approximations since the
 * exact functions are not performant enough.
 */

Easings['cssEase']      = Easings.ease;

Easings['cssEaseIn']    = Easings.quad;

Easings['cssEaseOut']   = EasingTypes.out( Easings.quad );

Easings['cssEaseInOut'] = EasingTypes.inout( Easings.quad );

Easings['cssLinear']    = Easings.linear;
