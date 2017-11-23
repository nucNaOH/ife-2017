var TodoMVC;
(function () {
    TodoMVC = {};
    // model
    TodoMVC.model = function () {
        var M = {};
        M.data = {
            tasks: [
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
                createRandomTask(),
            ]
        };
        return {
            getData: function (m) {
                return M.data[m];
            },
            setData: function (m, d) {
                M.data[m] = d;
                return this;
            }
        }
    } ();
    // view
    TodoMVC.view = function () {
        var M = TodoMVC.model;
        var V = {
            tpl: {
                todoItem: function () {
                    return [
                        '<div class="content-item" data-id="{id}" data-datetime="{datetime}">',
                            '<div class="content-icon">',
                                '<i class="{progress} {priority}"></i>',
                            '</div>',
                            '<div class="content-paragraph">{content}</div>',
                        '</div>'
                    ].join('');
                } (),
                todoIcon: {
                    progress: {
                        todo: 'icon-triangle',
                        doing: 'icon-double',
                        done: 'icon-rectangle'
                    },
                    priority: {
                        high: 'bd-left-red',
                        middle: 'bd-left-yellow',
                        low: 'bd-left-green'
                    }
                }
            },
            showTodoList: function () {
                var container = document.querySelector('.content-list');
                var data = M.getData('tasks');
                var tpl = V.tpl;
                if (!data || !data.length) {
                    return
                }
                var taskListTpl = '';
                for (var i = 0; i < data.length; i++) {
                    var task = data[i], taskTpl = tpl.todoItem;
                    for (var prop in task) {
                        var replace = task[prop];
                        if (prop === 'priority' || prop === 'progress') {
                            replace = tpl.todoIcon[prop][task[prop]]
                        }
                        taskTpl = taskTpl.replace('{' + prop + '}', replace);
                    }
                    taskListTpl += taskTpl;
                }
                container.innerHTML = taskListTpl;
            }
        };
        return function (v) {
            V[v]();
        }
    } ();
    // controller
    TodoMVC.controller = function () {
        var M = TodoMVC.model;
        var V = TodoMVC.view;
        var C = {
            showTodoList: function () {
                V('showTodoList');
            }
        }
        C.showTodoList();
    } ();
})();