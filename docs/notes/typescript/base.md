# 类型基础

## 类型声明

在 **TypeScript** 中，如果要为变量添加类型约束，只需要在变量的后面加上 **冒号:类型（: type）** 即可。

假设我要声明一个可变的 **userName** 变量并约束为 **字符串类型**，代码如下：

```TypeScript
let userName:string = "CoderMonkey"
```

通过 **string** 类型约束后的 **userName**，意味着在赋值时变量值的类型只能为 **相同类型** 或者为 **该类型的子集**（**相同类型** 很好理解，**类型子集** 后面会详解），否则编译器就会报错。

![Bsase-Demo](../../assets/typescript/ts-base-demo.png)

## string

字符串类型

```TypeScript
const userName:string = "Coder"
```

## number

数字类型（整数、浮点数、非十进制数、非大整数）

```TypeScript
const userAge:number = 18
const pi:number = 3.14
```

## bigint

大整数类型

```TypeScript
const bigInt:bigint = 100n
```

## boolean

布尔类型

```TypeScript
const isHandsome:boolean = true
```

## symbol

符号类型

```TypeScript
const sy:symbol = Symbol()
```

## null

空值类型，表示该类型的值是一个空值，并且值为 **null**

```TypeScript
const n:null = null
```

## undefined

未定义类型，表示变量已经声明过，但变量的值还没有定义，如果类型为 **undefined**，那么值也就为 **undefined**

```TypeScript
const u:undefined = undefined
```

## object

对象类型，包含了 **普通对象**、**数组**、**函数**、**Map**、**Set** 等

```TypeScript
const obj1:object = {}
const obj2:object = []
const obj3:object = () => {}
const obj4:object = new Set()
const obj5:object = new Map()
```

## any

任意类型，表示没有类型限制或约束，可以为该类型的变量赋值任意类型的值

```TypeScript
let userName:any = "CoderMonkey"
let userAge:any = 99

userName = 222
userName = undefined
userAge = null
userAge = "99"
```

当设置为 **any** 类型时，可以说已经失去了对该变量值类型的检查，只要编写的代码语句没有明显的语法错误，那就会被视为正确的逻辑；此时的 **TypeScript** 俨然已经变成了 **AnyScript**，也就可以间接等于你是在编写 **JavaScript**。

除此之外，**any** 类型还有一个很严重的问题，就是 **类型污染**，即类型为 **any** 的变量值可以赋值给其他任意类型的变量，如：

```TypeScript
let userName:any = 'CoderMonkey'
let userAge: number = 18

userAge = userName

console.log(userAge.toFixed(2))
```

由于 **any** 类型的值可以赋值给任意类型的变量，因此上面这段代码在 **TypeScript** 的环境中是不会报错的，这就对 **userAge** 的类型造成了 **污染**，当你尝试运行这段代码就会发现如下错误：

![ts-any-error](../../assets/typescript/ts-any-error.png)

因此，非必要条件下，应当尽量避免使用 **any** 类型。

<!-- 需要注意的是，在 **TypeScript** 中，你可以将任意类型的值赋值给设置为 **any** 类型的变量，反过来却不行，因此可以理解为 **any** 类型包含了所有其他一切可能的类型，也就可以简单的理解为 **any** 类型是所有类型的 **父类型**，其他类型都是 **any** 类型的 **子类型**，**子类型** 的值可以赋值给 **父类型** 约束的变量，反之就不行。

因此，**any** 类型在 **TypeScript** 中也被称之为 **顶层类型（Top Type）**。 -->

## unknown

未知类型，可以理解为 **严格版的 any**，其主要作用就是为了解决 **any** 会产生的 **类型污染** 问题。

与 **any** 类型 **相同** 的是，可以将任意类型的值赋值给设置为 **unknown** 类型的变量

```TypeScript
let userName:unknown = "CoderMonkey"
let userAge:unknown = 99

userName = 222
userName = undefined
userAge = null
userAge = "99"
```

与 **any** 类型 **不同** 的是，不可以将类型为 **unknown** 类型的值赋值给其他类型的变量。

![ts-unknown-error](../../assets/typescript/ts-unknown-error.png)

其次，设置为 **unknown** 类型的值 **不提供任何可用的属性和方法** ，即使该值本身或原型上已经存在。

![ts-unknown-error-1](../../assets/typescript/ts-unknown-error-1.png)

再者，**unknown** 类型只能进行比较运算，如：==、===、!=、!==、||、&&、?、! 等等。

![ts-unknown-error-2](../../assets/typescript/ts-unknown-error-2.png)

在上面的例子中，如果对 **unknown** 类型的值进行比较运算，那么一切正常；倘若直接使用字符串的属性，编译就会报错。

这种情况下，可以使用 **typeof 操作符** 来对变量的类型进行 **缩小**，当明确该值的类型为 **string** 时，再去调用 **stirng** 本身的属性和方法那就不会有任何问题了，这一招（“类型缩小”）非常好使。

## nerver

## 值类型

## 联合类型

## 交叉类型

## 类型推断

## 类型兼容

## typeof

## type
