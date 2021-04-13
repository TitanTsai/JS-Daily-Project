app.component('task-list',{
    template:`
        <div class="task-header">
            <input class="task-input" type="text" v-model.trim="newtask" @keyup.enter="addtask" placeholder="Write Something">
            <div class="task-add"  @click="addtask()">+</div>
        </div>
        <div v-for="(task,index) in tasklist">
            <div><input type="checkbox" id="status" v-model="task.isdone">
                <h3>{{task.taskname}}</h3>
                <p>catagory:{{task.catagory}}</p> 
                <p>due date:{{task.duedate}}</p>
                <div @click="removetask(index)">X</div>
            </div>
        </div>
    `,
    data(){
        return{
           tasklist:[
               {'id':0,
                'taskname':'Create Todo App',
                'catagory':'Practice',
                'duedate':'Today',
                'isdone':false},
           ],
           newtask:'',
        }
    },
    methods:{
        addtask(){
            if(this.newtask.trim().length===0){
                return
            }

            this.tasklist.push({'id':this.idforTask,'taskname':this.newtask,'isdone':false})
            newtask=''
        },
        removetask(index){
            this.tasklist.splice(index,1)
        }
    },
})