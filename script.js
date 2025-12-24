function go(p){ location.href=p; }

function toggle(){
  document.body.classList.toggle("light");
  localStorage.setItem("theme",
    document.body.classList.contains("light") ? "light":"dark");
}

// 🔐 Админ нэвтрэх
const PASSWORD = "1234";
function login(){
  if(pass.value === PASSWORD){
    login.style.display="none";
    panel.style.display="block";
  } else { alert("❌ Буруу нууц үг"); }
}

// 💾 Мэдээлэл хадгалах (зурагтай)
function save(){
  let reader = new FileReader();
  if(img.files[0]){
    reader.onload = function(){
      addData(reader.result);
    }
    reader.readAsDataURL(img.files[0]);
  } else { addData(null); }
}

function addData(imgData){
  let arr = JSON.parse(localStorage.getItem("theory")) || [];
  arr.push({
    title: title.value,
    text: text.value,
    img: imgData
  });
  localStorage.setItem("theory", JSON.stringify(arr));
  alert("✅ Амжилттай нэмэгдлээ!");
  title.value=""; text.value=""; img.value="";
}
