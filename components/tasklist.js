app.component('task-list',{
    template:`
        <div class="task-container">
            <div class="task-header">
                <div style="width:75%">
                    <input class="task-input" type="text" v-model.trim="newtask" @keyup.enter="addtask" placeholder="Write Something">
                    <div style="margin-top:1em">
                        <select class="task-category" v-model="category">
                            <option value="" selected>category</option>
                            <option v-for="type in types">{{type.typename}}</option>
                        </select>
                        <input class="date-selector" placeholder="due date" v-model="duedate"></input>
                    </div>
                </div>
                <div class="task-add"  @click="addtask()">+</div>
            </div>
            
            <div class="task-list">
                <div class="task-item" v-for="(task,index) in tasklist" :key="task.id">
                    <div class="task-name-group">
                        <input type="checkbox" :id="task.id" v-model="task.isdone">
                        <label :for="task.id" class="task-name" :class="{isdone:task.isdone}"><span :for="task.category" :style="{borderColor:getColor(task.category)}"></span>{{task.taskname}}</label>
                    </div>
                    
                    <div class="btn-group">
                        <div class="task-date">today</div>
                        <div class="remove_btn" :class="{showRemove:task.isdone}" @click="removetask(index)"><img src="./assets/images/remove.svg"></div>
                    </div>
                </div>  
            </div>
        </div>

        <div style="color:#fff">
        <h3>debug</h3>
        <p>{{tasklist}}</p>
        </div>
        
    `,
    props:{
        catcolor:{
            type: String,
            default:"#524EEE"}
    },
    data(){
        return{
           idForTask:'',
           tasklist:[
               {'id':0,
                'taskname':'Create Todo App',
                'category':'business',
                'duedate':'Today',
                'isdone':true},
                {'id':0,
                'taskname':'add color support',
                'category':'business',
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

            this.tasklist.unshift({'id':this.tasklist.length ,'taskname':this.newtask,'category':this.category,'duedate':this.duedate,'isdone':false})
            this.newtask=''
            this.duedate=''
        },
        removetask(index){
            this.tasklist.splice(index,1)
        },
        getColor(catname){
            if(!catname){
                return
            }

            let catcolor= this.types.find(type => type.typename===catname).color;
            return `${catcolor}`;
        },            
    },

})