
import { Easing, AnimationOptions } from "anim8js";
import { FactoryDom, Unit } from "anim8js-dom";

declare module "anim8js"
{
  interface EasingMap
  {
    'cssEase': Easing;
    'cssEaseIn': Easing;
    'cssEaseOut': Easing;
    'cssEaseInOut': Easing;
    'cssLinear': Easing;
  }

  interface Factories
  {
    'default': FactoryDom;
  }

  interface AnimationDefinition<A = any>
  {
    units?: AnimationOptions<A, Unit>;
  }
}