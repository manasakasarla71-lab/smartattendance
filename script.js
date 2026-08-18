let students=JSON.parse(localStorage.getItem("students"))||[];

date.value=new Date().toISOString().split("T")[0];

function save(){
  localStorage.setItem("students",JSON.stringify(students));
}

function addStudent(){
  let n=name.value.trim(),i=id.value.trim();
  if(!n||!i)return alert("Enter name and ID");
  if(students.some(s=>s.id==i))return alert("ID already exists");

  students.push({id:i,name:n,a:{}});
  name.value=id.value="";
  save();display();
}

function display(){
  let d=date.value,q=search.value.toLowerCase();

  list.innerHTML="";
  let data=students.filter(s=>
    s.name.toLowerCase().includes(q)||s.id.toLowerCase().includes(q)
  );

  data.forEach(s=>{
    let status=s.a[d]||"Not Marked";
    let records=Object.values(s.a);
    let percent=records.length
      ?Math.round(records.filter(x=>x=="Present").length/records.length*100)
      :0;

    list.innerHTML+=`
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td class="${status.toLowerCase().replace(" ","-")}">${status}</td>
        <td>${percent}%</td>
        <td>
          <button onclick="mark('${s.id}','Present')">P</button>
          <button onclick="mark('${s.id}','Absent')">A</button>
          <button onclick="del('${s.id}')">X</button>
        </td>
      </tr>`;
  });

  let p=students.filter(s=>s.a[d]=="Present").length;
  let a=students.filter(s=>s.a[d]=="Absent").length;

  total.textContent=students.length;
  present.textContent=p;
  absent.textContent=a;
}

function mark(id,status){
  let s=students.find(x=>x.id==id);
  s.a[date.value]=status;
  save();display();
}

function del(id){
  if(confirm("Delete student?")){
    students=students.filter(s=>s.id!=id);
    save();display();
  }
}

display();
