import { _decorator, Component, instantiate, math, Node, Prefab, resources, Sprite, SpriteFrame, v2 } from "cc";
const { ccclass, property } = _decorator;

@ccclass("main")
export class main extends Component {
    count: number = 0;
    start() {
        this.schedule(() => {
            resources.load<Prefab>("Prefab/Actor", (err, prefab) => {
                resources.load<SpriteFrame>("Image/role/fyn8f/spriteFrame", (err, spriteFrame) => {
                    this.node.removeChild(this.node.getChildByPath("Actor"));
                    let node = instantiate(prefab);
                    this.node.addChild(node);
                    let actor = this.node.getChildByPath("Actor/Body");
                    this.count = this.count > 6 ? 0 : this.count;
                    if (actor) {
                        let row = Math.floor(this.count / 7);
                        let col = this.count % 7;
                        spriteFrame.reset({
                            originalSize: math.size(544, 800),
                            rect: math.rect(col * 67.5, row * 99.5, 67.5, 99.5),
                            offset: v2(col * 67.5, row * 99.5),
                            isRotate: false,
                            texture: spriteFrame.texture,
                        });
                        actor.getComponent(Sprite).spriteFrame = spriteFrame;
                        this.count++;
                    }
                });
            });
        }, 0.07);
    }
}
