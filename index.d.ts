
import { ValueNumber, Animator, Animators, Value2d, ValueQuat, Value3d, ValueRGBA, FastMap, AttributesValues, Input, PathInput, OptionsInput, Factory, Attribute, Easing, EasingMap, Factories, Movie, Sequence, MovieTimeline, MoviePlayer, anim8, anim8s, m8, m8s, Inputs, AnimationDefinition, AnimationOptions } from "./types/anim8js";

declare module "anim8js-dom"
{
  
  export type SubjectDom = Element | EventTarget | HTMLElement;

  export class AttributesDom
  {
    padding: ValueNumber;
    paddingTop: ValueNumber;
    paddingRight: ValueNumber;
    paddingBottom: ValueNumber;
    paddingLeft: ValueNumber;

    margin: ValueNumber;
    marginTop: ValueNumber;
    marginRight: ValueNumber;
    marginBottom: ValueNumber;
    marginLeft: ValueNumber;

    borderRadius: ValueNumber;
    borderTopLeftRadius: ValueNumber;
    borderTopRightRadius: ValueNumber;
    borderBottomLeftRadius: ValueNumber;
    borderBottomRightRadius: ValueNumber;

    borderWidth: ValueNumber;
    borderTopWidth: ValueNumber;
    borderRightWidth: ValueNumber;
    borderBottomWidth: ValueNumber;
    borderLeftWidth: ValueNumber;

    outlineWidth: ValueNumber;
    outlineOffset: ValueNumber;
    textIndent: ValueNumber;
    tabSize: ValueNumber;
    borderSpacing: ValueNumber;
    fontSize: ValueNumber;
    lineHeight: ValueNumber;
    letterSpacing: ValueNumber;
    wordSpacing: ValueNumber;

    origin: Value2d;
    originX: ValueNumber;
    originY: ValueNumber;

    opacity: ValueNumber;
    zIndex: ValueNumber;

    width: ValueNumber;
    minWidth: ValueNumber;
    maxWidth: ValueNumber;

    height: ValueNumber;
    minHeihgt: ValueNumber;
    maxHeight: ValueNumber;

    angle: ValueNumber;
    distance: ValueNumber;
    orbitOffset: Value2d;

    top: ValueNumber;
    right: ValueNumber;
    bottom: ValueNumber;
    left: ValueNumber;

    center: Value2d;
    centerX: ValueNumber;
    centerY: ValueNumber;
    
    blur: ValueNumber;
    sepia: ValueNumber;
    brightness: ValueNumber;
    grayscale: ValueNumber;
    contrast: ValueNumber;
    invert: ValueNumber;
    saturation: ValueNumber;
    hueRotate: ValueNumber;

    rotate: ValueNumber;
    rotate3d: ValueQuat;

    translate: Value2d;
    translateX: ValueNumber;
    translateY: ValueNumber;
    translateZ: ValueNumber;
    translate3d: Value3d;

    scale: Value2d;
    scaleX: ValueNumber;
    scaleY: ValueNumber;
    scaleZ: ValueNumber;
    scale3d: Value3d;

    skew: Value2d;
    skewX: ValueNumber;
    skewY: ValueNumber;

    backface: ValueNumber;
    visibility: ValueNumber;

    backgroundColor: ValueRGBA;
    color: ValueRGBA;
    borderTopColor: ValueRGBA;
    borderRightColor: ValueRGBA;
    borderBottomColor: ValueRGBA;
    borderLeftColor: ValueRGBA;
    borderColor: ValueRGBA;
    outlineColor: ValueRGBA;
    textDecorationColor: ValueRGBA;

    textShadowX: ValueNumber;
    textShadowY: ValueNumber;
    textShadowPosition: Value2d;
    textShadowBlur: ValueNumber;
    textShadowColor: ValueRGBA;

    shadowX: ValueNumber;
    shadowY: ValueNumber;
    shadowPosition: Value2d;
    shadowBlur: ValueNumber;
    shadowSpread: ValueNumber;
    shadowColor: ValueRGBA;
    shadowInset: ValueNumber;

    scrollTop: ValueNumber;
    scrollLeft: ValueNumber;
  }

  export type Unit = string;

  export type Units = { [P in keyof AttributesDom]?: Unit };

  export class AnimatorDom<A = AttributesDom, S = SubjectDom> extends Animator<A, S>
  {
    public properties: FastMap<Property>;
    public propertiesPreset: FastMap<Property>;
    public attributeToProperty: { [attr in keyof AttributesDom]?: string };
    public animating: { [attr in keyof AttributesDom]?: boolean };
    public cached: any;
    public units: { [attr in keyof AttributesDom]: string };
    public styles: { [prop: string]: string };
    public styled: boolean;
    public stylesUpdated: boolean;

    public getStyles(): void;
    public valueOr (attr: keyof A, other: keyof A, subproperty: string): string;
    public convertExisting( attr: keyof A, toUnit: Unit): void;
    public convertExistingMany (units?: Units): void;

    public ref<K extends keyof A> (attribute: K, desiredUnit: Unit, relativeTo: Unit): () => A[K];
    public value (attr: keyof A): string;
    public tweenTo<K extends keyof A> (attr: K, target: Input<A[K]>, options?: OptionsInput, cache?: boolean, unit?: Unit): this;
    public tweenManyTo (targets: Inputs<A>, options?: OptionsInput, cache?: boolean, units?: Units): this;
    public tweenFrom<K extends keyof A> (attr: K, starting: Input<A[K]>, options?: OptionsInput, cache?: boolean, unit?: Unit): this;
    public tweenManyFrom (startings: Inputs<A>, options?: OptionsInput, units?: Units): this;
    public tween<K extends keyof A> (attr: K, starts: Input<A[K]>, ends: Input<A[K]>, options?: OptionsInput, cache?: boolean, unit?: Unit): this;
    public tweenMany (starts: Inputs<A>, ends: Inputs<A>, options?: OptionsInput, cache?: boolean, units?: Units): this;
    public move<K extends keyof A> (attr: K, amount: Input<A[K]>, options?: OptionsInput, cache?: boolean, unit?: Unit): this;
    public moveMany (amounts: Inputs<A>, options?: OptionsInput, cache?: boolean, units?: Units): this;
    public follow<K extends keyof A> (attr: K, path: PathInput<A[K]>, options?: OptionsInput, cache?: boolean, placeholder1?: Unit): this;
  }

  export type AnimatorsDom = Animators<AttributesDom, SubjectDom>;

  export type SequenceDom = Sequence<AttributesDom, SubjectDom>;

  export type MovieDom = Movie<AttributesDom>;

  export type MovieTimelineDom = MovieTimeline<AttributesDom>;

  export type MoviePlayerDom = MoviePlayer<AttributesDom>;

  export class FactoryDom<A = AttributesDom, S = SubjectDom> extends Factory<A, S>
  {
    public priority: 5;
    public elementAttribute: string;
    public attributes: { [P in keyof A]?: Attribute<A, P> };
    public cached: { [id: string]: AnimatorDom }
    public ids: number;
  }

  export interface Property
  {
    get (e: HTMLElement, anim: AnimatorDom): void;
    set (e: HTMLElement, anim: AnimatorDom): void;
    unset (e: HTMLElement, anim: AnimatorDom): void;
    preset? (e: HTMLElement, anim: AnimatorDom): void;
  }

  export function isElement (x: any): x is SubjectDom;

  export interface Matrix2d
  {
    m11: number;
    m12: number;
    m21: number;
    m22: number;
  }

  export const Matrix:
  {
    identity (): Matrix2d;
    multiply (a: Matrix2d, b: Matrix2d): Matrix2d;
    rotate (radians: number): Matrix2d;
    scale (scaleX: number, scaleY: number): Matrix2d;
    skew (skewX: number, skewY: number): Matrix2d;
    transform (matrix: Matrix2d, x: number, y: number): Value2d;
    adjustment (matrix: Matrix2d, w: number, h: number): Value2d;
  }

  export const browser:
  {
    IE: number;
  };

  export const dom:
  {
    Attributes: { 
      [P in keyof AttributesDom]: Partial<Attribute<AttributesDom, P>> 
    };
    attribute<K extends keyof AttributesDom> (attr: string | Partial<Attribute<AttributesDom, K>> ): Partial<Attribute<AttributesDom, K>>;

    convert (e: HTMLElement, from: string | number, toUnit: Unit, relativeTo: Unit): number;
    style (e: HTMLElement, style: string): object | string;
    parseValue (x: string): false | { value: number, unit?: string };
    property (prop: string | Property): Property;
    prefix (prefixes: string[]): string | false;
    concatenateStyle (anim: AnimatorDom, style: string, value: any): void;
    setProperty (attr: keyof AttributesDom, property: string): void;
    unset (e: HTMLElement, anim: AnimatorDom, attr: true | keyof AttributesDom, property: string, css: string, clearedValue: any): void;
    
    factory (nm: string, relativeTo: Unit): Property;
    factoryDerivable (nm: string, relativeTo: Unit, deriver: (e: HTMLElement) => string | number): Property;
    factoryColor (nm: string): Property;
    factoryNumberAttribute (nm: string): Property;
  };

}
