app.component('task-list',{
    template:`
        <div class="task-container">
            <div class="task-header">
                <div style="width:75%">
                    <input class="task-input" type="text" v-model.trim="newtask" @keyup.enter="addtask" placeholder="Write Something">
                    <div style="margin-top:1em">
                        <select class="task-catagory" v-model="catagory">
                            <option value="" selected disabled hidden>catagory</option>
                            <option v-for="type in types">{{type.typename}}</option>
                        </select>
                        <input class="date-selector" placeholder="due date" v-model="duedate"></input>
                    </div>
                </div>
                <div class="task-add"  @click="addtask()">+</div>
            </div>
            
            <div class="task-item" v-for="(task,index) in tasklist" :key="task.index">
                <div class="task-name-group">
                    <input type="checkbox" :id="task.id" v-model="task.isdone">
                    <label :for="task.id" class="task-name" :class="{isdone:task.isdone}"><span></span>{{task.taskname}}</label>
                </div>
                <p class="task-date">{{task.duedate}}</p>
                <div class="remove_btn" @click="removetask(index)">X</div>
            </div>
        </div>
        <p style="color:#fff">{{tasklist}}</p>
    `,
    data(){
        return{
           idForTask:'',
           tasklist:[
               {'id':0,
                'taskname':'Create Todo App',
                'catagory':'',
                'duedate':'Today',
                'isdone':false},
           ],
           newtask:'',
           types:[{'typename':'business','color':'#524EEE'},{'typename':'personal','color':'#6FCF97'}]
        }
    },
    methods:{
        addtask(){
            if(this.newtask.trim().length===0){
                return
            }

            this.tasklist.unshift({'id':this.tasklist.length ,'taskname':this.newtask,'catagory':this.catagory,'duedate':this.duedate,'isdone':false})
            this.newtask=''
            this.duedate=''
        },
        removetask(index){
            this.tasklist.splice(index,1)
        }
    },
    computed:{

        }
})