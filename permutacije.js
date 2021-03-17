//$( document ).ready(function() {
    function permutacija(niz) {
        let br_perm=1;
        let kopija_niza;
        let resenja = [];
        for (let i = 1; i <= niz.length; i++){
            br_perm*=i;  
        }
        let q = br_perm;
        for (let clan = 0; clan < niz.length; clan++) {
            if(niz.length > 2 && clan == 0){
            for (let i = 0; i < niz.length; i++) {
                for (let j = 0; j < br_perm/niz.length; j++) {
                    resenja[i*(br_perm/niz.length)+j]=[niz[i]];
                }
                
            }
        }else if(niz.length > 2 && clan!=0 && clan<niz.length-2){
            let pomocna = 0;
            
            for (let i = 0; i < br_perm; i++) {
                kopija_niza = [...niz];
                
                for (let j = 0; j < resenja[i].length; j++) {
                    kopija_niza.splice(kopija_niza.indexOf(resenja[i][j]),1);
                }

                for (let m = 1; m <= kopija_niza.length; m++) {
                    for (let l = 1; l <= ((q/(kopija_niza.length+1))/kopija_niza.length); l++) {
                         
                        resenja[i+pomocna][clan] = kopija_niza[m-1]; 
                        pomocna++;
                    } 
                             
                }
                //***************************************************************
                //i+=(q/niz.length)-1;
                i+=(kopija_niza.length*((q/(kopija_niza.length+1))/kopija_niza.length))-1;
                pomocna=0;
            }

            q=q/(kopija_niza.length+1);
        }else{
            if(niz.length != 2){
            for (let i = 0; i < br_perm; i++) {
                kopija_niza = [...niz];
                for (let j = 0; j < resenja[i].length; j++) {
                    kopija_niza.splice(kopija_niza.indexOf(resenja[i][j]),1);
                }
                resenja[i][niz.length-2]=kopija_niza[0];
                resenja[i][niz.length-1]=kopija_niza[1];
                i++;
                resenja[i][niz.length-2]=kopija_niza[1];
                resenja[i][niz.length-1]=kopija_niza[0];
            }
            clan++;
        }else{
            resenja[0] = [];
            resenja[1] = [];
            resenja[0][0]=niz[0];
            resenja[0][1]=niz[1];
            resenja[1][0]=niz[1];
            resenja[1][1]=niz[0];
        }
        }
    }
    return resenja;
       
    }
//})