
var is_metamask_approved = is_metamask_approved || false;
var is_metamask_unlocked = is_metamask_unlocked || false;


async function approve_metamask() {
  if (window.ethereum && window.ethereum._metamask) {
    window.getProvider = true;
    window.web3 = new Web3(ethereum);
    try {

      await ethereum.enable();
      localStorage.setItem('setProvider', true);
      // window.setProvider = true;
      window.getProvider = false;
      is_metamask_approved = true;

    } catch (error) {
      _alert('Permission to connect to metamask rejected. Allow gitcoin to connect to metamask.', 'warning');
    }
  }
  ask_metamask_connection();

}

async function approve_fortmatic() {
  try {
    window.getProvider = true;
    $('.btn-fortmatic').text('Loading');
    $('.btn-fortmatic').addClass('btn-fortmatic--loading');
    var fm = new Fortmatic('pk_test_53020F639050318F');

    window.web3 = new Web3(fm.getProvider());
    await web3.currentProvider.enable();
    // window.setProvider = true;
    localStorage.setItem('setProvider', true);

    window.getProvider = false;
    is_metamask_approved = true;
  } catch (error) {
    console.log(error);
    _alert('Permission to connect to fortmatic rejected. Allow gitcoin to connect to fortmatic.', 'warning');
  }
}

function ask_metamask_connection() {
  var page_url = $(location).attr('pathname');

  shown_on = [ '/tip/send/2', '/kudos/send', '/ens' ];
  var len = page_url.length - 1;

  if (page_url.lastIndexOf('/') === len) {
    page_url = page_url.substring(0, len);
  }
  if ($.inArray(page_url, shown_on) != -1 && !is_metamask_approved) {
    _alert('Metamask not connected. <button id="metamask_connect" onclick="approve_metamask()">Click here to connect to metamask</button>', 'error');
    $('#metamask_connect').css('background', 'none');
    $('#metamask_connect').css('color', 'white');
    $('#metamask_connect').css('border', '2px solid white');
    $('#metamask_connect').css('border-radius', '10px');
  }
}
