import { BoxGeometry, Camera, CircleGeometry, CylinderGeometry, DirectionalLight, Group, MathUtils, Mesh, MeshStandardMaterial, TextureLoader, type Scene } from "three"
import type { ObjectInfo } from "@/modules/emojigame/types/types"
import { EmojiManager } from "./EmojiManager"
import { GameUtils } from "./GameUtils"

// 순수하게 씬에 존재할 모든 오브젝트를 관리함
// 가능한 오브젝트 타입 : Mesh, Object3D, Group
export class SceneManager{

    _scene : Scene
    camera! : Camera

    obj_agent!: Mesh
    obj_land!: Mesh
    obj_finishline!: Mesh
    obj_finishland!: Mesh
    group_finish!:Group


    list_scene_objs : Mesh[] = []
    list_obj_emojiface : Mesh[] = []
    list_obj_wall : Mesh[] = []
    list_obj_group_wall : Group[] = []
    list_obj_wallinfo : ObjectInfo[] = []

    wallCount :number = 2

    constructor(scene:Scene, wallCount :number){
        this._scene = scene
        wallCount = wallCount
        this.initializeObject();
    }

    initializeObject(){
            const tex_emoji = new TextureLoader().load('/textures/tex_emoji.png', ()=>{
                console.log("texture ready!")
            })
            const tex_wood = new TextureLoader().load('/textures/tex_wood.jpg')
            const tex_road = new TextureLoader().load('/textures/tex_road.png')
            const tex_normal_road = new TextureLoader().load('/textures/tex_normal_road.png')
            const tex_finishline = new TextureLoader().load('/textures/tex_finishline.jpg')
            const tex_wall = new TextureLoader().load('/textures/tex_wall.png')
            const tex_normal_wall = new TextureLoader().load('/textures/tex_normal_wall.png')

            const geo_land = new BoxGeometry(6, 0.1, 40);
            const geo_agent = new CylinderGeometry(1.5, 1.5, 1, 32)
            const geo_wall = new BoxGeometry(6, 10, 2);
            const geo_emojiFace = new CircleGeometry(1,32);
            const geo_finishline = new BoxGeometry(10, 0.1, 2);
            const geo_finishland = new BoxGeometry(10, 0.2, 20);

            const mat_wall = new MeshStandardMaterial({ 
                map:tex_wall,
                normalMap:tex_normal_wall,
                roughness : 1.0 
            })
            const mat_agent  =new MeshStandardMaterial({
                map:tex_emoji
            })
            const mat_emoji = new MeshStandardMaterial({
                map: EmojiManager.list_tex_emoji[0],
                transparent: true,
            })
            const mat_wood = new MeshStandardMaterial({
                map : tex_wood
            })
            const mat_finishline = new MeshStandardMaterial({
                map : tex_finishline
            })

            const mat_road = new MeshStandardMaterial({
                map : tex_road,
                normalMap : tex_normal_road,
            })


            
            this.obj_agent = new Mesh(geo_agent, mat_agent);
            console.log("obj agent makeing!");

            let poss = this.obj_agent.position.clone()
            poss.y = 10
            this.obj_agent.lookAt(poss)
          //  this.obj_agent.rotateY(1.55)
            this.obj_land =  new Mesh(geo_land, mat_road);

            this.list_obj_wall.push(new Mesh(geo_wall, mat_wall));
            this.list_obj_emojiface.push(new Mesh(geo_emojiFace, mat_emoji));
            
            for(let i=1; i<this.wallCount; ++i){
                this.list_obj_wall.push(this.list_obj_wall[0].clone())
                this.list_obj_emojiface.push(this.list_obj_emojiface[0].clone())
                this.list_obj_emojiface[i].material = mat_emoji.clone();
            }

            for(let i=0; i<this.wallCount; ++i){
                const group_wall = new Group();
                group_wall.add(this.list_obj_wall[i])
                group_wall.add(this.list_obj_emojiface[i])
                this.list_obj_group_wall.push(group_wall)
            }
            


            this.obj_finishline = new Mesh(geo_finishline, mat_finishline);
            this.obj_finishland = new Mesh(geo_finishland, mat_wood);

            this.group_finish = new Group();
            this.group_finish.add(this.obj_finishland);
            this.group_finish.add(this.obj_finishline);



            for(let i=0; i<this.wallCount; ++i){

                this.list_obj_wallinfo.push({
                object:this.list_obj_wall[i],
                velocity: GameUtils.forward,
                size: this.list_obj_wall[i].scale,
                scale: this.list_obj_wall[i].scale,
                isActive:true
             })
            }
            //scene add
           this.initializeSceneAdd();
           this.initializeSceneObjectPosition();
           this.initializeLight();

    }


    initializeSceneObjectPosition(){
        this.obj_agent.position.z = 5
        this.obj_agent.rotation.y = MathUtils.degToRad(90)
        this.obj_land.position.y = -5

        let zposition = 0;
        for(let i=0; i<this.wallCount; ++i){
            this.list_obj_wall[i].position.z = zposition;
            zposition -=10;
        }

        for(let i=0; i<this.wallCount; ++i){
            this.list_obj_emojiface[i].position.y = 4
            this.list_obj_emojiface[i].position.z = this.list_obj_wall[i].position.z + 2;
        
        }

        this.group_finish.position.y = 100
        this.group_finish.position.z  = 100
    }

    initializeSceneAdd(){
        //scene add
        this._scene.add(this.obj_agent)
        this._scene.add(this.obj_land)
        this._scene.add(this.group_finish)

        for(let i=0; i<this.wallCount; ++i){
                this._scene.add(this.list_obj_group_wall[i])
        }
    }


    initializeLight(){
        const dlight = new DirectionalLight(0xffffff, 4)
        dlight.position.set(0,10,10)
        this._scene.add(dlight);
    }


}