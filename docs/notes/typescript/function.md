# 函数

## 声明

普通函数声明：无参数无返回值

```TypeScript
function sayHello() {}
```

普通函数声明：有参数有返回值

```TypeScript
function sayHello(name) {
    return `${name} say: Hello`
}
```

箭头函数声明：无参数无返回值

```TypeScript
const sayHello = () => {}
```

箭头函数声明：有参数有返回值

```TypeScript
const sayHello = (name) => {
    return `${name} say: Hello`
}
```

不管是在 **TypeScript** 还是在 **JavaScript** 中，都可以按照以上方式进行函数声明；不同的是，在 **TypeScript** 中你可以为 **函数**、**函数的参数**、**函数的返回值** 来添加类型约束。

## 类型

以 **sayHello** 函数为例，默认情况下，接受 _name_ 参数且类型为 **string**，最终返回一个 **字符串**。

**方式** :one:：**参数类型** 具体跟在每一个参数的后面，**返回值类型** 添加在 **)** 之后

```TypeScript
function sayHello(name: string): string {
    return `${name} say: Hello`
}
```

```TypeScript
const sayHello = (name: string): string => {
    return `${name} say: Hello`
}
```

**方式** :two:：使用变量声明函数时，可以添加一个箭头函数形式的类型约束跟在变量后面，这样就不用单独为参数和返回值添加类型约束了。

```TypeScript
const sayHello: (name: string) => string = (name) => {
    return `${name} say: Hello`
}
```

初次接触 **TypeScript** 可能不是很好理解这种声明方式，因此，可以对步骤进行拆解：

**step -** :one:：编写一个 **sayHello** 函数，确定接收的参数和返回值

```TypeScript
const sayHello = (name) => {
    return `${name} say: Hello`
}
```

**step -** :two:：编写一个箭头函数形式的类型约束，对参数和返回值进行约束

```TypeScript
() => {}
```

以上就是一个箭头函数形式的类型约束，在 **=>** 左侧的 **()** 中定义参数及其类型，在 **=>** 右侧定义返回值及其类型。

```TypeScript
(name: string) => string
```

**step -** :three:：将该类型约束添加到变量 **sayHello** 后面

```TypeScript
const sayHello: (name: string) => string = (name) => {
    return `${name} say: Hello`
}
```

**step -** :four:：如果觉得这种方式过于繁琐，可以利用 **type** 进行抽取

```TypeScript
type MyFun = (name: string) => string

const sayHello: MyFun = (name) => {
    return `${name} say: Hello`
}
```

**step -** :five:：利用箭头函数本身的特点对 **sayHello** 的返回值进行优化

```TypeScript
type MyFun = (name: string) => string

const sayHello: MyFun = (name) => `${name} say: Hello`
```

## 类型推断

如果没有给返回值添加类型约束，其类型会被推断为 **void**，表示该函数没有返回值或默认返回 **undefined**

```TypeScript
const fun = () => {}  // 推断为 const fun: () => void
```

根据返回值类型推断为不同的返回值类型。

```TypeScript
const sayName = () => "CoderMonkey"  // 推断为 const fun: () => string
const sayAge = () => 18              // 推断为 const fun: () => number
```

被 **void** 约束过的函数除了 **undefined** 之外不能再 **return** 一个其他类型的值

```TypeScript
const sayUndefined = (): void => undefined
const sayName = (): void => "CoderMonkey"  // Type 'string' is not assignable to type 'void'. // [!code error]
```

给返回值添加类型约束不是必须的，但为了保证应用程序的健壮性，通常都会严格添加返回值类型，以便可以在开发时提前发现错误；如果某个函数已被明确无需 **return** 一个结果或默认返回 **undefined** ，那么使用 **void** 即可。

## 参数

```TypeScript
const sayUserInfo = (name:string, age: number): string => `My name is ${name}, i'm ${age} years old!`
```

**参数限制**

默认情况下，调用 **sayUserInfo** 时 **name** 和 **age** 必须传入，少传、多传、类型不对均会报错

```TypeScript
sayUserInfo("CoderMonkey", 18)
sayUserInfo("CoderMonkey")                     // Expected 2 arguments, but got 1. // [!code error]
sayUserInfo("CoderMonkey", 18, "CoderMonkey")  // Expected 2 arguments, but got 3. // [!code error]
sayUserInfo("CoderMonkey", "CoderMonkey")      // Argument of type 'string' is not assignable to parameter of type 'number'. // [!code error]
sayUserInfo(18, 18)                            // Argument of type 'number' is not assignable to parameter of type 'string'. // [!code error]
```

**可选参数**

可以在参数后面添加 **?** 表示参数选填，选填参数要放必填参数后面

```TypeScript
const sayUserInfo = (name:string, age?: number): string => `My name is ${name}, i'm ${age} years old!`
```

也可以在参数后面添加默认值，表示该参数是可选的

```TypeScript
const sayUserInfo = (name:string, age: number = 20): string => `My name is ${name}, i'm ${age} years old!`
```

遇到可选参数时，以上方案二者选其一即可。

**只读参数**

参数类型为 **数组** 或者 **元组** 时可用

```TypeScript
const arr: number[] = [1, 2, 3, 4]
const tuple: [string, string ] = ["1", "2"]

const changeArray = (arr: readonly number[]) => {
    arr[0] = 0  // Index signature in type 'readonly number[]' only permits reading. // [!code error]
}

const changeTuple = (tuple: readonly [string, string]) => {
    tuple[0] = "0"  // Cannot assign to '0' because it is a read-only property. // [!code error]
}
```

**参数解构**

```TypeScript
type UserInfo = {
    name: string,
    age: number
}

const userInfo = {
    name: "CoderMonkey",
    age: 18
}
```

_对象形式_

```TypeScript
const logUserInfo = (userInfo: UserInfo) => console.log(userInfo)
```

_解构形式_

```TypeScript
const logUserInfo = ({ name, age }: UserInfo) => console.log({ name, age })
```

**rest 参数**

```TypeScript
const nums: number[] = [1, 2, 3, 4]

const sum = (num1: number, num2: number, ...rest: number[]) => num1 + num2 + rest.reduce((pre, current) => pre + current, 0)

console.log(sum(1, 2))
console.log(sum(1, 2, 3))
console.log(sum(1, 2, 3, 4))
console.log(sum(1, 2, 3, 4, ...nums))
```

## 高阶函数

如果一个函数的内部返回了一个新的函数，就可以称该函数是一个高阶函数（**Higher-Order Function**，简称 **HOC**）。

```TypeScript
const sum: (num1: number, num2: number) => (num3: number, num4: number) => number = (num1, num2) => (num3, num4) => num1 + num2 + num3 + num4
```

如果基础相对薄弱，可能不太容易看出 **sum** 函数是一个 **HOC**，特别是又加上了类型约束的情况下，和上面一样，可以分步进行拆解：

**step -** :one:：去掉类型定义，其实就是一个箭头函数的简写形式

```TypeScript
const sum = (num1, num2) => (num3, num4) => num1 + num2 + num3 + num4
```

**step -** :two:：将简写形式逐步还原成普通的箭头函数，此时参数会被自动推断为 **any** ，为了避免编译报错，手动添加为 **number** 即可

```TypeScript
// const sum = (num1, num2) => {
//     return (num3, num4) => {
//         return num1 + num2 + num3 + num4
//     }
// }

const sum = (num1:number, num2:number) => {
    return (num3:number, num4:number) => {
        return num1 + num2 + num3 + num4
    }
}
```

这样就很清楚了，**sum** 内部返回了一个新的箭头函数，并在新函数中进行 **num** 的相关计算，最终返回值的类型为 **number**。

```TypeScript
(num1: number, num2: number) => (num3: number, num4: number) => number
```

## 函数重载

相比于 **Javascript**，函数重载（**Function Reload**）是 **TypeScript** 的独有特性。

在 **TypeScript** 中，函数可以根据接收的参数个数或参数类型的不同来实现不同的函数行为，执行不同的业务逻辑，这种方式就称为 **函数重载**。

假设现有一个需求，需要声明一个 **calculate** 方法，该方法接收两个参数：

如果参数类型为 **number**，返回两数之和；

如果参数类型为 **string**，返回拼接后的字符串；

如果不是以上两种情况，则抛出一个错误

```TypeScript
calculate(100, 100)           // 200
calculate("Coder", "Monkey")  // CoderMonkey
```

按照目前掌握的知识点，可能第一时间会想到使用 **联合类型** 进行实现。

```TypeScript
const calculate = (param1: number | string, param2: number | string): number | string | never  => {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }
    throw new Error('Error')
}
```

使用 **联合类型** 已经将需求进行了完整的实现，但现在还有个问题：对于调用者而言，他无法明确的知道传递什么的参数会返回什么样的结果，只能根据当前函数类型去一步步尝试，这样的开发效率必将是十分低下的。

因此，我们可以在上述完整类型声明的基础上对不同情况下的类型声明进行提取，如下所示：

<!-- 在上面的例子中，使用 **联合类型**，只需要对参数类型加以约束，并在函数中根据类型的不同去执行不同的逻辑即可达到目的，那为什么还需要 **函数重载** 呢？

试想一下：倘若参数的个数逐渐增多，参数的类型更加复杂，所有的参数都写在一个类型里面，对于调用者而言，如果不翻看远吗，是无法明确知道该函数具体有哪些调用方式的，因此，面对更加复杂的场景，最好可以做到根据 **不同的参数类型** 逐一进行声明。 -->

由于 **函数重载** 只支持通过 **普通函数** 声明的方式来定义，因此，先对上述案例进行改造

```TypeScript
function formatter(param1:string | number, param2:string | number): string | number | never {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }
    throw new Error("Error")
}
```

接着对不同情况下的类型声明进行抽取，分别定义

```TypeScript{1,2}
function formatter(param1:string, param2:string): string
function formatter(param1:number, param2:number): number
function formatter(param1:string | number, param2:string | number): string | number | never {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }
    throw new Error("Error")
}
```

这种根据不同类型分别进行类型声明的方式就是 **函数重载**，在上面的例子中，它包含了 **string** 以及 **number** 类型的声明，最最最关键的是他们具有**相同的函数名**，和一个完整的 **类型声明** 用来进行逻辑处理，这一点万万不可缺失。

**注意事项**

**函数重载** 声明的类型要和 **完整函数实现** 声明的类型保持一致，不能发生冲突。

```TypeScript
function formatter(param1:string, param2:string): string
function formatter(param1:number, param2:number): number
function formatter(param1:boolean, param2:boolean): number  // This overload signature is not compatible with its implementation signature. // [!code error]
function formatter(param1:string | number, param2:string | number): string | number | never {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }

    throw new Error("Error")
}
```

解决方式：移除多余的 **函数重载** 声明或者在 **完整函数声明** 中进行实现

**函数重载** 声明的类型一般遵循 **从窄到宽** 的原则，类型越宽的声明越靠近 **完整函数实现**，否则会出现意外的匹配导致错误的执行结果。

```TypeScript{1}
function formatter(param1:any, param2:any): string
function formatter(param1:string, param2:string): string
function formatter(param1:number, param2:number): number
function formatter(param1:string | number, param2:string | number): string | number | never {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }

    throw new Error("Error")
}

const f:number = formatter(1, 1)  // Type 'string' is not assignable to type 'number'. // [!code error]
```

执行 **formatter** 函数会直接匹配 **函数重载** 的第一行，导致返回的 **string** 类型和 **f** 约束的 **number** 类型不一致而导致报错

解决方式：将 **函数重载** 声明类型范围最宽的放在最靠近 **完整函数声明** 的地方

```TypeScript{1}
function formatter(param1:string, param2:string): string
function formatter(param1:number, param2:number): number
function formatter(param1:any, param2:any): string
function formatter(param1:string | number, param2:string | number): string | number | never {
    if (typeof param1 === "number" && typeof param2 === "number") {
        return param1 + param2
    }
    if (typeof param1 === "string" && typeof param2 === "string") {
        return param1 + param2
    }

    throw new Error("Error")
}

const f:number = formatter(1, 1)
```
