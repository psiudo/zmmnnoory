import type { GameData, ObjectInfo, State_Current } from "@/modules/emojigame/types/types";
import { BoxGeometry, Group, Mesh, Vector3 } from "three";
import type { SceneManager } from "./SceneManager";

//게임 규칙 관리
export class GameManager{

    _gameData:GameData

    //지면 오브젝트
    _land_obj : Mesh
    
    //각 벽이 가지고 있는 상태 (매핑 된 이모지 정보, 오브젝트 위치 정보 등)
    _list_States : State_Current[] = [];
    //현재 에이전트가 몇 번째 벽과 부딪혀서 비교 평가해야하는지?
    _wallidx = 0;

    /**  
        현재 게임 상태를 종합적으로 볼 수 있음
    */
    state_current! : State_Current

    gameOver : boolean  = false;
    timeOver : boolean = false;

    constructor(gameData:GameData, land_obj:Mesh, list_States:State_Current[]){
        this._gameData = gameData;
        this._land_obj = land_obj;
        this._list_States = list_States
        this.state_current = this._list_States[0];
    }


    //현재 맞춰야 할 이모지 상태를 갱신합니다.
    changeCurrentState(){
        const size = this._list_States.length;
        this.state_current = this._list_States[++this._wallidx % size];
    }

    //벽 오브젝트를 일정 간격 만큼 이동시킵니다. (게임 특성상 지면도 이동함)
    static offsetWall(wall : Group , land_obj : Mesh, offset:number){
        wall.position.z = wall.position.z - 20;
        land_obj.position.z -= offset/2
    }

    //오브젝트 info를 생성합니다.
    makeObjectInfo(obj : Mesh) : ObjectInfo{
        const geo_tempwall = obj.geometry as BoxGeometry
        const { width, height, depth }  = geo_tempwall.parameters
        const size_tempwall =  new Vector3(width, height, depth)

        return {
            object : obj,
            velocity : new Vector3(0,0,0),
            size : size_tempwall,
            scale : obj.scale.clone(),
            isActive : true,
        }
    }

    checkgameOver(sceneManager: SceneManager) :boolean{
        if(!this.state_current.current_info.isActive){
            sceneManager.group_finish.position.z = sceneManager.obj_land.position.z - 20
            sceneManager.group_finish.position.y = -4.5
            sceneManager.obj_finishline.position.z = sceneManager.obj_finishland.position.z + 5
            sceneManager.obj_finishline.position.y = sceneManager.obj_finishland.position.y + 0.125

        if(sceneManager.obj_agent.position.z < sceneManager.group_finish.position.z && !this.gameOver){
                    console.log("end the game")
                
                    // StopRecording();
                    this.gameOver = true    
                    //return;
                }
        }
        return this.gameOver
    }    
         
    



}