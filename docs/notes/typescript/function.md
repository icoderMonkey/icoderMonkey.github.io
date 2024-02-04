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

**方式** :two:：使用变量声明函数时，可以添加一个完整的函数类型约束（箭头函数形式）跟在变量后面

```TypeScript
const sayHello: (name: string) => string = (name) => {
    return `${name} say: Hello`
}
```

这样就不用单独为参数和返回值进行类型约束了。

初次接触 **TypeScript** 可能不是很好理解这种声明方式，可以对步骤进行拆解：

**step -** :one:：编写一个 **sayHello** 函数，确定接收的参数和需要返回的数据

```TypeScript
const sayHello = (name) => {
    return `${name} say: Hello`
}
```

**step -** :two:：编写一个完整的函数类型，对参数和返回值进行约束

```TypeScript
() => {}
```

这就是一个完整的函数类型约束，看起来就像一个箭头函数，在 **=>** 左侧的 **()** 中定义参数类型，在 **=>** 右侧定义返回值。

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

如果没有给函数返回值添加类型约束，其返回值类型会被推断为 **void**，表示该函数没有返回值或默认返回 **undefined**

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

给返回值添加类型约束不是必须的，但为了保证应用程序的健壮性，通常我们都会严格添加返回值类型，以便可以在开发时提前发现错误；如果某个函数已被明确无需 **return** 一个结果或默认返回 **undefined** ，那么使用 **void** 即可。

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

遇到选项参数时，以上方案二者选其一即可。

**只读参数**

参数类型为 **数组** 或者 **元组** 时可用

```TypeScript
const arr: number[] = [1, 2, 3, 4]
const tuple: [string, string ] = ['1', '2']

const changeArray = (arr: readonly number[]) => {
    arr[0] = 0  // Index signature in type 'readonly number[]' only permits reading. // [!code error]
}

const changeTuple = (tuple: readonly [string, string]) => {
    tuple[0] = '0'  // Cannot assign to '0' because it is a read-only property. // [!code error]
}
```

**参数解构**

```TypeScript
type UserInfo = {
    name: string,
    age: number
}
```

对象形式

```TypeScript
const logUserInfo = (userInfo: UserInfo) => console.log(userInfo)
```

参数解构

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

本质上，如果一个函数的内部返回了一个新的函数，就可以称该函数是一个高阶函数（**Higher-Order Function**，简称 **HOC**）。

```TypeScript
const sum: (num1: number, num2: number) => (num3: number, num4: number) => number = (num1, num2) => (num3, num4) => num1 + num2 + num3 + num4
```

如果基础相对薄弱，可能不太容易一眼看出 **sum** 函数是一个 **HOC**，特别是又加上了类型约束的情况下。

**step -** :one:：去掉类型定义，其实就是一个箭头函数的简写形式

```TypeScript
const sum = (num1, num2) => (num3, num4) => num1 + num2 + num3 + num4
```

**step -** :two:：将简写形式逐步还原成普通的箭头函数，但参数会被推断为 **any** 类型，这一点可以手动添加为 **number**

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

这样一下就明了了，**sum** 内部返回了一个新的箭头函数，并在新函数中进行 **num** 的相关计算，最终返回值类型为 **number** 的和。

```TypeScript
(num1: number, num2: number) => (num3: number, num4: number) => number
```

## 函数重载

函数重载（**Function Reload**）是 **TypeScript** 的独有特性，这一点要在 **JavaScript** 中是无法使用的。

在 **TypeScript** 中，可以根据函数接收的参数个数或参数类型的不同来实现不同的函数行为，执行不同的逻辑，这种方式就称为 **函数重载**。
