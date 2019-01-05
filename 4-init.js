console.log('# 2: init');

  console.log.raw('init( )')

  function init() {
    
    const home_page = home_component()

    render(home_page);
  }

  window.onload = init;


  console.log.raw('render( new_component )');
    console.log('\t(documentation goes here)')
    // we can give this to them
    function render( new_body ) {
      const output_div = document.getElementById('container');
      while (output_div.firstChild) {
          output_div.removeChild(output_div.firstChild);
      }

      const log_button = button_component( 'view log', view_log_handler );
      const home_button = document.createElement('button');
      home_button.innerHTML = 'home';
      home_button.onclick = ()=>{init()};

      output_div.appendChild( new_body );
      output_div.appendChild( home_button );
      output_div.appendChild( log_button );
    };

