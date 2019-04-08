
export * from 'anim8js';
import { Easing, AnimationOptions } from "anim8js";
import { FactoryDom, SubjectDom, AnimatorDom, AttributesDom, Unit } from "anim8js-dom";

declare module "anim8js"
{
  export interface EasingMap
  {
    'cssEase': Easing;
    'cssEaseIn': Easing;
    'cssEaseOut': Easing;
    'cssEaseInOut': Easing;
    'cssLinear': Easing;
  }

  export interface Factories
  {
    'default': FactoryDom;
  }

  export interface AnimationDefinition<A = any>
  {
    units?: AnimationOptions<A, Unit>;
  }

  export function anim8 (subject: SubjectDom): AnimatorDom;
  export function anim8s (subject: SubjectDom): Animators<AttributesDom, SubjectDom>;
  export function m8 (subject: SubjectDom): AnimatorDom;
  export function m8s (subject: SubjectDom): Animators<AttributesDom, SubjectDom>;

}