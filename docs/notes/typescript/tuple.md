# 元组

在 **TypeScript** 中，元组（**tuple**）是一种新的数据类型，值的写法和数组类似，只不过在使用类型约束时会略有区别，需要明确指定元组中每个元素的具体类型。

## 声明

```TypeScript
const tuple: [string, number] = ["CoderMonkey", 18]
```

元组类型通过 **[ ]** 声明，**[ ]** 内需要明确指定每个元素的具体类型，上述代码表示 **tuple** 是一个元组类型并且具有两个元素，第一个元素类型为 **string**，第二个元素类型为 **number**。

## 可选的元素

在元组元素的后面添加 **?** 用来表示该 **元素可选**，如：

```TypeScript
let tuple: [string, number?]

// 元组 tuple 的第二个元素类型为 number 并且它不是必须的
tuple = ["CoderMonkey"]
tuple = ["CoderMonkey", 18]
```

**可选元素** 必须位于 **必选元素** 之后，如：

```TypeScript
let tuple: [string, number?]

tuple = ["CoderMonkey"]
tuple = ["CoderMonkey", 18]
```

```TypeScript
let tuple: [string?, number?]

tuple = []
tuple = ["CoderMonkey"]
tuple = ["CoderMonkey", 18]
```

下面这段代码是 **错误** 的：

```TypeScript
let tuple: [string?, number]  // A required element cannot follow an optional element. // [!code error]
```

## 类型推断

元组类型需要在声明时明确类型约束，否则会被自动推断为 **数组类型**，如：

```TypeScript
let tuple = []  // 推断为 let tuple: any[]
```

```TypeScript
let tuple = [number]  // 推断为 let tuple: number[]
```

如果已经确切的声明了元组类型，那么 **越界访问不存在的元素** 时会报错，如：

```TypeScript
let tuple:[string, number] = ["CoderMonkey", 18]

tuple[1] = 20
tuple[2]  // Tuple type '[string, number]' of length '2' has no element at index '2'. // [!code error]
```

和数组一样，通过 **下标** 访问元组中的元素，由于只有两个元素，从 **0** 开始，到 **1** 结束，访问下标为 **2** 的元素就会越界，因此代码在编译时就会报错；这一点区别于数组，因为越界访问 **数组** 中的元素最终会返回 **undefined**。

## 只读元组

通过 **readonly** 关键字表明该元组 **只读**，对 **只读元组** 的增、删、改 都会报错，如：

```TypeScript
let tuple: readonly [string, number] = ["CoderMonkey", 18]

tuple[0] = "Coder Monkey"  // Cannot assign to '0' because it is a read-only property. // [!code error]
tuple[1] = 20              // Cannot assign to '1' because it is a read-only property. // [!code error]
```

准确的说，通过 **let** 声明的 **只读元组** 只是 **元组内的元素只读**，但实际上，我可以将一个新的元组赋值给它，如：

```TypeScript
let tuple: readonly [string, number] = ["CoderMonkey", 18]

tuple = ["Coder Monkey", 19]
```

被重新赋值后的 **tuple** 里面的元素仍保持 **只读的特性**，如果明确 **tuple** 不会被更改，可以优先使用 **const** 关键字。

## 只读元组的泛型表示

```TypeScript
const tuple: Readonly<[string, number]> = ["CoderMonkey", 18]
```

**Array** 一节提到过 **`Readonly<T>`** 是泛型中的只读表示，**T** 可以是任意类型，可以是 **string**，可以是 **number**，这里传入了 **[string, number]** 就表示它是一个只读元组。

## 扩展运算符在元组中的运用

在元组中，如果不是很确切的知道元素的具体数量，可以结合数组利用 **扩展运算符（...）** 进行处理。

```TypeScript
const tuple1: [...string[], number] = ["CoderMonkey", "CoderMonkey", 18]
const tuple2: [string, ...number[]] = ["CoderMonkey", 18, 19, 20]
const tuple3: [string, ...boolean[], number] = ["CoderMonkey", true, false, 20]
```

在上面的例子中，只要确保元组中必选元素出现在该出现的位置上，而使用扩展运算符表示的部分满足其类型约束后出现零次或者多次即可。
