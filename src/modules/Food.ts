
// 定义食物类 food
class Food {
    // 定义一个属性表示食物所对应的元素  名称element:类型是 HTMLElement
    element: HTMLElement;
    constructor() {
        // ! 表示document.getElementById('food')已经确定可以找到对应的元素不会为空
        this.element = document.getElementById('food')!;
    }

    // 定义一个获取食物X轴坐标的方法
    get X () {
        return this.element.offsetLeft
    }
    // 定义一个获取食物Y轴坐标的方法
    get Y () {
        return this.element.offsetTop
    }

    change () {
        // 生成一个随机的位置来表示食物  位置最小为0 最大为290  必须是10的倍数
        let top = Math.round(Math.random() * 29) * 10
        let left = Math.round(Math.random() * 29) * 10

        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'

    }

}

export default Food;