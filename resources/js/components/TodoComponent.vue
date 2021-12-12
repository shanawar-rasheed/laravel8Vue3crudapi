<template>
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Todo Component</div>

                    <div class="card-body">
                        <div class="input-group mb-3">
                            <input type="text" placeholder="todo.." class=" form-group" aria-label="todo" aria-describedby="todo" v-model="todo_input">
                            <div class="input-group-append ml-2">
                                <button v-if="!edit_todo_id" type="button" class="btn btn-success" @click="saveTodo()">Add</button>
                                <button v-else type="button" class="btn btn-success " @click="updateTodo()">Update</button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-sm text-danger" @click="resetTodo()">reset</button>
                        <table class="table table-bordered">
                            <thead>

                                <tr>
                                    <th>S.no</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(todo,index) in todos" :key="index">
                                <tr>
                                    <td>{{ ++index}}</td>
                                    <td>{{ todo.name }}</td>
                                    <td>
                                        <button type="button" class="btn btn-danger" @click="deleteTodo(--index)">Delete</button>
                                        <button type="button" class="btn btn-info" @click="editTodo(--index)">Edit</button>
                                    </td>
                                </tr>
                               </template>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
   
    export default {
        data() {
            return {
                todos:[],
                api:'http://127.0.0.1:8000/api/todos',
                todo_input:'',
                edit_todo_id:'',
                edit_todo_index:''
            }
        },
        mounted() {
            this.axios.get(this.api).then(res=>{     //axios is used for api call
          this.todos=res.data;                       //store fetched response data in todos 

            });
        },
        methods: {
            saveTodo(){
              if(this.todo_input.length>0){         //check input box data is empty or not
                let $data={'name':this.todo_input};
                    this.axios.post(this.api,$data).then(res=>{
                        this.todos.push(res.data);  //show data into table using todos 
                        this.todo_input="";         //make input box clear on after adding data 
                    })     
              }
            },
            deleteTodo(index){
                if(this.todos[index].id){
                this.axios.delete(this.api+'/'+this.todos[index].id).then(res=>{
                    this.todos.splice(index,1);   //remove data from table
                })
                }
            },
            editTodo(index){
                console.log(this.todos);
                if(this.todos[index].id){
                    this.todo_input=this.todos[index].name;
                    this.edit_todo_id=this.todos[index].id;
                    this.edit_todo_index=index;
                    
                }
            },
            updateTodo(){
                if(this.todo_input.length>0){
                   let data={'name':this.todo_input};
                    this.axios.patch(this.api+'/'+this.todos[this.edit_todo_index].id,data).then(res=>{
                    this.todos[this.edit_todo_index].name=res.data.name;
                     this.resetTodo();
                    });
                }
                
            },
            resetTodo(){
                this.todo_input='',
                this.edit_todo_id='',
                this.edit_todo_index=''
            }
        },
    }
</script>
