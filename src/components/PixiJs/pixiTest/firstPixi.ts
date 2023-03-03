import PIXI from 'pixi.js'

class FirstPixi {
    a: string;

    constructor() {
        this.a = '111';
    }

    draw() {
        let type = "WebGL"
        if (!PIXI.utils.isWebGLSupported()) {
            type = "canvas"
        }

        //创建一个 Pixi应用 需要的一些参数
        let option = {
            width: 640,
            height: 360,
        }
        //创建一个 Pixi应用
        let app = new PIXI.Application(option);
        //获取舞台
        let stage = app.stage;
        //获取渲染器
        let renderer = app.renderer;
        //把 Pixi 创建的 canvas 添加到页面上
        document.body.appendChild(renderer.view);
        //绳段数
        let numberOfSegments = 20;
        //图片宽度
        let imageWidth = 600;
        //一段长度
        let ropeLength = imageWidth / numberOfSegments;
        //保存 Point 对象的数组
        let points = [];
        for (let i = 0; i < numberOfSegments; i++) {
            points.push(new PIXI.Point(i * ropeLength, 0));
        }

        //创建 Rope 类型的对象
        let snake = new PIXI.mesh.Rope(PIXI.Texture.fromImage('https://www.kkkk1000.com/images/learnPixiJS-VisualEffects/snake.png'), points);
        snake.x = 0;
        //创建一个容器
        let snakeContainer = new PIXI.Container();
        //把创建的 Rope 类型的对象添加到容器中
        snakeContainer.addChild(snake);
        //把容器添加到舞台上
        stage.addChild(snakeContainer);
        //设置容器位置
        snakeContainer.position.set(10, 150);

        //创建一个图形对象
        let g = new PIXI.Graphics();
        g.x = snake.x;
        g.y = snake.y;
        //把图形对象添加到容器中
        snakeContainer.addChild(g);


        //实现动画
        let count = 0;
        app.ticker.add(function () {
            count += 0.1;
            //通过 for 循环将数组中的每个点按照椭圆形的轨迹移动，形成波浪效果。
            for (let i = 0; i < points.length; i++) {
                points[i].y = Math.sin((i * 0.5) + count) * 30;
                points[i].x = i * ropeLength + Math.cos((i * 0.3) + count) * numberOfSegments;

            }
            renderPoints();
        });

        function renderPoints() {
            g.clear();
            g.lineStyle(2, 0xffc2c2);
            g.moveTo(points[0].x, points[0].y);

            for (let i = 1; i < points.length; i++) {
                g.lineTo(points[i].x, points[i].y);
            }

            for (let i = 1; i < points.length; i++) {
                g.beginFill(0xff0022);
                g.drawCircle(points[i].x, points[i].y, 5);
                g.endFill();
            }
        }
    }

}

export default FirstPixi;


