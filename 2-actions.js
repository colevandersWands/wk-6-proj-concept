console.log('# 4: actions')

  console.log.raw('read_all( state )');
  console.log('\t(documentation goes here)')
    const read_all_cases = [
        {name: 'a case', 
            args: [ { todos: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] } ], 
            expected: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] },
      ];
    function read_all(state) {

      return state.todos.slice();

    };
    run_tests(read_all, read_all_cases);



  console.log.raw('read_one( state, id )');
  console.log('\t(documentation goes here)')
    const read_one_cases = [
        {name: 'clean case', 
            args: [{todos: [{id: 3, body: 'pig' }]}, 3], 
            expected: {id: 3, body: 'pig'} },
        {name: 'error case', 
            args: [{todos: [{id: 3, body: 'pig' }]}, 4], 
            expected: {err: 'no such id'} },
      ];
    function read_one(state, id) {                
                                                        
      let result;                                       
                                                        
      const found = state.todos.find(todo => todo.id === id);
      if (found === undefined) {
        result = {err: 'no such id'};                   
      } else {
        result = found;
      };                                                

      return result;

    };
    run_tests(read_one, read_one_cases);


  console.log.raw('add_todo( state, new_body )');
  console.log('\t(documentation goes here)')
    const add_todo_cases = [
      {name: 'a case', 
          args: [{next_id: 3, todos: [{id: 2, body: 'dig'}]}, 'road', 'doar'], 
          expected: { next_id: 4, todos: [{id: 2, body: 'dig'}, {id: 3, title: 'road', body: 'doar'}] } },
    ];
    function add_todo(state, new_title, new_body) {
 
      const new_state = {
          next_id: state.next_id + 1,
          todos: state.todos.slice()
        };
      
      const new_todo = {
          id: state.next_id,
          title: new_title,
          body: new_body
        };

      new_state.todos.push(new_todo);

      return new_state;

    };
    run_tests(add_todo, add_todo_cases);



  console.log.raw('update( state, id, new_body )');
  console.log('\t(documentation goes here)')
    const update_cases = [
        {name: 'clean case', 
            args: [ { todos: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] }, 8, 'rr', 'ttt' ], 
            expected: { todos: [{id: 4, body: 'cow'}, {id: 8, title: 'rr', body: 'ttt'}] } },
        {name: 'error case', 
            args: [ { todos: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] }, 3, 'taor' ], 
            expected: {err: 'no such id'} }
      ];
    function update(state, id, title, body) {

      const found = state.todos.find(todo => todo.id === id);

      let result;
      if (found === undefined) {
        result = {err: 'no such id'};
      } else {
        const update_the_one = function(todo) {
          let result;
          if ((todo.id)===id) { 
            result = {id, title, body}; 
          } else {
            result = todo;
          };
          return result;
        }
        state.todos = state.todos.map( update_the_one );
        result = JSON.parse(JSON.stringify(state));
      };

      return result;

    };
    run_tests(update, update_cases);


  console.log.raw('delete_todo( state, id )');
  console.log('\t(documentation goes here)')
    const delete_cases = [
        {name: 'clean case', 
            args: [ { todos: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] }, 8 ], 
            expected: { todos: [{id: 4, body: 'cow'}] } },
        {name: 'error case', 
            args: [ { todos: [{id: 4, body: 'cow'}, {id: 8, body: 'roat'}] }, 3], 
            expected: {err: 'no such id'} }
      ];
    function delete_todo(state, id) {

      const found = state.todos.find(todo => todo.id === id);

      let result;
      if (found === undefined) {
        result = {err: 'no such id'};
      } else {
        state.todos = state.todos.filter( todo => todo.id !== id );
        result = JSON.parse(JSON.stringify(state));
      };

      return result;

    };
    run_tests(delete_todo, delete_cases);