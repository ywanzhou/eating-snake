class ScorePanel {
  // 分别记录分数和等级
  score = 0;
  level = 1;

  // 分数和等级所在的元素，在构造函数中进行初始化
  ScoreEle: HTMLElement;
  LevelEle: HTMLElement;
  // 设置一个变量限制等级
  maxLevel: number;
  upScore: number;

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.ScoreEle = document.getElementById("score")!;
    this.LevelEle = document.getElementById("level")!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  // 设置一个加分的方法
  addScore() {
    // 使分数自增
    this.ScoreEle.innerHTML = ++this.score + "";
    if (this.score % this.upScore === 0) {
      this.UpLevel();
    }
  }
  UpLevel() {
    // 使等级自增
    if (this.level < this.maxLevel) {
      this.LevelEle.innerHTML = ++this.level + "";
    }
  }
}

export default ScorePanel;
