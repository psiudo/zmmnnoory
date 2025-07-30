import { Clock, Mesh, MeshStandardMaterial, Texture, Vector3 } from 'three'
import type { Type_FormatTime } from '@/modules/emojigame/types/types';

export class GameUtils{

    private static clock : Clock =  new Clock();
    static forward : Vector3 = new Vector3(0,0,1);
    static back : Vector3 = new Vector3(0,0,-1);
    static right : Vector3 = new Vector3(1,0,0);
    static left : Vector3 

    static timeDirtyChcek : boolean =  true;
    private static _deltaTime : number = 0


    public static get deltaTime():number{
        if(this.timeDirtyChcek) {
            this.timeDirtyChcek =  false;
            return this._deltaTime = this.clock.getDelta();
        }
        return this._deltaTime
    }

    static changeTexture(obj : Mesh, tex : Texture){
        //console.log("change! tex! " + obj.name)
        const material  = obj.material as MeshStandardMaterial
        material.map = tex;
        material.needsUpdate = true;
    }

    static remainTime(limitTime : number):number{
        return limitTime - this.clock.elapsedTime;
    }



    static updateTime(limitTime : number) : Type_FormatTime{
        const elapsed = this.remainTime(limitTime);

        const minutes = Math.floor(elapsed / 60)
        const seconds = Math.floor(elapsed % 60)

        return {
            hour : 0,
            minute : minutes,
            second : seconds
        }
    }




}
 