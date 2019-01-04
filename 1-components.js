console.log('# 3: components')

  console.log.raw('button_component( name, _onclick )');
    console.log('\t(documentation goes here)')
    const button_tests = [
        {name: 'prints 2, console.log(2)', 
            args: ['prints 2', ()=>{console.log(2)}]},
        {name: 'alerts 2, alert(2)', 
            args: ['alerts 2', ()=>{alert(2)}]},
        {name: 'throws error, throw new Error("button!")', 
            args: ['throws error', ()=>{throw new Error("button!")}]},
      ];
    function button_component(name, _onclick) { 

      const button = document.createElement('button');
      button.onclick = _onclick;
      button.innerHTML = name;

      const button_div = document.createElement('div');
      button_div.appendChild(button);

      return button_div;
    }
    test_dom_component(button_component, button_tests);

  console.log.raw('input_component( id, type )');
    const input_comp_tests = [
        {name: '3, "title"', args: [3, 'title']},
        {name: '2, "body"', args: [2, 'body']},
      ]
    function input_component(id, value) {
      const input = document.createElement('input');
      input.id = id;
      input.value = value;

      const input_div = document.createElement('div');
      input_div.appendChild(input);

      return input_div;
    }
    test_dom_component(input_component, input_comp_tests);



  console.log.raw('create_component( )');
    const create_comp_tests = [
        {name: 'new todo component', args: []}
      ]
    function create_component() {
      const title = document.createTextNode('create a new one');
      const title_input = input_component( 'new-title', 'new title');
      const body_input = input_component( 'new-body', 'new body');
      const create_button = button_component( 'create', ()=>{add_todo_handler()});     
      
      const component_div = document.createElement('div');
      component_div.appendChild(title);
      component_div.appendChild(title_input);
      component_div.appendChild(body_input);
      component_div.appendChild(create_button);

      return component_div;
    }
    test_dom_component(create_component, create_comp_tests);



  console.log.raw('read_one_component( todo )');
    const read_one_comp_tests = [
        {name: '{id:3, title:"gip" body:"pig"}', args: [{id:3, title: 'gip', body:"pig"}]},
        {name: '{id:2, title:"ip", body:"pi"}', args: [{id:2, title: 'ip', body:"pi"}]},
      ]
    function read_one_component(todo) {
      if (todo.err) {
        const err_mssg = document.createTextNode(todo.err);
        render(err_mssg);
      } else {
        const title = document.createTextNode(todo.id+': '+todo.title);
        const title_input = input_component( 'new-title', 'new title');
        const body = document.createTextNode(todo.body);
        const body_input = input_component( 'new-body', 'new body');
        const update_button = button_component( 'update', ()=>{update_handler(todo.id)});
        const delete_button = button_component( 'delete', ()=>{delete_handler(todo.id)});      
        
        const component_div = document.createElement('div');
        component_div.appendChild(title);
        component_div.appendChild(title_input);
        component_div.appendChild(body);
        component_div.appendChild(body_input);
        component_div.appendChild(update_button);
        component_div.appendChild(delete_button);

        return component_div;
      }
    }
    test_dom_component(read_one_component, read_one_comp_tests);

  console.log.raw('todo_component( todo )');
    console.log('\t(documentation goes here)')
    const todo_comp_tests = [
        {name: '{id:3, title:"gip" body:"pig"}', args: [{id:3, title: 'gip', body:"pig"}]},
        {name: '{id:2, title:"ip", body:"pi"}', args: [{id:2, title: 'ip', body:"pi"}]},
      ]
    function todo_component(todo) {
      const title = document.createTextNode(todo.id+': '+todo.title);
      const body = document.createTextNode(todo.body);
      const view_button = button_component( 'view', ()=>{read_one_handler(todo.id)} )

      const todo_div = document.createElement('div');
      todo_div.appendChild(title);
      todo_div.appendChild(document.createElement('br'));
      todo_div.appendChild(body);
      todo_div.appendChild(view_button);

      return todo_div;
    }
    test_dom_component(todo_component, todo_comp_tests);

  console.log.raw('display_all_component()');
    console.log('\t(documentation goes here)')
    const disp_all_tests = [
        {name: 'all', 
            args: [[
              {id:3, title: 'gip', body:"pig"},
              {id:2, title: 'ip', body:"pi"},
              {id:1, title: 'toad', body:"big fat toad go pop"}
            ]]}
      ]
    function display_all_component(todos_obj) {  
      const all_div = document.createElement('div');

      for (let todo of todos_obj) {
        const new_todo_div = todo_component( todo );
        all_div.appendChild(new_todo_div);
      }

      return all_div;
    }
    test_dom_component(display_all_component, disp_all_tests);


  console.log.raw('home_component()');
    console.log('\t(documentation goes here)')
    const home_tests = [
        {name: 'home', args: []}
      ]
  function home_component() {

    const greeting = document.createTextNode('welcome home');
    const read_all_button = button_component( 'read all', ()=>{render(display_all_component(state.todos))} );
    const add_todo_button = button_component( 'add todo', ()=>{render(create_component())} );

    const home_page = document.createElement('div');
    home_page.appendChild(greeting);
    home_page.appendChild(read_all_button);
    home_page.appendChild(add_todo_button);

    return home_page;
  }
  test_dom_component(home_component, home_tests);
