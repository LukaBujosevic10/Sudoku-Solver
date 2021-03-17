$( document ).ready(function() {
  let forma = $('#forma');
let niz = [];
let mogucnost;
let greska = false;
//let pocetni = ["","","","","","","","","","9","","2","5","","","1","","","5","","","","1","6","","","9","3","","","6","","","7","","","","","9","1","","8","3","","","","","4","","","3","","","2","4","","","2","8","","","","3","","","7","","","9","5","","6","","","","","","","","",""];
let sudoku = [];
let btn = $('#btn');
let reseni_bez=0;
let br_nagadjanja = 0;
let kombinacije= [];
let kmb_spm = [];
let nagadjam=false;
let reseni=0;
let inp = $('.unos');
for (var i = 0; i < 9; i++) {
  niz[i]=[];
}
let br_prom = 0;
for (var i = 0; i < 81; i++) {
    if((Math.floor(Math.floor(i/9)/3)!= 1)&&((Math.floor(Math.floor(i%9)/3))==0 || (Math.floor(Math.floor(i%9)/3))==2)){
      $(forma).append("<input id="+i+" style='background:silver' class='unos' type='text'>");
    }else if((Math.floor(Math.floor(i/9)/3)== 1)&&(Math.floor(Math.floor(i%9)/3)==1)){
    $(forma).append("<input id="+i+" style='background:silver' class='unos' type='text'>");
  }else{
    $(forma).append("<input id="+i+" class='unos' type='text'>");
  }
  /*if(pocetni[i] != ""){
    $('#'+i).val(pocetni[i]);
  }*/
}
$(btn).on('click',function() {
  for (let i = 0; i < 81; i++) {
    sudoku[i]=$('#'+i).val();
    if(sudoku[i] != ""){
      reseni++;
      reseni_bez++;
    }
  }
  make_array();
  radim();
  
})

function make_array() {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      niz[i][j] = $("#"+(i*9+j)).val();
    }
  } 
}

function moguce_vrednosti(redna) {
  let moguce = [1,2,3,4,5,6,7,8,9];
  let w = redna%9;
  let h = Math.floor(redna/9);
  let kv_w = Math.floor((redna%9)/3);
  let kv_h = Math.floor((Math.floor(redna/9))/3);
  if(niz[h][w] != ""){
    moguce=[];
  }
  for (let i=0;i<9; i++) {
    if(niz[i][w] != "" && moguce.indexOf(parseInt(niz[i][w])) != -1){
      moguce.splice(moguce.indexOf(parseInt(niz[i][w])), 1);
      
    }
  }
  for (let i=0;i<9; i++) {
    if(niz[h][i] != "" && moguce.indexOf(parseInt(niz[h][i]))!= -1){
      moguce.splice(moguce.indexOf(parseInt(niz[h][i])), 1);
    }
  }
  for (let i = kv_h*3; i < kv_h*3+3; i++) {
    for (let j = kv_w*3; j < kv_w*3+3; j++) {
      if(niz[i][j] != "" && moguce.indexOf(parseInt(niz[i][j]))!= -1){
        moguce.splice(moguce.indexOf(parseInt(niz[i][j])), 1);
      }
      
    }
  }
  if(moguce.length == 0 && niz[h][w] == ""){
    console.log("Greska");
    greska=true;
  }
  return moguce;
}
function vrednosti_kvadrata(br){
  let vr = [];
  let kv_w = br%3;
  let kv_h = Math.floor(br/3); 
  let moguci_poz;
  for (let i = kv_h*3; i < kv_h*3+3; i++) {
    for (let j = kv_w*3; j < kv_w*3+3; j++) {
      moguci_poz = moguce_vrednosti(parseInt(i*9+j));
      vr = vr.concat(moguci_poz);
      
    }
  }
  return vr;
}
function vrednosti_gda(br,dir) {
  let vr = [];
  let moguci_poz;
  let pint;
  for (let i = 0; i < 9; i++) {
    pint = dir=='gd'?parseInt(i*9+br):parseInt(br*9+i);
    moguci_poz = moguce_vrednosti(pint);
    vr=vr.concat(moguci_poz);
  }
  return vr;
}
function cega_ima_1(br,dir){
  let pom=0;
  let vrednosti_prvog=[];
  if(dir=='kv'){
    vrednosti_prvog =vrednosti_kvadrata(br).sort(function(a, b) {
      return a - b;
    });
  }else{
    vrednosti_prvog =vrednosti_gda(br,dir).sort(function(a, b) {
      return a - b;
    });
  }
  let x=-1;
  let aktuelna = vrednosti_prvog[0];
  vrednosti_prvog.forEach(vrednost => {
    if(vrednost == aktuelna){
      x++;
    }else{
      if(x==0){
        if(dir=='kv'){
          nadji_jednog(aktuelna,br);
        }else{
          nadji_jednog_gda(aktuelna,br,dir);
        }
        
        pom++;
      }
      x=0;
      aktuelna=vrednost;
    }
  }); 
  if(x==0){
    if(dir=='kv'){
      nadji_jednog(aktuelna,br);
    }else{
      nadji_jednog_gda(aktuelna,br,dir);
    }
    pom++;
  }
  return pom;
}
function nadji_jednog_gda(vrednost,br,dir) {
  let pint;
  for (let i = 0; i < 9; i++) {
    pint=dir=='gd'?parseInt(i*9+br):parseInt(br*9+i);
    let moguci_poz = moguce_vrednosti(pint);
    if(moguci_poz.indexOf(vrednost) !=-1){
      upisati(pint,vrednost);
    }
  }
}
function nadji_jednog(vrednost, kvadrat) {
  let kv_w = kvadrat%3;
  let kv_h = Math.floor(kvadrat/3); 
  for (let i = kv_h*3; i < kv_h*3+3; i++) {
    for (let j = kv_w*3; j < kv_w*3+3; j++) {
      let moguci_poz = moguce_vrednosti(parseInt(i*9+j));
      if(moguci_poz.indexOf(vrednost) != -1){
        upisati(parseInt(i*9+j),vrednost);
      }
      
    }
  }

}
function upisati(kor,vr) {
  if(nagadjam){
    $("#"+kor).attr('status','nagadjam');
    $("#"+kor).css("color","tomato");
  }else{
    $("#"+kor).css("color","lime");
    reseni_bez++;
  }
  $("#"+kor).val(vr);
  
  reseni++;
}
function ispitivanje_po_kvadratu() {
      for (let i = 0; i < 9; i++) {
        br_prom+=cega_ima_1(i,'kv'); 
      }
      make_array();
}
function ispitivanje_po_gore_dole() {
  for (let i = 0; i < 9; i++) {
    br_prom+=cega_ima_1(i,'gd');
  }
  make_array();
}
function ispitivanje_po_levo_desno() {
  for (let i = 0; i < 9; i++) {
    br_prom+=cega_ima_1(i,'ld');
    
  }
  make_array();
}
//make_array();
function radim() {
  while(true && greska==false){
    ispitivanje_po_kvadratu();
    ispitivanje_po_gore_dole();
    ispitivanje_po_levo_desno();
    if(br_prom==0){
      if(reseni!=81){
        console.log("U ifu");
        nagadjanje();
      }
    break;
    }else{
      br_prom=0;
    }
    }
    if(greska == true){
      greska=false;
      console.log("U greski sam");
      
      nagadjanje();
    }
}  
//setTimeout(radim,1000);
function nagadjanje() {
  brisem_nagadjanja();
  //reseni=81;
 console.log("U nagadjanju sam");
  if(br_nagadjanja==0){
    nagadjam=true;
    nadji_nagadjanja();
  }
  
  mogucnost = kmb_spm[br_nagadjanja];
  let za_popuniti = nadji_prazne(mogucnost.r_br,mogucnost.dir);
  br_nagadjanja++;
  for (let i = 0; i < za_popuniti.length; i++) {
    upisati(za_popuniti[i],mogucnost.vrednosti[i]);
    
  }
 /* mogucnost = kmb_spm[br_nagadjanja];
  let za_popuniti = nadji_prazne(mogucnost.r_br,mogucnost.dir);
  for (let i = 0; i < za_popuniti.length; i++) {
    upisati(za_popuniti[i],mogucnost.vrednosti[i]);
    
  }*/
  br_nagadjanja++;
  
  radim();
  //brisem_nagadjanja();
}
function nadji_prazne(r_br,dir){
  let za_popuniti=[];
  if(dir != 'kv'){
    for (let i = 0; i < 9; i++) {
      let vrd = dir=='ld'?niz[r_br][i]:niz[i][r_br];
      let poz = dir=='ld'?(r_br*9+i):(i*9+r_br);
      if(vrd==""){
        za_popuniti.push(poz);
      }
    }
  }
  return za_popuniti;
}
function brisem_nagadjanja() {
  reseni = reseni_bez;
  for(let i=0;i<81;i++){
    if($("#"+i).attr('status') == 'nagadjam'){
      $("#"+i).val("").removeAttr("status");
    }
  }
  make_array();
}
function nadji_nagadjanja() {
  for (let i = 0; i < 9; i++) {
    kombinacije[i*3] = {r_br:i,dir:'kv',vrednosti:unikati(vrednosti_kvadrata(i))};
    kombinacije[i*3+1] = {r_br:i,dir:'gd',vrednosti:unikati(vrednosti_gda(i,'gd'))};
    kombinacije[i*3+2] = {r_br:i,dir:'ld',vrednosti:unikati(vrednosti_gda(i,'ld'))};
  }
  let i=0;
  kombinacije.sort(compare);
  while(kombinacije[i].vrednosti.length < 8){
    let prm = permutacija(kombinacije[i].vrednosti);
    prm.forEach(element => {
      kmb_spm.push({r_br:kombinacije[i].r_br,dir:kombinacije[i].dir,vrednosti:element});
    });
    i++;
  }
}
function unikati(kmb) {
  kmb.sort(function(a, b) {
    return a - b;
  });
  let prosli = kmb[0];
  for(let i=1;i<kmb.length;i++){
      if(prosli==kmb[i]){
        kmb.splice(i,1);
        i--;
      }
      prosli=kmb[i];
  }
  return kmb;
}
function compare(a,b) {
  const bandA = a.vrednosti.length;
  const bandB = b.vrednosti.length;
  let comparison = 0;
  if (bandA > bandB) {
    comparison = 1;
  } else if (bandA < bandB) {
    comparison = -1;
  }
  return comparison;
}
});
