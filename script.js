const PASSWORD = "1234";  // нууц үг

function login(){
  const passInput = document.getElementById("pass");
  const panelDiv = document.getElementById("panel");
  const loginDiv = document.getElementById("login");

  if(passInput.value === PASSWORD){
    loginDiv.style.display="none";
    panelDiv.style.display="block";
  } else {
    alert("❌ Буруу нууц үг");
  }
}
