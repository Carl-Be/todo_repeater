import joplin from "api";

/** resetRepeated ****************************************************************************************************************************************
 * Author: Carl-Be
 * Source: self
 *
 * Returns the list of uncompleted todos sorted by due date                                                                                         *
 ****************************************************************************************************************************************************/
export async function resetRepeated() {
    var allTodos = (await getTodos()).entries()
    var todaysDate = new Date();
    const todaysDateString = todaysDate.toLocaleDateString(
        undefined, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})

    for (var date of allTodos) {
        var dateTitle = date[0]
        for (var todo of date[1]) {
            if (todo.title.match(/repeat \d+:/gi) && todaysDateString === dateTitle) {
                var addedDaysAmount = todo.title.split(':')[0].split(" ")[1]
                var epochTimeAdded = 86400000 * addedDaysAmount // 86400000ms = 24hrs
                var todoDate = new Date(Number(todo.todo_due))
                var newTodoDate = todoDate.valueOf() + epochTimeAdded

                await joplin.data.put(['notes', todo.id], null, {todo_due: Number(newTodoDate), todo_completed: 0});
            }
        }
    }
}


/** getTodos ****************************************************************************************************************************************
 * Author: BeatLink
 * Source: https://gitlab.com/beatlink-code/joplin-plugin-agenda/-/blob/main/src/Logic/joplin.ts
 *
 * Returns the list of uncompleted todos sorted by due date                                                                                         *
 ***************************************************************************************************************************************************/
export async function getTodos(){
    var showCompleted = await joplin.settings.value("showCompletedTodos")
    var showNoDue = await joplin.settings.value("showNoDueDateTodos")
    var allTodos = [];
    let pageNum = 0;
    do {
        var response = await joplin.data.get(['notes'], { fields: ['id', 'title', 'is_todo', 'todo_completed', 'todo_due'], page: pageNum++})
        allTodos = allTodos.concat(response.items)
    } while (response.has_more)
    var filteredTodos = allTodos.filter((todo, _index, _array) => (
        (todo.is_todo != 0)  &&
        (todo.todo_completed == 0 || showCompleted) &&
        (todo.todo_due != 0 || showNoDue)
    ))
    var sortedTodos = filteredTodos.sort((n1,n2) => n1.todo_due - n2.todo_due)
    var todoArray = groupBy(sortedTodos, (todo) => todo.todo_due != 0 ? (new Date(todo.todo_due)).toLocaleDateString(
        undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "No Due Date")

    return todoArray
}


/** groupBy *****************************************************************************************************************************************
 * Author: BeatLink
 * Source: https://gitlab.com/beatlink-code/joplin-plugin-agenda/-/blob/main/src/Logic/misc.ts
 *
 * @description                                                                                                                                     *
 * Takes an Array<V>, and a grouping function,                                                                                                      *
 * and returns a Map of the array grouped by the grouping function. Source: https://stackoverflow.com/a/38327540                                    *
 *                                                                                                                                                  *
 * @param list An array of type V.                                                                                                                  *
 * @param keyGetter A Function that takes the the Array type V as an input, and returns a value of type K.                                          *
 *                  K is generally intended to be a property key of V.                                                                              *
 *                                                                                                                                                  *
 * @returns Map of the array grouped by the grouping function.
 ***************************************************************************************************************************************************/
export function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        } else {
            collection.push(item);
        }
    });

    return map;
}