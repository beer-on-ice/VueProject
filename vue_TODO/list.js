// 存取sessionStorage中的数据
var storage = {
    // 保存
    // save:function(key,value){
    //    localStorage.setItem(key,JSON.stringify(value));
    // }
    save(key,value){
        sessionStorage.setItem(key,JSON.stringify(value))
    },
    // 获取
    // fetch:function(key){
    //     return JSON.parse(localStorage.getItem(key)) || [];
    // }
    fetch(key) {
        return JSON.parse(sessionStorage.getItem(key)) || []
    }
    // delete: function (key) {
    //    localStorage.removeItem(key);
    // }
}

var list = storage.fetch("keyVal")

// 过滤三种情况 all/done/undo
var filter = {
    all:function(list){
        return list
    },
    done:function(list){
        return list.filter(function(item) {
            return item.isChecked
        })
    },
    undo:function(list){
        return list.filter(function(item) {
            return !item.isChecked
        })
    }
}


var vm = new Vue({
    el: ".main",
    data: {
        list: list,
        todo: '',
        editItem: '',  // 记录正在编辑的数据
        beforeTitle: '', // 记录正在编辑的数据的title
        visibility: 'all' //通过这个属性值变化，对数据筛选
    },
    computed: {
        // 筛选出没有被完成的长度
        unCheckedLen: function() {
            return this.list.filter(function(item) {
                return !item.isChecked
            }).length
        },
        // 根据hash值来筛选数据
        filteredList: function() {
            return filter[this.visibility] ? filter[this.visibility](this.list) : list
        }
    },
    watch: {
        // list: function() {  // 监控list属性
        //     storage.save('keyVal',this.list)
        // }
        list: {
            //深度监控(有变化就存入本地存储)
            handler:function() {
                storage.save('keyVal',this.list)
            },
            deep: true
        }
    },
    methods: {
        addTodo() {
            if(this.todo !== '') {
                this.list.push({
                    title: this.todo,
                    isChecked: false
                })
            } else {
                alert('请输入内容')
            }
            this.todo = ''
        },
        deleteTodo(todo) {
            // indexOf() 返回某个指定的字符在某个字符串中首次出现的位置。如果没有找到就返回-1；
            var index = this.list.indexOf(todo)
            this.list.splice(index,1)
        },
        editTodo(todo) {  //编辑任务
            // console.log(todo);
            this.beforeTitle = todo.title // 记录，方便取消时的变化
            this.editItem = todo
        },
        editEnd(todo) { // 编辑成功
            this.editItem = ""
        },
        cancel(todo) { // 编辑取消
            todo.title = this.beforeTitle
            this.editItem = ""
            this.beforeTitle = ""
        }
    },
    // 自定义属性
    directives: {
        "focus" : {
            update(el,binding ) {
                if(binding.value){
					el.focus()
				}
            }
        }
    }
})

// hash值变化，并实时赋予给visibility
function watchhash() {
    // 截取出hash
    var hash = window.location.hash.slice(1)
    // console.log(hash);
    vm.visibility = hash
}
watchhash();
// 事件监听
window.addEventListener('hashchange',watchhash)
