function run_tests(_target, _cases) {
  for (let t_case of _cases) {
    const expected = t_case.expected;
    const actual = _target(... t_case.args, false);

    let pass;
    if (typeof expected === 'object') {
      const _actual = JSON.stringify(actual);
      const _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (!pass) {
      console.log(`${t_case.name}: \n`);
      console.log(`   actual: ${typeof actual},`, actual);
      console.log(`   expected: ${typeof expected},`, expected);
    };
  };
};

function test_dom_component(_target, _cases) {
  const test_div = document.getElementById('componentest');
  const component_name = document.createTextNode(_target.name);
  test_div.appendChild( document.createElement("br") );
  test_div.appendChild(component_name);
  test_div.appendChild( document.createElement("br") );

  for (let t_case of _cases) {
    try {
      const new_component = _target(...t_case.args);
      test_div.appendChild( new_component );
    } catch(err) {
      console.log(component_name, t_case.name);
      console.log(err);
    }
  }; 
}