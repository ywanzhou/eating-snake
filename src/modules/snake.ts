class Snake {
  // 表示蛇儿头
  head: HTMLElement;

  // 表示蛇的身体(包括蛇头)
  bodies: HTMLCollection;

  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("snake")!;
    this.head = document.querySelector("#snake > div") as HTMLElement;
    this.bodies = this.element.getElementsByTagName("div");
  }

  // 获取蛇的坐标（蛇头坐标）
  get X() {
    return this.head.offsetLeft;
  }
  get Y() {
    return this.head.offsetTop;
  }

  // 设置蛇头的坐标
  set X(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.X === value) {
      return;
    }
    // 判断蛇有没有在规定的范围内移动
    if (value < 0 || value > 290) {
      throw Error("你的小蛇撞墙了~");
    }

    // 修改x时，是在修改水平坐标，蛇在左右移动，蛇在向左移动时，不能向右掉头，反之亦然
    /*  
            this.bodies[1]  表示先检查有没有第二节身体
            (this.bodies[1] as HTMLElement).offsetLeft === value 表示第二节身体的X值与蛇头的X值相同
        */
    if (
      this.bodies[1] &&
      (this.bodies[1] as HTMLElement).offsetLeft === value
    ) {
      if (value > this.X) {
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }
    // 移动身体
    this.moveBody();
    this.head.style.left = value + "px";

    // 检查有没有撞到自己
    this.checkHeadBody();
  }

  set Y(value: number) {
    // 如果新值和旧值相同，则直接返回不再修改
    if (this.Y === value) {
      return;
    }
    // 判断蛇有没有在规定的范围内移动

    if (value < 0 || value > 290) {
      throw Error("你的小蛇撞墙了~");
    }

    // 修改Y时，是在修改垂直坐标，蛇在左右移动，蛇在向上移动时，不能向下掉头，反之亦然
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      if (value > this.Y) {
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }

    // 移动身体
    this.moveBody();
    this.head.style.top = value + "px";
    // 检查有没有撞到自己
    this.checkHeadBody();
  }

  // 蛇增加身体的方法
  addBody() {
    // 向element 中添加一个div
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }

  // 添加一个蛇身体移动的方法
  moveBody() {
    /* 
      将后一节的位置设置为前一节的位置，比如第二节的位置设置为蛇头的位置

      因为要先获取前一个节的位置所有需要从后往前遍历 i>0
    */

    for (let i = this.bodies.length - 1; i > 0; i--) {
      // 获取前边身体的位置   类型“Element”上不存在属性“offsetLeft”需要来一个类型断言
      let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;

      // 将值设置到当前身体上
      (this.bodies[i] as HTMLElement).style.left = X + "px";
      (this.bodies[i] as HTMLElement).style.top = Y + "px";
    }
  }

  // 检查蛇头是否撞到身体的方法
  checkHeadBody() {
    // 获取所有的身体，检查其是否和蛇头的坐标发生重叠
    /* 
      let i = 1; i < this.bodies.length; i++ 
      从1 开始不包含蛇头0 
    */
    for (let i = 1; i < this.bodies.length; i++) {
      let bd = this.bodies[i] as HTMLElement;
      if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
        // 进入判断说明蛇头撞到了身体，游戏结束
        throw new Error("不要自己撞自己哦~");
      }
    }
  }
}

export default Snake;
