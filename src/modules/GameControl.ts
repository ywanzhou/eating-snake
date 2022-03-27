import ScorePanel from "./ScorePanel"
import Snake from "./snake"
import Food from "./Food"

// 游戏控制器，控制其他的所有类
class GameControl {
  // 定义三个属性
  snake: Snake
  food: Food
  // 记分牌
  scorePanel: ScorePanel
  // 创建一个属性用来存储蛇的移动方向（就是键盘的方向键）
  direction: string = ""
  // 创建一个属性用来记录游戏是否结束
  isLive = true

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(10, 1)

    // 游戏初始化
    this.init()
  }
  // 初始化游戏的方法，调用后游戏开始
  init() {
    document.addEventListener("keydown", this.keydownHandler.bind(this))
    this.run()
  }
  // 创建一个键盘按下的响应函数
  keydownHandler(event: KeyboardEvent) {
    // 当用户按下键盘的键之后，需要判断用户按下的键是否符合目标的键

    //  当用户按下键盘时存储键
    this.direction = event.key
  }

  // 定义一个蛇移动起来的方法
  run() {
    // 获取蛇的坐标
    let X = this.snake.X
    let Y = this.snake.Y

    // 根据按键方向来修改蛇的坐标值
    switch (this.direction) {
      // 上移 top减少
      case "ArrowUp":
        Y -= 10
        break
      case "ArrowDown":
        Y += 10
        break
      case "ArrowLeft":
        X -= 10
        break
      case "ArrowRight":
        X += 10
        break
      default:
        break
    }

    // 检查蛇是否吃到了食物
    this.checkEat(X, Y)

    // 修改蛇的X和Y值
    try {
      this.snake.X = X
      this.snake.Y = Y
    } catch (e: any) {
      // 捕获异常弹出消息提示
      alert(e.message)
      // isLive改为false 表示游戏结束
      this.isLive = false
    }
    // 开启一个定时器run()一直执行
    this.isLive &&
      setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30)
  }

  // 定义一个方法，用来检查蛇是否吃到食物
  checkEat(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      // 食物位置刷新
      this.food.change()
      // 加一分
      this.scorePanel.addScore()
      // 蛇的身体增加一格
      this.snake.addBody()
    }
  }
}

export default GameControl
