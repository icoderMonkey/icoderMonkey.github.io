# 对象

## 声明

```TypeScript
const userInfo = {
    name: "CoderMonkey",
    age: 18
}
```

对象的声明十分简单，区别在于 **TypeScript** 中可以为对象及其属性添加类型约束

```TypeScript
const userInfo: {
    name: string,
    age: number
} = {
    name: "CoderMonkey",
    age: 18
}
```

通过字面量形式声明的 _userInfo_ 是一个对象，它包含两个必要属性，类型为 **string** 的 _name_ 以及类型为 **number** 的 _age_，必须严格按照规范声明属性。

## 注意事项

**缺少属性报错**

```TypeScript
const userInfo: {  // Property 'age' is missing in type '{ name: string; }' but required in type '{ name: string; age: number; }'. // [!code error]
    name: string,
    age: number
} = {
    name: "CoderMonkey",
}
```

**添加多余属性报错**

```TypeScript
const userInfo: {
    name: string,
    age: number
} = {
    name: "CoderMonkey",
    age: 18,
    height: 100  // Object literal may only specify known properties, and 'height' does not exist in type '{ name: string; age: number; }'. // [!code error]
}
```

**读取不存在属性报错**

```TypeScript
const userInfo: {
    name: string,
    age: number
} = {
    name: "CoderMonkey",
    age: 18,
}

console.log(userInfo.height)  // Property 'height' does not exist on type '{ name: string; age: number; }'. // [!code error]
```

**删除必须属性报错**

```TypeScript
const userInfo: {
    name: string,
    age: number
} = {
    name: "CoderMonkey",
    age: 18,
}

delete userInfo.name  // The operand of a 'delete' operator must be optional.  // [!code error]
```

## 可选属性

添加 **?** 表示属性可选

```TypeScript{3}
type UserInfo = {
    name: string,
    age?: number
}
```

等同于

```TypeScript
type UserInfo = {
    name: string,
    age?: number | undefined
}
```

鼠标悬浮在 _age_ 上可以看到，因此可以给 _age_ 传入 **undefined**。

## 只读属性

添加 **readonly** 表示属性只读

```TypeScript
type UserInfo = {
    name: string,
    readonly age: number
}

const userInfo:UserInfo  = {
    name: "CoderMonkey",
    age: 18
}

userInfo.age = 20  // Cannot assign to 'age' because it is a read-only property. // [!code error]
```

如果对象的属性也是一个对象，被 **readonly** 约束时修改该对象中的属性不会报错，只会在替换整个对象时报错。

**只读断言** 会为对象字面量中的所有属性添加 **readonly**

注意此时只是为 _userInfo_ 添加了 **as const** 断言，而没有添加任何自定义的类型约束。

```TypeScript
const userInfo = {
    name: "CoderMonkey",
    age: 18,
} as const
```

现在不仅为 _userInfo_ 添加 **as const** 断言，还添加了自定义类型约束 **UserInfo**，现在会以自定义类型约束为准。

```TypeScript
type UserInfo = {
    name: string,
    readonly age: number
}


const userInfo: UserInfo = {
    name: "CoderMonkey",
    age: 18,
} as const
```

## 索引类型

在对象中，可以利用 **索引类型** 批量添加满足条件的属性

```TypeScript
type UserInfo = {
    [key: string]: string
}
```

**[ ]** 内表示动态的索引名，_key_ 只是一个 **形参**，它的类型为 **string**，该 _key_ 对应值的类型为 **string**，所以，被 **UserInfo** 约束的对象，可以添加任意个 _key_ 和 _value_ 类型均为 **string** 的属性

```TypeScript
type UserInfo = {
    [key: string]: string
}

const userInfo: UserInfo = {
    name: "CoderMonkey",
    friendA: "friendA",
    friendB: "friendB",
}
```

在对象中，属性的类型可以是 **string**、**number** 和 **symbol** 其中的一种，也可以同时存在多种类型的动态索引，但需要注意的是，**数值类型**的索引 和 **字符串类型** 的索引同时出现时，**数值类型** 索引对应的 **值类型** 必须和 **string** 类型索引的 **值类型** 保持一致，否则在编译时会报错，究其原因，只是因为在 **JavaScript** 中，所有的 **数值属性名** 都会被自动转化为 **字符串属性名**。

```TypeScript
type UserInfo = {
    [key: string]: string,
    [key: number]: number  // 'number' index type 'number' is not assignable to 'string' index type 'string'.  // [!code error]
}
```

只需要将 `[key: number]` 对应的值类型 **number** 修改为 `[key: string]` 对应的值类型 **string** 即可

```TypeScript
type UserInfo = {
    [key: string]: string,
    [key: number]: string
}
```

## type

通过 **type** 定义属性

```TypeScript
type UserInfo = {
    name: string,
    age: number
}

const userInfo:UserInfo  = {
    name: "CoderMonkey",
    age: 18
}
```

通过 **type** 定义的对象类型，可以利用 `type["prop"]` 的方式读取属性的类型

```TypeScript{7,8}
type UserInfo = {
    name: string,
    age: number
}

type Name = UserInfo['name']  // type Name = string
type Age = UserInfo['age']    // type Age = number
```
